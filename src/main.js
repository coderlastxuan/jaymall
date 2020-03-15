import Vue from 'vue'

import App from './App.vue'

import router from './router'
import store from './store'

import FastClick from 'fastclick'
import LazyLoad from 'vue-lazyload'

import toast from './components/content/toast'

Vue.config.productionTip = false

Vue.use(toast)

FastClick.attach(document.body)

Vue.use(LazyLoad, {
  loading: require('./assets/img/common/chengguo.png')
})

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
