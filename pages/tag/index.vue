<template>
  <div
    class="flex flex-col items-center h-screen bg-sky-200 dark:bg-slate-800"
    :class="theme"
  >
    <SearchHeader />
    <div
      class="flex flex-col w-10/12 dark:bg-slate-300 bg-white mt-24 p-4 rounded-s items-center min-w-[600px]"
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
        class="min-w-[400px] flex flex-row items-center w-3/4 mb-1 bg-green-300 dark:bg-slate-400 dark:text-green-300 ml-12 h-16 px-3"
      >
        <div
          class="relative w-6/12 m-0 p-1 h-full flex flex-row items-center justify-start bg-green-400 dark:bg-slate-500"
        >
          <img
            src="../../public/icon/tag1.svg"
            alt="tag"
            class="w-6 h-6 mr-2"
          />
          <h2 class="text-xl font-bold mb-2 mr-4">
            {{ tag.name }}
          </h2>
          <div class="absolute right-2 p-2">
            <img
              @click="gotoSearch(tag.name)"
              src="../../public/icon/serach.svg"
              alt="tag"
              class="w-6 h-6 mr-2 cursor-pointer"
            />
          </div>
        </div>
        <div
          class="w-4/12 m-0 p-1 h-full flex flex-row items-center justify-start bg-green-500 dark:bg-slate-600"
        >
          <img
            src="../../public/icon/view2.svg"
            alt="views"
            class="w-6 h-6 mr-2"
          />
          <h3 class="text-gray-200 font-bold tag">{{ tag.views }}</h3>
        </div>
        <div
          class="m-0 p-1 h-full flex flex-row items-center justify-start bg-green-600 dark:bg-slate-700 w-2/12"
        >
          <img
            src="../../public/icon/img4.svg"
            alt="views"
            class="w-6 h-6 mr-2"
          />
          <h3 class="text-gray-200 font-bold tag">{{ tag.imgs }}</h3>
        </div>
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
  imgs: number;
}
const theme = useState("theme");
const pageResult = ref<PageResult<Tag>>();

const gotoSearch = async (tagName: string) => {
  await navigateTo({
    path: "/search",
    query: {
      q: tagName,
    },
  });
};
async function fetchPage(pageNum: number, pageSize: number) {
  const res: any = await $fetch("/tag/page", {
    method: "GET",
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
    },
    baseURL: useRuntimeConfig().public.baseURL,
  });

  pageResult.value = res.data as PageResult<Tag>;
}

const changePage = (pageNum: number) => {
  fetchPage(pageNum, 10);
};

fetchPage(1, 10);
</script>

<style scoped>
.tag {
  font-family: "Font", sans-serif;
}

@font-face {
  font-family: "Font";
  src: url("../../public/font/HFPuff-2.ttf") format("woff2");
  font-weight: normal;
  font-style: normal;
}
</style>
