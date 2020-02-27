<template>
  <div>
      <swiper>
          <swiper-item v-for="banner in banners">
              <a :href="banner.link">
                  <img :src="banner.image" alt="no pic" @load="swiperLoad">
              </a>
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name: 'HomeSwiper',
    components: {
        Swiper,
        SwiperItem
    },
    data() {
        return {
            isLoad: false
        }
    },
    props: {
        banners: {
            type: Array,
            default(){
                []
            }
        }
    },
    methods: {
        swiperLoad() {
            if ((this.isLoad) == false) {
                this.$emit('swiperImgLoad')
            }
        }
    }
}
</script>

<style>

</style>