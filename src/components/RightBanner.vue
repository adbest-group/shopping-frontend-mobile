<template>
	<div class="right-banner"  @mouseover='stop' @mouseout='start'>
		<swiper :options="swiperOption" ref="mySwiper" class="right-swiper">
			<swiper-slide ><img src="../assets/images/1.jpg"></swiper-slide>
			<swiper-slide><img src="../assets/images/3.jpg"></swiper-slide>
			<swiper-slide><img src="../assets/images/4.jpg" ></swiper-slide>
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
    swiperSlide,
  },
  name: 'carrousel',
    data() {
      return {
         swiperOption: {
           autoplay: {
             delay: 8000,
           },// 自动播放
          spaceBetween: 30,//滚动切换时的 两分页间隔
          loop: true,//循环
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
        },

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
	.right-banner{ width: 300px; height: 250px;margin-bottom: 15px}
	.right-banner img{ width: 100%; vertical-align: top}
	.right-swiper{width: 100%;height: 100%}
  .swiper-pagination-bullet {border:1px solid #fff;}
</style>
