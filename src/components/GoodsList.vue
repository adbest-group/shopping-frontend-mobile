<template>
  <div class="goodsList">
    <ul v-if="goodsList && goodsList.length > 0">
      <li
          class="goods" 
          v-for="(goods, index) in goodsList" 
          :key="goods.goodId"
          @click="seeDetail(index)">
        <h3 class="goods-title">
          <span class="price">{{goods.price}}</span>
          {{goods.title}}
        </h3>
        <div class="loading-wrapper" v-show="isLoadingIndex === index">
          <mt-spinner type="snake" class="loading" ></mt-spinner>
        </div>
        <div class="goods-content clearfix" v-if="!detailList[index] && !(isLoadingIndex === index)">
          <div class="left-img">
            <a :href="goods.url">
              <img v-lazy="goods.smallImageUrl" alt="">
            </a>
          </div>
          <div class="right-content">
            <p class="article">
              {{goods.shortContent}}
            </p>
          </div>
          <p class="source clearfix">
            <span class="sourceName">from {{dealDomain(goods.goodSourceName)}}</span>
            <span class="time">
              {{changeTime(goods.syncTime)}}
              <span class="mallName">
                {{goods.mallName}}
              </span>
            </span>
          </p>
        </div>
        <div class="goods-detail" ref="goodsDetail" v-if="detailList[index] && !(isLoadingIndex === index)">
          <p class="source clearfix">
            <span class="mallName" v-if="goods.mallName">
              {{goods.mallName}}
            </span>
            <span class="time">
              {{changeTime(goods.syncTime)}}
            </span>
          </p>
          <div class="detail-content">
            <figure>
              <figcaption class="title" v-if="detailList[index]">
                <span v-if="detailList[index].discounts">
                  {{detailList[index].discounts}}
                </span>
                <span v-if="!detailList[index].discounts && detailList[index].originalPrice">
                  {{detailList[index].price}}(
                  <i>{{detailList[index].originalPrice}}</i>
                  ,{{getOff(detailList[index].price, detailList[index].originalPrice)}} off)
                </span>
                <span class="price" v-if="!detailList[index].discounts && !detailList[index].originalPrice">
                  {{detailList[index].price}}
                </span>
              </figcaption>
              <p class="content">
                <span v-html="detailList[index].contentHtml && ignoreLink(detailList[index].contentHtml)">
                  {{detailList[index].contentHtml && ignoreLink(detailList[index].contentHtml)}}
                </span>
              </p>
              <img v-lazy="goods.smallImageUrl"/>
            </figure>
          </div>
        </div>
        <div class="goods-footer" :class="{seeMoreStyle: detailList[index]}" @click.stop>
          <div class='upvote'>
            <upvote class="upvote-icon" :getThumbsAdd="getThumbsAdd" :id="goods.id"></upvote>
            <span class="upvoteNum">{{goods.thumbs}}</span>
          </div>
          <div v-if="!detailList[index]" class="seeMore btn" @click="seeDetail(index)">See More</div>
          <a :href="goods.url" v-if="!detailList[index]">
            <div class="buyLink btn">Link</div>
          </a>
          <a :href="goods.url" v-if="detailList[index]">
            <div class="buyNowLink btn">Buy Now</div>
          </a>
          <div class="goods-shrink" v-if="detailList[index]" @click="shrink(index)">
            <img src="../assets/images/shrink.png" alt="">
          </div>
        </div>
      </li >
    </ul>
    <no-list v-else>
      没有找到相应商品
    </no-list>
  </div>
</template>

