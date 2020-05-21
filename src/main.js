import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import './styles/element-variables.scss'

import Bmap from 'vue-baidu-map' // 引入百度地图

import '@/styles/index.scss' // 全局 css

import App from './App'
import store from './store'
import router from './router'

import './icons' // 图标
import './permission' // 权限控制
import './utils/error-log'

import * as filters from './filters' // 全局过滤

import { mockXHR } from '../mock' // 数据模拟
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})
Vue.use(Bmap, {
  ak: 'YVE2oN3K3SDZH8XpUkYj6ezf2h4wIkNf' // 百度地图秘钥
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
