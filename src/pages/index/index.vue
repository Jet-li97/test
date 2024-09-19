<script setup lang="ts">
import CusttomNavbar from './components/CusttomNavbar.vue'
import {onLoad} from "@dcloudio/uni-app"
import type {BannerItem} from "@/types/home"
import { ref } from "vue";
import { getHomeBannerAPI } from "@/services/home";
import  CategoryItem  from "@/pages/index/components/CategoryPanel.vue";
const bannerList=ref<BannerItem[]>([])
const getHomeBannerData=async ()=>{
  const res =await getHomeBannerAPI()
  console.log(res,"res");
  bannerList.value=res.result

}
onLoad(()=>{
  getHomeBannerData()
})
</script>

<template>
<CusttomNavbar/>
<XtxSwiper :list="bannerList"/>
<CategoryItem />
  <view class="index">

  </view>
</template>

<style lang="scss">
//
</style>
