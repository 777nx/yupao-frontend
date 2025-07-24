<template>
  <user-card-list :userList="userList" :loading="loading" />
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空"></van-empty>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import qs from 'qs'
import UserCardList from "../components/UserCardList.vue";

const loading = ref(true);

const route = useRoute();
const {tags} = route.query;

const userList = ref([])

onMounted(async () => {
  loading.value = true;
  const userListData = await myAxios.get('/user/search/tags',{
    withCredentials: false,
    params: {
      tagNameList: tags
    },
    paramsSerializer: params =>{
      return qs.stringify(params,{indices: false})
    }
  })
  .then(function (response) {
    console.log('/user/search/tags succeed',response);
    return response?.data;
  }).catch(function (error) {
    console.log('/user/search/tags error',error);
    Toast.fail('请求失败');
  });
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
    console.log(userList.value)
  }
  loading.value = false;
})

const mockUser = {
  id: 931,
  username: '阿符',
  userAccount: 'Fantasy',
  profile: '一条咸鱼',
  gender: 0,
  phone: '123456789101',
  email: 'admin@777nx.cn',
  planetCode: '931',
  avatarUrl: 'https://lsky.777nx.cn/i/2025/03/29/avatar.webp',
  tags: ['java', 'emo', '打工中', 'emo', '打工中'],
  createTime: new Date(),
}

</script>

<style scoped>

</style>