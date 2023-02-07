<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='  + item.goods_id"> 
          <image :src="item.image_src" ></image>
        </navigator>
      </swiper-item>
     
    </swiper>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 定义轮播图数据列表
        swiperList: [],
        
      };
    },
    onLoad() {
      // 在小程序刚加载的时候 调用获取轮播图的方法
      this.getSwiperList()
    }, 
    methods:{
      async getSwiperList(){
       const {data: res} = await  uni.$http.get('/api/public/v1/home/swiperdata')
       // 请求失败 
       if(res.meta.status !== 200) {
         return uni.showToast({
           title:'数据请求失败',
           duration: 1500 ,
           icon:'none'
         })
       }
       this.swiperList = res.message
       console.log(res)
      }
    }
    
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;
  }
  
  .swiper-item,
  image{
    width: 100%;
    height: 100%;
  }
  
   

</style>
