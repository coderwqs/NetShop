import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

import toast from 'components/common/toast'

Vue.config.productionTip = false

//  Vue原型中添加$bus ‘事件总线’
Vue.prototype.$bus = new Vue()

//  安装toast插件
Vue.use(toast)

//  解决移动端300ms延迟
FastClick.attach(document.body)

//  使用图片懒加载插件
Vue.use(VueLazyload,{
    loading:require('./assets/img/common/placeholder.png')
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
