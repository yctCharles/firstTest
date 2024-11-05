<template>
  <main class="w-full h-screen bg-cyan-100 dark:bg-slate-700">
    <div
      class="flex flex-col justify-center items-center w-full bg-sky-100 dark:bg-slate-600 py-5 mt-20"
    >
      <div class="w-full h-12 flex items-center">
        <h1 class="text-lg text-center text-indigo-500 dark:text-white leading-tight font-bold ml-5">
          we find <span class="text-pink-400 text-2xl mx-2">{{ imgList.length }}</span> pictures of 
          "<span class="text-green-300 text-2xl mx-2">{{ tname.tagname || "ALL" }}</span>" :
        </h1>
      </div>

      <div class="w-11/12 grid grid-cols-6 gap-x-3">
        <div v-for="item in imgList" :key="item.id">
          <Card :wallPaperObj="item" />
        </div>
      </div>

      <div class="flex justify-center items-center w-full h-36 text-center" v-if="imgList.length === 0">
        <span class="text-lg text-center text-pink-300 leading-tight font-bold">
          There's nothing here...
        </span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const tname = defineProps(["tagname"]);

interface WallPapers {
  id: number | string;
  userId: number;
  minUrl: string;
}

const imgList = ref<WallPapers[]>([]);

// Fetching the data
const { data } = await useFetch("/img/search2", {
  method: "GET",
  baseURL: useRuntimeConfig().public.baseURL,
  params: {
    tagname: tname.tagname,
  },
});

// 处理返回的数据
const data2: any = data.value;
const wallobj: WallPapers[] = data2?.data || [];

if (wallobj.length > 0) {
  imgList.value = wallobj;
} else {
  imgList.value = [];
}
</script>
