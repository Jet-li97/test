<script setup lang="ts">
import { useMemberStore } from '@/stores'
import {http} from '@/utils/http'
const memberStore = useMemberStore()
const getData = async () => {
  console.log('666')

const res =await http({
  method: 'GET',
    url: '/member/profile',
    header:{}
})
console.log(res,"res");

}
</script>

<template>
  <view class="my">

    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '王德法',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="getData" size="mini" plain type="primary">请求</button>
  </view>
</template>

<style lang="scss">
//
</style>
