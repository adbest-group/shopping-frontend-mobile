<template>
  <div v-title="title">
    <top-search :hotWords='hotWords' :behaviorFun='getBehaviorAdd' pathOn='Coupons'></top-search>
    <div id="main" class="clearfix">
      <div id="sidebar">
        <right-banner></right-banner>
        <right-stores></right-stores>
        <hot-goods :hotGoods='hotGoods'></hot-goods>
      </div>
      <div id="content">
          <crumbs Particulars='Coupons'></crumbs>
          <popular-stores></popular-stores>
          <coupons-items :coupons='coupons'></coupons-items>
      </div>
    </div>
    <gt-footer></gt-footer>
  </div>
</template>
<script>
  import TopSearch from '../components/TopSearch.vue'
  import RightStores from '../components/RightStores.vue'
  import HotGoods from '../components/HotGoods.vue'
  import gtFooter from '../components/Footer.vue'
  import RightBanner from '../components/RightBanner.vue'
  import Crumbs from '../components/Crumbs.vue'
  import PopularStores from '../components/PopularStores'
  import CouponsItems from '../components/CouponsItems'
  import { mapActions, mapState } from 'vuex'
  import {baseTitle} from '../utils/Global'

  export default{
    name:'detail',
    data: () => ({
      title:'Coupons | ' + baseTitle
   }),
    components:{
      TopSearch,
      RightStores,
      HotGoods,
      RightBanner,
      gtFooter,
      Crumbs,
      PopularStores,
      CouponsItems
    },
    computed: {
      ...mapState(['hotWords','hotGoods','coupons'])
  },
  created () {
    this.getHotGoods()
    this.getHotWords()
    this.getCoupons()
    },
  methods: {
   ...mapActions([
      'getHotGoods',
      'getHotWords',
      'getBehaviorAdd',
      'getCoupons'
    ])
   }
  }
</script>

