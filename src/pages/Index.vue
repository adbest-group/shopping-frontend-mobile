<template>
  <div v-title="title">
      <my-header id="header"></my-header>
      <!-- <div class="toApp">
        <img src="../assets/images/iosbanner.png" alt="">
      </div> -->
      <top-search
        :behaviorFun='getBehaviorAdd' 
        :refresh="loadTop"></top-search>
      <mt-loadmore  
          :top-method="loadTop"
          :bottomAllLoaded="bottomAllLoaded" 
          :bottom-method="loadBottom" 
          :autoFill="autoFill" 
          ref="loadmore"
          style="width:100%">
        <a class="feednotify" v-if="goodsNotify > criticalNotifyNum"  @click="getGoodsList($route.query)">
          <span>●</span>
          <span>There are {{goodsNotify}} new entries for this view ></span>
        </a>
        <goods-list 
          :goodsList="goodsList" 
          :getThumbsAdd="getThumbsAdd"
          :behaviorFun='getBehaviorAdd'></goods-list>
      </mt-loadmore>
  </div>
</template>
<script>
  import MyHeader from '../components/Myheader'
  import GoodsList from '../components/GoodsList'
  import { Loadmore } from 'mint-ui';
  import TopSearch from '../components/TopSearch.vue'
  import qs from 'qs';
  import { mapActions, mapState,mapGetters } from 'vuex'
  import { autoFetchTime, criticalNotifyNum,baseTitle } from '../utils/Global'

  export default{
  name:'index',
  components:{
    MyHeader,
    TopSearch,
    GoodsList,
    Loadmore
  },
    data () {
      return {
        criticalNotifyNum: criticalNotifyNum,
        title:baseTitle,
        loadFlag:false,
        addPage:0,
        bottomAllLoaded: false,  // bottomAllLoaded 为真时将不加载新数据 即所有数据加载完成后
        autoFill: false // 是否填充容器
      }
    },
    methods: {    //绑定事件的关键代码
      loadTop () { // 下拉刷新
        this.changePage(1)
        this.$refs.loadmore.onTopLoaded();
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      loadBottom () { // 上啦加载
        this.autoFill = false
        this.changePage(this.goodsPageIndex + 1)
        this.$refs.loadmore.onBottomLoaded()
        this.autoFill = true
        if(this.goodsPageIndex + 1 === this.getPageCount) {
          this.bottomAllLoaded = true
        }

      },
      changePage(i) {
        var obj =Object.assign({}, this.$route.query, {page: i})
        var d = qs.stringify(obj);
        this.$router.push({path:'/?'+d})
      },
      ...mapActions([
        'getGoodsList',
        'getGoodsNotify',
        'getSearchList',
        'getBehaviorAdd',
        'getThumbsAdd'
        ])
    },
  computed: {
    ...mapGetters(['getPageCount']),
    ...mapState(['goodsList','goodsPageIndex','goodsNotify','maxId','maxSyncTime']),
    currentPage(){
      return this.goodsPageIndex-1
    }
  },
  created () {
    if(this.$route.query.key){
      this.getSearchList(this.$route.query);
    }
    else {
      this.getGoodsList(this.$route.query);
    };

    //定时请求任务  获取新增条目数;
    this.intervalid = setInterval(() => {
        //原数据中没有 goodsList 或者 this.$route.query.key存在时 不求数据
        if(this.goodsList && !this.$route.query.key){
          this.getGoodsNotify(Object.assign({}, this.$route.query, {id: this.maxId, sync: this.maxSyncTime}));
       }
     }, autoFetchTime);

  },
  watch:{
    '$route' (to, from) {
      if(to.query.key){
        this.addPage = 0
        this.getSearchList(to.query)
      }
      else{
        this.addPage = 0
        this.getGoodsList(to.query)
      }
    },
    'goodsNotify' (to,from) {
      if(to&&to>criticalNotifyNum){
        document.title = '(' + to + ' new entries) '+baseTitle;
      }else{
        document.title = baseTitle;
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalid)
  }
}
</script>

<style lang="scss" scoped>
  .toApp{
    img {
      width: 100%;
    }
  }
  .feednotify{
    background: #e7f6e7;
    display: block;
    text-align: center;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    span:nth-child(2){
      line-height: 350%;  
      color: #5db95b;  
      font-size: .26rem;
    }
    span:nth-child(1){ 
      line-height: 350%;  
      color: #ff998a;  
      font-size: .26rem;
    }
  }
</style>

