<template>
  <div v-title="title">
    <top-search :hotWords='hotWords' :behaviorFun='getBehaviorAdd' pathOn='Gifts'></top-search>
    <div id="main" class="clearfix">
      <div id="sidebar">
        <right-banner></right-banner>
        <right-stores></right-stores>
        <hot-goods :hotGoods='hotGoods' :behaviorFun='getBehaviorAdd'></hot-goods>
      </div>
      <div id="content">
        <recommend :list="giftsForAll" hd="Gfits For All" :behaviorFun='getBehaviorAdd'></recommend>
        <recommend :list="giftsForHer" hd="Gfits For Her" :behaviorFun='getBehaviorAdd'></recommend>
        <recommend :list="giftsForHim" hd="Gfits For Him" :behaviorFun='getBehaviorAdd'></recommend>
        <recommend :list="giftsForKids" hd="Gfits For Kids" :behaviorFun='getBehaviorAdd'></recommend>
        <recommend :list="giftsForSenior" hd="Gfits For Senior" :behaviorFun='getBehaviorAdd'></recommend>
      </div>
    </div>
    <gt-footer></gt-footer>
  </div>
</template>
<script>
  import TopSearch from '../components/TopSearch.vue'
  import Banner from '../components/Banner.vue'
  import Navigation from '../components/Navigation.vue'
  import RightStores from '../components/RightStores.vue'
  import HotGoods from '../components/HotGoods.vue'
  import RightBanner from '../components/RightBanner.vue'
  import gtFooter from '../components/Footer.vue'
  import recommend from '../components/Recommend.vue'
  import qs from 'qs';
  import { mapActions, mapState,mapGetters } from 'vuex'
  import { autoFetchTime, criticalNotifyNum,baseTitle } from '../utils/Global'

  export default{
    name:'index',
    components:{
      TopSearch,
      Banner,
      Navigation,
      RightStores,
      HotGoods,
      RightBanner,
      gtFooter,
      recommend
    },
      data () {
        return {
          title : 'Gifts | ' + baseTitle
        }
      },
      methods: {    //绑定事件的关键代码
        ...mapActions([
          'getHotGoods',
          'getMalls',
          'getCategorys',
          'getHotWords',
          'getBehaviorAdd',
          'getThumbsAdd',
          'getGiftsForAll',
          'getGiftsForHer',
          'getGiftsForHim',
          'getGiftsForKids',
          'getGiftsForSenior'
          ])
      },
    computed: {
      ...mapState(['hotWords','hotGoods','malls','categorys','giftsForAll','giftsForHer','giftsForHim','giftsForKids','giftsForSenior']),
      flag(){
        if(this.$route.query.key){return false}
        else return true;
      }
    },
    created () {
      this.getHotGoods();
      this.getMalls();
      this.getCategorys();
      this.getHotWords();
      this.getGiftsForAll();
      this.getGiftsForHer();
      this.getGiftsForHim();
      this.getGiftsForKids();
      this.getGiftsForSenior();
    },
    watch:{
      
    }
  }
</script>
