<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabSwitch"
       ref="tabcontrol1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scrollaa" :probe-type="3" :pullup-load="true" @scrollPos='scrollPos' @loadMore="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <home-recommends :recommends="recommends"></home-recommends>
      <home-feature></home-feature>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabSwitch" ref="tabcontrol2"></tab-control>
      <home-goods :goods="goods[currentTab].list"></home-goods>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import Scroll from 'components/common/scroll/Scroll'

import HomeSwiper from './homeChildren/HomeSwiper'

import HomeRecommends from './homeChildren/HomeRecommends'
import HomeFeature from './homeChildren/HomeFeature'

import TabControl from 'components/content/tabcontrol/TabControl'
import HomeGoods from 'components/content/goods/HomeGoods'
import BackTop from 'components/content/backtop/BackTop'

import {homeMultiData, homeGoods} from 'network/home.js'

import {debounce} from 'common/util.js'

export default {
  name: 'Home',
  data(){
    return{
      banners: [],
      recommends: [],
      goods: {
        'pop': {list:[], page:0},
        'new': {list:[], page:0},
        'sell': {list:[], page:0},
      },
      tabTitles: ['pop','new','sell'],
      currentTab: 'pop',
      isShowBackTop: false,
      tabTop: 0,
      isTabFixed: false
    }
  },
  created(){
    this.homeMultiData()

    this.homeGoods('pop')
    this.homeGoods('new')
    this.homeGoods('sell')
  },
  mounted() {
      const refresh = debounce(this.$refs.scrollaa.refresh, 100)
      this.$bus.$on('imgLoad',() => {
        refresh()
    })
  },
  methods: {
    // 网络请求相关
    homeMultiData() {
      homeMultiData().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
    },
    homeGoods(type) {
      let page = this.goods[type].page + 1     //important!
      homeGoods(type,page).then(res => {
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1

      this.$refs.scrollaa.scroll.finishPullUp()
    })
    },

    // 组件操作相关
    tabSwitch(index) {
      this.currentTab = this.tabTitles[index]
      this.$refs.tabcontrol1.currentIndex = index
      this.$refs.tabcontrol2.currentIndex = index
    },
    backTop() {
      this.$refs.scrollaa.scroll.scrollTo(0,0,500)
    },
    scrollPos(pos) {
      //是否显示回到顶部
      this.isShowBackTop = Math.abs(pos.y) > 1000
      //是否显示固定的tabcontrol
      this.isTabFixed = Math.abs(pos.y) >= this.tabTop
    },
    loadMore() {
      this.homeGoods(this.currentTab)
    },
    swiperImgLoad() {
      this.tabTop = this.$refs.tabcontrol2.$el.offsetTop
      console.log(this.tabTop)
    }
  },
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommends,
    HomeFeature,
    TabControl,
    HomeGoods,
    Scroll,
    BackTop
  }
}
</script>

<style>
#home {
  height: 100hv;
  position: relative;
}

.home-nav{
  background-color: var(--color-tint);
  color:#fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.tab-control {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 9;
}

.content {
  height: calc(100% - 93px);
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>