<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <scroll class="cart-content" ref="scroll" @scrollPos="scrollPos">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar class="cart-bottom-bar"></cart-bottom-bar>
    <!-- <back-top></back-top> -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./cartchild/CartList";
import CartBottomBar from './cartchild/CartBottomBar'

import Scroll from "components/common/scroll/Scroll";

import { BackTopMixin } from "common/mixin";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  mixins: [BackTopMixin],
  computed: {
    ...mapGetters({
      length: "cartLength"
    })
  },
  methods: {
    scrollPos(pos) {
      this.isShowBackTop = Math.abs(pos.y) > 1500;
    }
  }, 
  activated() {
    this.$refs.scroll.scroll.refresh()
  }
};
</script>

<style>
#cart {
  height: 100hv;
  position: relative;
}

.cart-nav {
  position: relative;
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  z-index: 9;
}

.cart-content {
  position: absolute;
  top: 44px;
  bottom: 89px;
  right: 0;
  left: 0;
}

.cart-bottom-bar {
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>