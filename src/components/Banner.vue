<template>
	<div class="banner" @mouseover='stop' @mouseout='start'>
		<swiper :options="swiperOption" ref="mySwiper" class="swiper" >
			<swiper-slide><img src="../assets/images/banner2.jpg"></swiper-slide>
			<swiper-slide><img src="../assets/images/banner.jpg" ></swiper-slide>
			<div class="swiper-pagination"  slot="pagination"></div>
	  </swiper>
	</div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  name: 'carrousel',
    data() {
      return {
         swiperOption: {
           autoplay: {
             delay: 3000,
           },// 自动播放
          spaceBetween: 30,//滚动切换时的 两分页间隔
          loop: true,//循环
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods:{
      stop(){
        this.swiper.autoplay.stop();
      },
      start(){
        this.swiper.autoplay.start();
      }
    }
}
</script>

<style>
	.banner{ width: 90%; max-width: 1110px; min-width: 960px; margin: 15px auto;height: 285px}
	.banner img{ width: 100%; vertical-align: top}
	.swiper{width: 100%;height: 100%}
  .swiper-pagination-bullet {border:1px solid #fff;}
</style>
