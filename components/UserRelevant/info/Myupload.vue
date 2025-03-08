<template>
  <h1>上传</h1>

  <h1 class="text-xl font-bold mt-5 text-lime-600 dark:text-green-400">
    Public:
  </h1>
  <div
    style="max-height: 20vh"
    class="w-full flex flex-row flex-wrap max-h-45 items-center justify-center overflow-y-scroll"
  >
    <div
      v-for="item in publicImages"
      :key="item.id"
      class="transition-all duration-300 overflow-hidden"
    >
      <Card :wallPaperObj="item" :width="200" :height="120" />
    </div>
  </div>

  <h1>Private:</h1>
  <div
    style="max-height: 20vh"
    class="w-full flex flex-row flex-wrap max-h-45 items-center justify-center overflow-y-scroll"
  >
    <div
      v-for="item in privateImages"
      :key="item.id"
      class="hover:scale-105 transition-all duration-300 overflow-hidden"
    >
      <Card :wallPaperObj="item" :width="200" :height="120" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const ImageList = ref<any[]>([]);

// 定义计算属性，分别过滤 public 和 private 图片
const publicImages = computed(() =>
  ImageList.value.filter((item) => item.status === 0)
);
const privateImages = computed(() =>
  ImageList.value.filter((item) => item.status === 1)
);

// 获取数据
await useFetch("/user/getUpload", {
  method: "GET",
  baseURL: useRuntimeConfig().public.baseURL,
  headers: {
    token: userStore().token,
  },
  params: {
    userId: userStore().userId,
  },
}).then((res) => {
  const d: any = res.data.value;
  if (d.code === 1) {
    ImageList.value = d.data;
  }
});
</script>
