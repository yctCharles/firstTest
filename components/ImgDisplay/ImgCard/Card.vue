<template>
  <div
    class="h-48 bg-pink-50 dark:bg-gray-400 rounded-sm flex items-center justify-center m-2 w-72 hover:bg-pink-100 hover:dark:bg-gray-300"
    @click="checkImg"
  > 
    <img v-if="wallPaperObj?.minUrl" class="w-full h-full" :src="wallPaperObj.minUrl" loading="lazy" alt="图片未加载" />
  </div>
</template>

<script setup lang="ts">
const { wallPaperObj } = defineProps(["wallPaperObj"]);

const checkImg = () => {
  if (wallPaperObj) {
    navigateTo({
      path: `/wall-${wallPaperObj.userId}/${wallPaperObj.id}`,
    });
  }
};
</script>
