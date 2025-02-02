<template>
  <div class="w-4/5 flex flex-wrap flex-col justify-center items-center">
    <h2 class="text-white font-bold m-2">hot tags:</h2>
    <ul
      class="*:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:text-center *:px-2 *:m-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 flex flex-wrap flex-row *:text-green-400 font-bold"
    >
      <li
        v-for="tag in tagList"
        :key="tag"
        @click="gotoSearch(tag)"
        class="cursor-pointer select-none hover:bg-sky-200 dark:hover:bg-gray-500"
      >
        {{ tag }}
      </li>
    </ul>

    <NuxtLink to="/tag">
      <h1 class="text-sky-500 font-bold">More Tags...</h1>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ta } from "element-plus/es/locale/index.mjs";

const tagList = ref<string[]>([
  "美女",
  "大自然",
  "动漫",
  "鬼刀",
  "简约",
  "吞噬星空",
  "动物",
  "萌宠",
  "游戏",
  "风景",
  "人物",
  "美食",
  "科技",
  "汽车",
]);
/*
  try{
    const response = await useFetch('/tag/getAll',{
        method:'GET'
    });
    const d:any= response.data.value
    tagList.value=d
  }catch(e){
    console.log(e)
  }
    */

const gotoSearch = async (tag: string) => {
  await navigateTo({
    path: "/search",
    query: {
      q: tag,
    },
  });
};
</script>
