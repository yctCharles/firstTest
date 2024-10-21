<template>
  <div
    class="h-48 bg-pink-50 dark:bg-gray-400 rounded-sm flex items-center justify-center m-2 w-72 hover:bg-pink-100 hover:dark:bg-gray-300"
    @click="checkImg"
  > 
    <img v-if="wallPaperObj!=null"  class="w-full h-full" :src="wallPaperObj.url" loading="lazy" alt="图片未加载" />
  </div>
</template>

<script setup lang="ts">
const {wallPaperObj} = defineProps(["wallPaperObj"]);
const checkImg = () => {
   navigateTo({
    path: "/wall-"+wallPaperObj.userId+"/"+wallPaperObj.id,
    query: { url: wallPaperObj.url}, //这里的数据会在路径上显示
  })
};
</script>
