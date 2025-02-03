<template>
  <div
    class="flex flex-col items-center h-screen bg-sky-200 dark:bg-slate-800"
    :class="theme"
  >
    <SearchHeader />
    <div
      class="flex flex-col w-10/12 dark:bg-slate-300 bg-white mt-24 p-4 rounded-s items-center"
    >
      <h1
        class="w-full bg-lime-200 dark:bg-slate-400 text-2xl font-bold text-center mb-4 text-sky-500 dark:text-lime-100"
      >
        Tags
      </h1>

      <div class="flex flex-row items-center justify-between mb-4">
        <el-input placeholder="Search for a tag" class="w-64" />
      </div>
      <div
        v-for="tag in pageResult?.record"
        :key="tag.id"
        class="flex flex-row items-center w-3/4 mb-1 bg-green-300 dark:bg-slate-400 dark:text-green-300 ml-12 p-3"
      >
        <h2 class="text-xl font-bold mb-2 mr-4">{{ tag.name }}</h2>
        <h3 class="text-gray-500">{{ tag.views }} views</h3>
      </div>
      <div class="mt-4 w-full flex items-center justify-center">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageResult?.total"
          @current-change="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface PageResult<T> {
  total: number;
  record: T[];
}

interface Tag {
  id: string;
  name: string;
  views: number;
}
const theme = useState("theme");
const pageResult = ref<PageResult<Tag>>();

async function fetchPage(pageNum: number, pageSize: number) {
  const res: any = await useFetch("/tag/page", {
    method: "GET",
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
    },
    baseURL: useRuntimeConfig().public.baseURL,
  });

  pageResult.value = res.data.value.data as PageResult<Tag>;
}

const changePage = (pageNum: number) => {
  fetchPage(pageNum, 10);
};
onMounted(() => {
  fetchPage(1, 10);
});
</script>
