<template>
  <div class="w-11/12 flex flex-row" v-if="pageNum !== 1">
    <div class="flex flex-row items-center justify-center">
      <h1 class="text-sm font-bold dark:text-gray-200 m-1 text-slate-400">
        Page
      </h1>
      <h1 class="text-xl font-bold dark:text-white m-1 text-slate-500">
        {{ pageNum }}
      </h1>
      <h2 class="text-sm font-bold dark:text-gray-50 m-1 text-slate-500">/</h2>
      <h1 class="text-sm font-bold dark:text-white m-1 text-slate-500">
        {{ totalPage }}
      </h1>
    </div>
    <div class="w-full flex justify-center items-center">
      <hr class="w-full border-slate-900 dark:border-gray-50 mx-1"></hr>
    </div>
  </div>
  <div class="w-11/12 flex flex-row items-center flex-wrap justify-center">
    <div v-for="(item, index) in imgList" :key="item.id">
      <Card :wallPaperObj="item" :width="280" :height="160" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { imgList, pageNum, totalPage } = defineProps([
  "imgList",
  "pageNum",
  "totalPage",
]);

console.log("图片列表：",imgList);
</script>
