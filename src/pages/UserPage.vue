<template>
  <div v-if="user">
    <van-cell title="当前用户" :value="user?.username"></van-cell>
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user.ts";

// const user = {
//   id: 1,
//   username: '阿符',
//   userAccount: 'Fantasy',
//   avatarUrl: 'https://lsky.777nx.cn/i/2025/03/29/avatar.webp',
//   gender: '男',
//   phone: '17812345678',
//   email: 'admin@777nx.cn',
//   planetCode: '1234',
//   createTime: new Date()
// }

const user = ref()

onMounted(async () => {
  const res = await getCurrentUser()
  if (res) {
    user.value = res
  } else {
    Toast.fail("获取用户信息失败")
  }
})

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue
    }
  })
}
</script>

<style scoped>

</style>