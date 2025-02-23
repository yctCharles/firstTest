<template>
  <div class="grid grid-cols-5 mt-10 mb-10">
    <!-- How to get relevant images data -->
    <div
      v-if="wallpaperIds.length > 0"
      v-for="item in wallRecommend"
      :key="item.id"
    >
      <Card :wallPaperObj="item" :width="240" :height="160" />
    </div>
    <div v-if="wallRecommend.length === 0" v-for="i in 15">
      <Card :wallPaperObj="null" :width="240" :height="160" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface minPaper {
  id: number;
  minUrl: string;
  status: number;
  userId: number;
}
const wallRecommend = ref<minPaper[]>([]);
const wallpaperIds = ref<number[]>([
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 37, 38,
]);
onMounted(() => {
  getWallRecommend();
});

/*

await useFetch("/tag/get/" + `${wallPaperId}`, {
  method: "GET",
  baseURL: useRuntimeConfig().public.baseURL,
}).then((res) => {
  const data: any = res.data.value;
  const list: string[] = data.data;
  tagList.value = list;
});
*/
const getWallRecommend = async () => {
  const { data } = await useFetch("/img/get-recommend", {
    method: "GET",
    baseURL: useRuntimeConfig().public.baseURL,
    params: {
      wallpaperIds: wallpaperIds.value,
    },
  });
  const res: any = data.value;
  wallRecommend.value = res.data;
  //console.log("数据:", wallRecommend.value);
};
</script>
