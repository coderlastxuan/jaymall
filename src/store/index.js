import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: [],
    cartSelectAll: false,
  },
  getters: {
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    },
    checkedLen(state) {
      return state.cartList.filter(item => item.checked == true).length
    }
  },
  mutations: {
    addNewProd(state, payload) {
      state.cartList.push(payload.product)
    },
    addOldProd(state, prod) {
      prod.count++
    },
    changeChecked(state, index) {
      state.cartList[index].checked = !state.cartList[index].checked
      state.cartSelectAll = !state.cartList.find(item => item.checked == false)
    },
    changeSelectAll(state) {
      state.cartSelectAll = !state.cartSelectAll
      for (let item of state.cartList) {
        item.checked = state.cartSelectAll
      }
    }
  },
  actions: {
    addToCart(context, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload);
        let prod = context.state.cartList.find(item => payload.product.iid === item.iid)
        if (prod) {
          context.commit('addOldProd', prod)
          resolve('商品数加一')
        } else {
          payload.product.count = 1
          payload.product.checked = false
          context.commit('addNewProd', payload)
          resolve('添加新商品')
        }
      })
    }
  },
  modules: {}
})
