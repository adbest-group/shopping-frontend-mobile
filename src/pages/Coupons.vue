<template>
  <div v-title="title">
    <my-header id="header"></my-header>
      <!-- <div class="toApp">
        <img src="../assets/images/iosbanner.png" alt="">
      </div> -->
    <top-search
      :behaviorFun='getBehaviorAdd' 
      :refresh="refresh"></top-search>
    <coupons-items 
      :coupons="coupons"></coupons-items>
  </div>
</template>
<script>
  import { Loadmore } from 'mint-ui'
  import { mapActions, mapState } from 'vuex'
  import {baseTitle} from '../utils/Global'
  import TopSearch from '../components/TopSearch.vue'
  import MyHeader from '../components/MyHeader.vue'
  import CouponsItems from '../components/CouponsItems.vue'

  export default{
    name:'detail',
    data: () => ({
      title:'Coupons | ' + baseTitle
   }),
    components:{
      TopSearch,
      Loadmore,
      MyHeader,
      CouponsItems
    },
    computed: {
      ...mapState(['coupons'])
  },
  created () {
    this.getCoupons()
    },
  methods: {
   ...mapActions([
      'getBehaviorAdd',
      'getCoupons'
    ]),
    refresh () {
      this.$router.push('/coupons')
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