<script>
import NoList from './NoList.vue'
import upvote from '../components/Upvote.vue'
import { changeTime, dealDomain, ignoreLink, getOff } from '../utils/utils';
import { mapActions, mapState } from 'vuex'
import { Spinner, Lazyload } from 'mint-ui';
export default {
  props: {
    goodsList: {
      type: Array,
      default () {
        return [];
      }
    },
    getThumbsAdd: {
      type: Function
    },
    behaviorFun: {
      type: Function,
    }
  },
  computed: {
    ...mapState([
      'goodsDetail'
    ])
  },
  data() {
    return {
      ignoreLink,
      getOff,
      detailList: [], // 详情列表
      indexList: [], // 用来存储已查看详情的商品的index  用于收缩详情时查询dom以便于滚回原来高度
      isLoadingIndex: null // 是否显示loading动画
    }
  },
  methods: {
    ...mapActions(['getGoodsDetail']),
    changeTime (time) {
      return changeTime(time)
    },
    dealDomain(domain) {
      return dealDomain(domain)
    },
    seeDetail(index) { // 查看详情
     let data = {type: '1',url: this.$route.fullPath, goodId: this.goodsList[index].id}
     this.isLoadingIndex = index
      this.behaviorFun(data).then(() => {
        this.getGoodsDetail({id: data.goodId})
      })
    },
    shrink(index) { // 收缩详情
      var detailIndex = this.indexList.indexOf(index)
      var detailH = this.$refs.goodsDetail[detailIndex].offsetHeight

      document.documentElement.scrollTop -= detailH

      this.isLoadingIndex = index
      this.detailList[index] = null;
      this.isLoadingIndex = null
      this.indexList.splice(detailIndex, 1)
    }
  },
  watch: {
    'goodsDetail' (to, from) {
      this.detailList[this.isLoadingIndex] = to
      this.indexList.push(this.isLoadingIndex)
      this.isLoadingIndex = null
    }
  },
  components: {
    NoList,
    upvote,
    Spinner
  }
}
</script>

<style lang="scss" scoped>
  .goodsList{
    .goods{
      width: 100%;
      padding: .126rem .192rem;
      border-bottom: 1px solid #eaeaea;

      .goods-title{
        color: #444;
        font-weight: 500;font-size: .34rem;
        .price{
          color: red;
          font-weight: bold;
        }
      }

      .loading-wrapper{
        position: relative;
        padding: 1rem 0;
        .loading{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .goods-content{
        margin-top: .3rem;
        .left-img{
          float: left;
          margin:0 .14rem;
          img{
            height: 1.3rem;
            max-width: 1.3rem;
          }
        }
        .right-content{
          float: left;
          width: 4.3916rem;
          margin-left: .03rem;
          .article{
            height: 1.14rem;
            word-break: break-word;
            overflow: hidden;
            font-size: .28rem;
            color: #aaa;
          }
        }

        .source{
          height: .32rem;
          line-height: .32rem;
          margin-top: .13rem;
          padding: 0 .14rem;
          color: #aaa;

          .sourceName{
            float: left;
          }
          .time{
            float: right;
            color: #48a753;
            .mallName{
              color: #323232;
              font-weight: bold;
            }
          }
        }
      }

      .goods-detail{
        .source{
          span{
            height: .32rem;
            line-height: .32rem;
            margin-top: .13rem;
            padding-right: .14rem;
            float: left;

            &.mallName{
              color: #aaa;
            }
            &.time{
              color: #48a753;
            }
          }
        }

        .detail-content{
          color: #48494d;
          .title{
            margin: .12rem 0;
            font-weight: 500;
            
            .price{
              color: red;
              font-weight: bold;
              font-size: .28rem;
            }
          }
          img{
            max-width: 100%;
            display: block;
            margin: .15rem auto .3rem;
          }
        }
      }

      .goods-footer{
        position: relative;
        height: .6rem;
        margin-bottom: .15rem;
        margin-top: .05rem;
        .upvote{
          position: absolute;
          width: 1rem;
          left: .14rem;
          top: 0;
          .upvoteNum{
            position: absolute;
            left: .74rem;
            top: .2rem;
            color: #aaa;
          }
        }

        .btn{
          position: absolute;
          top: .1rem;
          right: 0;
          width: 1.6468rem;
          height: .5956rem;
          text-align: center;
          padding: .088rem .26rem;
          background-color: #ff2069;
          font-size: .28rem;
          color: #fff;
          border-radius: .06rem;
          font-weight: 600;

          &.seeMore{
            width: 2rem;
            right: 1.8rem;
            background-color: #f5f5f5;
            color: #666;
          }
        }
      }

      .seeMoreStyle{
        height: 2.78rem;
        .upvote{
          left: 50%;
          top: 1.15rem;
          transform: translateX(-50%);
        }
        .buyNowLink {
          width: 2.7rem;
          height: .8rem;
          line-height: .8rem;
          font-size: .32rem;
          padding: 0;
          right: 50%;
          transform: translateX(50%);
        }

        .goods-shrink{
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
</style>

