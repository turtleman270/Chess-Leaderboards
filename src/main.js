import Vue from 'vue'
import App from './App.vue'
import VueTabs from 'vue-nav-tabs'
Vue.use(VueTabs)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
