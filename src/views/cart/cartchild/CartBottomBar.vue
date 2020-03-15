<template>
  <div class="bottom-bar">
    <div class="select-all">
      <check-button class="check-button" @click.native="changeSelectAll" :is-checked="selectAll"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      <span>合计：</span>
      <span>￥ {{totalPrice}}</span>
    </div>
    <div class="to-checkout">去结算({{checkedLen}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["checkedLen", "cartList"]),
    totalPrice() {
      const cartList = this.$store.getters.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, next) => {
          return preValue + next.count * next.price
        }, 0).toFixed(2)
    },
    selectAll() {
      return this.$store.state.cartSelectAll
    }
  },
  methods: {
    changeSelectAll() {
      this.$store.commit('changeSelectAll')
    }
  }
};
</script>

<style>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}

.select-all {
  display: flex;
  align-items: center;
  flex: 2;
  padding-left: 5px;
}

.select-all .check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
}

.select-all span {
  padding-left: 5px;
}

.total-price {
  flex: 3;
}

.to-checkout {
  flex: 2;
  background-color: orangered;
  color: #fff;
  text-align: center;
}
</style>