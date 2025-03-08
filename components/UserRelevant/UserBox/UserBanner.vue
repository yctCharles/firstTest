<template>
  <div class="flex flex-row">
    <div
      class="w-24 h-24 bg-purple-400 rounded-full border-double border-2 border-orange-600"
    >
      <img
        :src="user?.userUrl"
        class="w-full h-full rounded-full object-cover"
        alt="user"
      />
    </div>
    <div class="flex flex-col justify-center ml-4 w-32">
      <h1 class="font-bold text-slate-600 dark:text-white">
        {{ user?.userName || "加载中..." }}
      </h1>
      <h1 class="font-bold text-slate-600 dark:text-white">
        {{ user?.userEmail || "加载中..." }}
      </h1>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useFetch, useRuntimeConfig } from "#imports";

const route = useRoute();
const user = ref({});
const userId = route.params.group;

const getUserInfo = async () => {
  await $fetch(`/user/get/${userId}`, {
    method: "GET",
    baseURL: useRuntimeConfig().public.baseURL,
  }).then((res) => {
    //console.log("用户信息", res);
    user.value = res.data;
  });
};

onMounted(() => {
  getUserInfo();
});
</script>
