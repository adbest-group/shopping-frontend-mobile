<template>
  <div>
    <top-search :hotWords='hotWords' :behaviorFun='getBehaviorAdd'></top-search>
    <div id="main" class="clearfix">
      <div id="sidebar">
        <right-banner></right-banner>
        <hot-goods :hotGoods='hotGoods'></hot-goods>
      </div>
      <div id="content">
        <router-view></router-view>
      </div>
    </div>
    <gt-footer></gt-footer>
  </div>
</template>
<script>
  import TopSearch from '../components/TopSearch.vue'
  import HotGoods from '../components/HotGoods.vue'
  import RightBanner from '../components/RightBanner.vue'
  import gtFooter from '../components/Footer.vue'
  import { mapActions, mapState } from 'vuex'

  export default{
    name:'detail',
    components:{
      TopSearch,
      HotGoods,
      RightBanner,
      gtFooter
    },
    computed: {
      ...mapState(['hotWords','hotGoods'])
  },
  created () {
    this.getHotGoods();
    this.getHotWords()
  },
  methods: {
  ...mapActions([
      'getHotGoods',
      'getHotWords',
      'getBehaviorAdd'
    ])
  }
  }
</script>

