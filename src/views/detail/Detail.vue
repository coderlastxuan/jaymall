<template>
  <div id="goods-detail">
    <detail-nav class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav>
    <scroll
      ref="scroll"
      class="detail-content"
      :probe-type="3"
      :pullup-load="true"
      @scrollPos="scrollPos"
    >
      <detail-swiper :swiper-data="swiperData"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @deImgLoad="deImgLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment :comment-info="commentInfo" ref="comment"></detail-comment>
      <home-goods :goods="recommendInfo" ref="recommend"></home-goods>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import {getDetailData, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'

import DetailNav from './detailchild/DetailNav'
import DetailSwiper from './detailchild/DetailSwiper'
import DetailBaseInfo from './detailchild/DetailBaseInfo'
import DetailShopInfo from './detailchild/DetailShopInfo'
import DetailGoodsInfo from "./detailchild/DetailGoodsInfo"
import DetailParamInfo from './detailchild/DetailParamInfo'
import DetailComment from './detailchild/DetailComment'
import DetailBottomBar from './detailchild/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import HomeGoods from 'components/content/goods/HomeGoods'

import {debounce} from 'common/util.js'

import {BackTopMixin} from 'common/mixin'

export default {
    name: 'Detail',
    data() {
        return {
            iid: '',
            swiperData: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo:{},
            commentInfo: {},
            recommendInfo: [],
            imgLoadListener: null,
            navTitleY: [],
            getNavY: null,
            currentIndex: 0,
        }
    },
    mixins: [BackTopMixin],
    created() {
        this.iid = this.$route.query.iid
        getDetailData(this.iid).then(res => {
            console.log(res);
            const data = res.result
            this.swiperData = data.itemInfo.topImages
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            this.shop = new Shop(data.shopInfo)
            this.detailInfo = data.detailInfo
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            if(data.rate.list) {
                this.commentInfo = data.rate.list[0]
            }
        })
        getRecommend().then(res => {
            console.log(res);         
            this.recommendInfo = res.data.list
        })
        this.getNavY = debounce(() => {
            this.navTitleY = []
            this.navTitleY.push(0)
            this.navTitleY.push(this.$refs.params.$el.offsetTop)
            this.navTitleY.push(this.$refs.comment.$el.offsetTop)
            this.navTitleY.push(this.$refs.recommend.$el.offsetTop)
            this.navTitleY.push(100 * Math.max.apply(Math, this.navTitleY))
            console.log(this.navTitleY);         
        },100)
    },
    mounted() {
        this.imgLoadListener = () => debounce(this.$refs.scroll.refresh, 100)
        this.$bus.$on('imgLoad', this.imgLoadListener)
    },
    destroyed() {
        this.$bus.$off('imgLoad', this.imgLoadListener)
    },
    methods: {
        deImgLoad() {
            this.$refs.scroll.refresh()
            this.getNavY()
        },
        titleClick(index) {
            this.$refs.scroll.scroll.scrollTo(0, -this.navTitleY[index], 300)
        },
        scrollPos(pos) {
            this.isShowBackTop = Math.abs(pos.y) > 1500
            const y = - pos.y
            for(let i = 0; i < this.navTitleY.length; i++) {           
                if(this.currentIndex !== i && (y >= this.navTitleY[i] && y < this.navTitleY[i+1])) {
                    this.currentIndex = i
                    this.$refs.nav.currentIndex = this.currentIndex
                    }
                }
        },
        addToCart() {
            const product = {}
            product.iid = this.iid
            product.img = this.swiperData[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = parseInt(this.goods.nowPrice)
            this.$store.dispatch({
                type: 'addToCart',
                product
            }).then((res) => {
                this.$toast.showToast(res, 2000)
            })
        }
    },
    components: {
        DetailNav,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailComment,
        HomeGoods,
        DetailBottomBar
    }
}
</script>

<style>
#goods-detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>