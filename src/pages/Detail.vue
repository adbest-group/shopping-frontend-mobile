<template>
  <div>
    <!-- <top-search :hotWords='hotWords' :behaviorFun='getBehaviorAdd'></top-search> -->
    <div id="main" class="clearfix">
      <div id="sidebar">
        <right-banner></right-banner>
        <hot-goods :hotGoods='hotGoods'></hot-goods>
      </div>
      <div id="content">
        <crumbs></crumbs>
        <div class="product detail">
          <div class="detail-info">
            <div class="picInfo">
              <div class="pic">
                <div class="subpic"><img :src="goodsDetail.smallImageUrl" :onerror="errorImg"></div>
              </div>
              <a :href='goodsDetail.url' class="tobuywordBtn" @click="getBehaviorAdd({type:'2',url:$route.fullPath,goodId:goodsDetail.id})">Buy Now</a>
              <div class="rightmall">
                　{{changeTime(goodsDetail.syncTime)}}
             <a class="mallBtn" :href='goodsDetail.url' target="_blank" title="">{{goodsDetail.mallName}}</a>
              </div>
              <div class='detail-upvote'>
                <upvote :getThumbsAdd="getThumbsAddDetail" :id="goodsDetail.goodId"></upvote>
                <span class="upvoteNum">{{goodsDetail.thumbs}}</span>
              </div>
            </div>
            <div class="title">
              <span v-if="goodsDetail.discounts">{{goodsDetail.discounts}}</span>
              <span v-if="!goodsDetail.discounts&&goodsDetail.originalPrice">{{goodsDetail.price}}(<i>{{goodsDetail.originalPrice}}</i>,{{getOff(goodsDetail.price,goodsDetail.originalPrice)}} off)</span>
              <span v-if="!goodsDetail.discounts&&!goodsDetail.originalPrice">{{goodsDetail.price}}</span>
              {{goodsDetail.title}}</div>
            <p>
              <span v-html="goodsDetail.contentHtml&&ignoreLink(goodsDetail.contentHtml)">
                 {{goodsDetail.contentHtml&&ignoreLink(goodsDetail.contentHtml)}}
              </span>
            </p>
          </div>
        </div>
        <Recommend v-if="maybeLike>3" :list="maybeLike" hd="Deals and coupons you may like" :behaviorFun='getBehaviorAdd'></Recommend>
        <Recommend v-if="mallHot.length>3" :list="mallHot" :hd="`${goodsDetail.mallName} hot goods`" :behaviorFun='getBehaviorAdd'></Recommend>
      </div>
    </div>
    <gt-footer></gt-footer>
  </div>
</template>
<script>
  import TopSearch from '../components/TopSearch.vue'
  import HotGoods from '../components/HotGoods.vue'
  import Crumbs from '../components/Crumbs.vue'
  import RightBanner from '../components/RightBanner.vue'
  import gtFooter from '../components/Footer.vue'
  import upvote from '../components/Upvote.vue'
  import Recommend from '../components/Recommend.vue'
  import { mapActions, mapState } from 'vuex'
  import {ignoreLink,changeTime,getOff} from '../utils/utils'
  import {baseTitle} from '../utils/Global'


  export default{
    name:'detail',
    data: () => ({
    errorImg: 'this.src="' + require('../assets/images/no_imgs.png') + '"'
   }),
    components:{
      TopSearch,
      HotGoods,
      RightBanner,
      Crumbs,
      gtFooter,
      upvote,
      Recommend
    },
    computed: {
      ...mapState(['hotWords','hotGoods','goodsDetail','mallHot','maybeLike'])
  },
  created () {
    this.getHotGoods();
    this.getHotWords()
    this.getMaybeLike({id:this.$route.params.id})
    this.getMallHot({id:this.$route.params.id})
    this.getGoodsDetail({id:this.$route.params.id})
    },
  methods: {
    changeTime: function(time) {
      return changeTime(time);
    },
    ignoreLink:function (html){
      return ignoreLink(html)
    },
    getOff:function(price,originalPrice){
      return getOff(price,originalPrice);
    },
   ...mapActions([
      'getHotGoods',
      'getHotWords',
      'getGoodsDetail',
      'getBehaviorAdd',
      'getThumbsAddDetail',
      'getMaybeLike',
      'getMallHot',
    ])
   },
   watch:{
    'goodsDetail' (to,from){
      if(to){
        document.title = to.title + ' | ' +baseTitle
      }else{
        document.title = baseTitle;
      }
    }
   }
  }
</script>

