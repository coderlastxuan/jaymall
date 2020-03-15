<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item" :indexInCart="index"></cart-list-item>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
};
</script>

<style>
/* .cart-list {
        height: calc(100% - 44px - 49px);
    }

    .cart-content {
        height: 100%;
        overflow: hidden;
    } */
</style>