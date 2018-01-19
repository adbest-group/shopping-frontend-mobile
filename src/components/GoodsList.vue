<template>
  <div class="goodsList">
    <ul v-if="goodsList && goodsList.length > 0">
      <router-link 
          tag="li" 
          :to="`detail/${goods.id}`" 
          class="goods" 
          v-for="goods in goodsList" 
          :key="goods.goodId"
          @click="behaviorFun({type: '1',url: $route.fullPath,goodId: goods.id})">
        <h3 class="goods-title">
          <span class="price">{{goods.price}}</span>
          {{goods.title}}
        </h3>
        <div class="goods-content clearfix">
          <div class="left-img">
            <img :src="goods.smallImageUrl" alt="">
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
        <div class="goods-footer" @click.stop>
          <div class='upvote'>
            <upvote class="upvote-icon" :getThumbsAdd="getThumbsAdd" :id="goods.id"></upvote>
            <span class="upvoteNum">{{goods.thumbs}}</span>
          </div>
          <div class="buyLink">Link</div>
        </div>
      </router-link >
    </ul>
    <no-list v-else>
      没有找到相应商品
    </no-list>
  </div>
</template>

<script>
import NoList from './NoList'
import upvote from '../components/Upvote.vue'
import { changeTime, dealDomain } from '../utils/utils';
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
  methods: {
    changeTime (time) {
      return changeTime(time)
    },
    dealDomain(domain) {
      return dealDomain(domain)
    }
  },
  components: {
    NoList,
    upvote
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

      .goods-footer{
        position: relative;
        height: .6rem;
        margin-bottom: .3rem;
        .upvote{
          position: absolute;
          left: .14rem;
          top: 0;
          .upvoteNum{
            position: absolute;
            left: .74rem;
            top: .2rem;
            color: #aaa;
          }
        }
        .buyLink{
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
        }
      }
    }
  }
</style>

