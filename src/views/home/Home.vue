<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabSwitch"
       ref="tabcontrol1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pullup-load="true" @scrollPos='scrollPos' @loadMore="loadMore">
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

import {homeMultiData, homeGoods} from 'network/home.js'

import {debounce} from 'common/util.js'

import {BackTopMixin} from 'common/mixin'

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
      tabTop: 0,
      isTabFixed: false,
      yWhenLeave: 0,
      imgLoadListener: null
    }
  },
  mixins: [BackTopMixin],
  created(){
    this.homeMultiData()

    this.homeGoods('pop')
    this.homeGoods('new')
    this.homeGoods('sell')
  },
  mounted() {
    //可使用mixin混入
    this.imgLoadListener = () => {
      debounce(this.$refs.scroll.refresh, 100)
      console.log('home img refreshed');    
    }
    this.$bus.$on('imgLoad', this.imgLoadListener)
  },
  deactivated() {
    this.yWhenLeave = this.$refs.scroll.scroll.y
    this.$bus.$off('imgLoad', this.imgLoadListener)
  },
  activated() {
    this.$refs.scroll.scroll.scrollTo(0, this.yWhenLeave, 0)
    this.$refs.scroll.scroll.refresh()
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

      this.$refs.scroll.scroll.finishPullUp()
    })
    },

    // 组件操作相关
    tabSwitch(index) {
      this.currentTab = this.tabTitles[index]
      this.$refs.tabcontrol1.currentIndex = index
      this.$refs.tabcontrol2.currentIndex = index
    },
    scrollPos(pos) {
      //是否显示回到顶部
      this.isShowBackTop = Math.abs(pos.y) > 1000
      //是否显示固定的tabcontrol
      this.isTabFixed = Math.abs(pos.y) >= this.tabTop
    },
    loadMore() {
      this.homeGoods(this.currentTab)
      this.$refs.scroll.refresh
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
  /* height: calc(100% - 93px); */
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>