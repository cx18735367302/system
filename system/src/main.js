// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Element from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
Vue.use(Element)
Vue.prototype.$Axios = Axios
// Vue.prototype.Host = '/api/'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Element
})
