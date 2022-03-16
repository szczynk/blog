import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  listenEvents: ['scroll'],
  throttleWait: 500,
})
