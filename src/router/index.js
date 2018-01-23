import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/Index.vue'
import detail from '../pages/Detail.vue'
import notFound from '../pages/NotFound.vue'
import us from '../pages/Us.vue'
import contactUs from '../pages/ContactUs.vue'
import aboutUs from '../pages/AboutUs.vue'
import disclaimer from '../pages/Disclaimer.vue'
import coupons from '../pages/Coupons.vue'
import gifts from '../pages/Gifts.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  //base: '/dist',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    { path: '/us', component: us,
      children: [
        {
          path: '/',
          component: contactUs
        },
        {
          path: 'contactUs',
          component: contactUs
        },
        {
          path: 'aboutUs',
          component: aboutUs
        },
        {
          path: 'disclaimer',
          component: disclaimer
        }
      ]
    },
    {
      path: '/coupons/',
      name: 'coupons',
      component: coupons
    },
    {
      path: '/gifts/',
      name: 'gifts',
      component: gifts
    },
    {
      path: '*',
      name: 'notFound',
      component: notFound
    }
  ]
})
