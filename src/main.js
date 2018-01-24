import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Icon from 'vue-svg-icon/Icon.vue';
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import MintUI from 'mint-ui'
import VueScrollTo from 'vue-scrollto'
import 'mint-ui/lib/style.css'
import './utils/rem'

Vue.config.productionTip = false

import global_ from './utils/Global.js'
Vue.prototype.GLOBAL = global_
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value;
    //document.title = el.innerText
    //el.remove()
  }
})
Vue.component('icon', Icon);

Vue.use(Toast, {
  defaultType: 'center',
  duration: 1500,
});

Vue.filter('uppercase', function(value) {
  if (!value) { return ''}
  value = value.toString()
  return value.toUpperCase() ;
})

Vue.use(VueScrollTo)

Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  cancelable: true,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

Vue.use(MintUI)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
