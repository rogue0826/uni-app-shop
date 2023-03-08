<template>
  <view>
     <view class="scroll-view-container">
          <!-- 左侧的滚动视图区域 -->
          <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
           <block v-for="(item, i) in cateList" :key="i">
              <view :class="['left-scroll-view-item', i === active ? 'active' : ''] "> {{item.cat_name}} </view> 
             </block>
           
          </scroll-view>
          <!-- 右侧的滚动视图区域 -->
          <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}">
            <view class="left-scroll-view-item">zzz</view>
            <view class="left-scroll-view-item">zzz</view>
            <view class="left-scroll-view-item">zzz</view>
            <view class="left-scroll-view-item">zzz</view>
            <view class="left-scroll-view-item">多复制一些节点，演示纵向滚动效果</view>
          </scroll-view>
        </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
                wh: 0,
                // 分类列表数据
                cateList:[] ,
                active:0
      };
    },
    onLoad() {
        // 获取当前系统的信息
            const sysInfo = uni.getSystemInfoSync()
            // 为 wh 窗口可用高度动态赋值 
            this.wh = sysInfo.windowHeight
            this.getCateList()
    }
    methods:{
      async getCateList () {
        // 发起请求 
        const {data : res } =  await uni.$http.get('/api/public/v1/categories') 
        // 判断是否失败
        if( res.meta.status !== 200 ) return uni.$showMsg()
        
       // 数据转存
       this.cateList = res.message
       acticeChange(i) {
         this.active = i 
       }
          
      
      }
      
    }
  }

  
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
