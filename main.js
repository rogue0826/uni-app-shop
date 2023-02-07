import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import{$http} from '@escook/request-miniprogram'

uni.$http = $http
// 请求的根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
//请求拦截器
$http.beforeRequest = function(options){
  uni.showLoading({
    title:"请求加载中..."
  })
} 
//相应拦截器 
$http.afterRequest = function(){
  uni.hideLoading() 
}

// 弹窗的方法   duration 持续时间

uni.$showMsg = function(title = '数据请求失败', duration = 1500 ) {
  uni.showToast({
    title,
    duration: 1500 ,
    icon: 'none'
    
  })
}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif