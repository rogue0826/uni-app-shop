<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='  + item.goods_id"> 
          <image :src="item.image_src" ></image>
        </navigator>
      </swiper-item>
     
     
     
     
    </swiper>
  
    <!-- 分类导航区域 -->
    <view class="nav-list">
       <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
         <image :src="item.image_src" class="nav-img"></image>
       </view>
    </view>
    
    <!-- 商品楼层区域 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item, i) in floorList" :key= "i">
        <!-- 标题 -->
        <image :src="item.floor_title.image_src" mode="" class="floor-title"></image>
        <!-- 楼层图片区域 --> 
        <view class="floor-img-box">
          <!-- 左侧大盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
           <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" 
           mode="widthFix"></image>
         </navigator>
          <!-- 右侧4个小图片 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
                  <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
            </navigator>
            
          </view>
          
        </view>
      </view>
      
    </view>
    
   
 
    
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 定义轮播图数据列表
        swiperList: [],
        navList:[],
         floorList: [],
        
      };
    },
    onLoad() {
      // 在小程序刚加载的时候 调用获取轮播图的方法
      this.getSwiperList()
      this.getnavList()
       this.getFloorList()
    }, 
    methods:{
      async getSwiperList(){
       const {data: res} = await  uni.$http.get('/api/public/v1/home/swiperdata')
       // 请求失败 
       if(res.meta.status !== 200) 
         return uni.showMsg()
         
         
       this.swiperList = res.message
       uni.$showMsg('数据请求成功')
       // console.log(res)
      },
      
      async getnavList() {
       const { data: res} = await uni.$http.get('/api/public/v1/home/catitems')
        if(res.meta.status !== 200 ) return uni.$showMsg() 
        this.navList = res.message
       
      },
       
       async getFloorList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
      if (res.meta.status !== 200) return uni.$showMsg()
      // 处理url地址
      res.message.forEach(floor => {
        floor.product_list.forEach(prod => {
          prod.url =  '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
        })
      })
      this.floorList = res.message
    },
   
    
    
    navClickHandler(item){
      if(item.name === '分类') {
        uni.switchTab({
          url:'/pages/cate/cate'
        })
      }
    }
      
    },
    
    
   
    
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
  
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
  
    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }
  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }
   .right-img-box {
     display: flex;
     // 自动换行
     flex-wrap: wrap;  
     justify-content: space-around;
   }
   .floor-img-box {
     display: flex;
     padding-left: 10rpx;
   }

</style>
