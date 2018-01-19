<template>
  <div>
    <div class="search clearfix">
      <ul class="hot">
        <li class="hotKey" v-for="(key, index) in keyList" :key="index" :class="{'active': index === 0}">
          {{key}}
        </li>
      </ul>
      <div class="btnGroup">
        <div class="searchBtn" @click="showCover">
          <img src="../assets/images/search.png" alt="">
        </div>
        <div class="refreshBtn" @click="refresh">
          <img src="../assets/images/refresh.png" alt="">
        </div>
      </div>
    </div>
    <div id="navbar"></div>
    <div class="backCover" v-show="coverFlag" @click="hideCover">
      <div class="search-wrapper" @click.stop>
        <div class="search-header clearfix">
          <span class="title">搜索本站折扣</span>
          <div class="closeBtn" @click="hideCover">
            <img src="../assets/images/closeicon.png" alt="">
          </div>
        </div>
        <div class="search-form clearfix">
          <input type="text" class="search-text" v-model="search" @keyup.enter="doSearch">
          <img src="../assets/images/searchicon.png" alt="" @click="doSearch">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {createUrl} from '../utils/utils';
    export default {
      name:'topSearch',
      data(){
        return {
          keyList: ['商品列表', '热门商品', '九块九'],
          coverFlag: false, // 是否显示遮罩层
          search:'',
          linkList:[{link:"/",name:'Home'},{link:"/coupons",name:'Coupons'},{link:"/gifts",name:'Gifts'},{link:"/?category=Beauty",name:'Beauty'},{link:"/?category=Clothing,%20Jewelry%20%26%20Bags",name:'Clothing'},{link:"/?category=Kids",name:'Kids'},{link:"/?category=Electronics",name:'Electronics'}],
          searchBarFixed:false,
          offsetTop:0,//初始位置
          flag:false// 延后获取初始位置的flag
        }
      },
      props:{
        refresh: {
          type: Function
        },
        hotWords:{
          default:[]
        },
        behaviorFun: {
          type: Function,
        },
        pathOn:{
          default:'Home'
        }
      },
      computed:{
        queryCategory(){
          return this.$route.query.category;
        }
      },
      methods: {    //绑定事件的关键代码
        showCover () { // 显示遮罩层
          this.coverFlag = true
        },
        hideCover () { // 隐藏遮罩层
          this.coverFlag = false
        },
        changePage: function(key){
          var d = createUrl({page:1,key:key});
          this.behaviorFun({type:3,url:this.$route.fullPath,key:key});
          this.$router.push({path:'/?'+d})
        },
        doSearch:function(){
          var text = this.search.trim();
          if(text){
            this.changePage(text)
            this.search = '';
            this.hideCover()
          }
        },
        gotoIndex: function(){
          var obj =Object.assign({}, this.$route.query, {page:1,key:''})
          var d = createUrl(obj);
          this.$router.push({path:'/?'+d})
        },
        handleScroll () {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          if(!this.flag){
            this.flag=true
            this.offsetTop = document.querySelector('#navBar').offsetTop
          }
          if (scrollTop > this.offsetTop+10) {
            this.searchBarFixed = true
          } else {
            this.searchBarFixed = false
          }
        },
        checkMenuAndCategory(category,menu){
          return category&&menu&&(category.toLowerCase().indexOf(menu.toLowerCase()) > -1)
        }
      },
      watch:{
        '$route' (to, from) {
          this.search=to.query.key;
        }
      },
      created () {
        this.search=this.$route.query.key;
      },
      mounted () {
        // this.handleScroll();
        // window.addEventListener('scroll', this.handleScroll)
        // this.offsetTop = document.querySelector('#navBar').offsetTop
        // console.log(document.querySelector('#navBar'))
        //console.log(queryCategory);
      }

    }
</script>
<style lang="scss" scoped>
  .search{
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .hot{
      float: left;
      .hotKey{
        padding: 0 .1rem;
        height: .54rem;
        line-height: .54rem;
        margin: .18rem;
        margin-right: 0;
        font-size: .26rem;
        color: #fff;
        background-color: #ff2069;
        float: left;

        &.active{
          background-color: #999;
        }
      }
      
    }

    .btnGroup{
      float: right;
      div{
        float: left;
        img{
          width: .84rem;
          height: .84rem;
        }
      }
    }
  }

  .backCover{
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 999;
    background-color: rgba(0, 0, 0, .7);

    .search-wrapper{
      width: 5.2rem;
      margin: 3rem auto 0;
      background-color: #fff;

      .search-header{
        height: .82rem;
        border-bottom: 1px solid #ddd;
        .title{
          float: left;
          padding-top: .24rem;
          margin-left: .2rem;
          font-size: .32rem;
          color: #888;
        }

        .closeBtn{
          float: right;
          img{
            height: .6rem;
            margin: .1rem;
          }
        }
      }
    }

    .search-form{
      .search-text{
        float: left;
        margin: .4rem .2rem .4rem .4rem;
        width: 3.1rem;
        height: .7rem;
        border: 1px solid #a2a2a2;
        font-size: .28rem;
      }
      img{
        float: left;
        width: .7rem;
        height: .7rem;
        margin: .4rem .2rem .4rem .4rem;
      }
    }
  }
  .isFixedNav{
    position:fixed;
    top:0px;
    z-index:9999;
    width: 100%;
  }
  .search-fixed{
    display: none;
  }
  .isFixedNav .search-fixed{
    display: block;
  }
</style>
