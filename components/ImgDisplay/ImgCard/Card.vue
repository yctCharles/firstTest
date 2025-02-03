<template>
  <div
    class="bg-pink-50 dark:bg-gray-400 flex items-center justify-center m-2 hover:bg-pink-100 hover:dark:bg-gray-300 overflow-hidden rounded shadow-md"
    :style="{ width: width + 'px', height: height + 'px' }"
    @click="checkImg"
  >
    <img
      v-if="wallPaperObj?.minUrl"
      class="w-full h-full transition-transform duration-300 transform hover:scale-105 hover:brightness-110 object-cover"
      :src="wallPaperObj.minUrl"
      loading="lazy"
      alt="图片未加载"
    />
  </div>
</template>

<script setup lang="ts">
const { wallPaperObj, width, height } = defineProps([
  "wallPaperObj",
  "width",
  "height",
]);

const checkImg = () => {
  if (wallPaperObj) {
    navigateTo({
      path: `/wall-${wallPaperObj.userId}/${wallPaperObj.id}`,
    });
  }
};
</script>
