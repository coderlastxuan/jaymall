<template>
  <swiper>
     <swiper-item v-for="item in swiperData">
         <div class="swiper-item">
             <img :src="item" alt="">
         </div>
     </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
    name: 'DetailSwiper',
    props: {
        swiperData: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    }
}
</script>

<style>
.swiper-item {
    height: 300px;
}
.swiper-item img {
    width: 100%;
}
</style>