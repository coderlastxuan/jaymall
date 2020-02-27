<template>
  <div class="homegoods">
      <home-goods-item v-for="item in goods" :goodsItem="item"></home-goods-item>
  </div>
</template>

<script>
import HomeGoodsItem from './HomeGoodsItem'

export default {
    name: 'HomeGoods',
    props: {
        goods: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        HomeGoodsItem
    }
}
</script>

<style>
.homegoods {
    display: flex;
    flex-wrap: wrap;
}

</style>