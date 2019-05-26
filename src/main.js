import Vue from 'vue'
import App from './App.vue'
import VueTabs from 'vue-nav-tabs'
Vue.use(VueTabs)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
/* eslint-disable */
console.log(fetch("/slackfile/").response())
console.log("break")
fetch("/slackfile/")
  .then(response => response.text())
  .then(txt => {
    console.log(txt)
  });console.log(fetch("/slack/T025EV233-FJZB1MFT9/fiveminutespluszeroseconds.txt").response())
  console.log("break")
  fetch("/slack/T025EV233-FJZB1MFT9/fiveminutespluszeroseconds.txt")
    .then(response => response.text())
    .then(txt => {
      console.log(txt)
    });
