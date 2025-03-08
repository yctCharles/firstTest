<template>
  <main
    @scroll="handleScroll"
    class="w-full h-screen bg-cyan-100 dark:bg-slate-700 overflow-scroll"
  >
    <div
      class="flex flex-col justify-center items-center w-full bg-sky-100 dark:bg-slate-600 mt-20"
    >
      <div class="fixed w-full top-20 left-0 z-10">
        <FilterBox />
      </div>

      <div class="w-full h-12 flex items-center mt-14">
        <h1
          class="text-lg text-center text-indigo-500 dark:text-white leading-tight font-bold ml-5"
        >
          we find
          <span class="text-pink-400 text-2xl mx-2">{{
            pageResult?.total
          }}</span>
          pictures of "<span class="text-green-300 text-2xl mx-2">{{
            tname.tagname || "ALL"
          }}</span
          >" :
        </h1>
      </div>

      <div
        class="w-full flex flex-col items-center justify-center"
        v-for="(item, index) in imgMap"
        :key="index"
      >
        <ImgDisplay
          :imgList="item"
          :pageNum="index + 1"
          :totalPage="totalPage"
        />
      </div>

      <div class="flex justify-center items-center w-full h-36 text-center">
        <span class="text-lg text-center text-pink-300 leading-tight font-bold">
          There's nothing here...
        </span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
interface SearchFilterState {
  Resolution: string;
  Date: string;
  SearchWay: string;
  Color: string;
  SortWay: number;
}

const tname = defineProps(["tagname"]);
const search = ref<SearchFilterState>();
const getSearchFilter = () => {
  console.log("上次标签:", searchStore().lastTag, "本次标签:", tname.tagname);
  if (searchStore().tagName !== searchStore().lastTag) {
    searchStore().resetSearch();
    search.value = searchStore().search;
  } else {
    search.value = searchStore().search;
  }
};

const handleScroll = (e: Event) => {
  const scrollTop = (e.target as HTMLElement).scrollTop;
  const clientHeight = (e.target as HTMLElement).clientHeight;
  const scrollHeight = (e.target as HTMLElement).scrollHeight;

  if (
    scrollHeight - clientHeight - scrollTop <= 0 &&
    currentPage.value < totalPage.value
  ) {
    currentPage.value++;
    pageSearch2(currentPage.value, 24);
  }
};

interface PageResult<T> {
  total: number;
  record: T[];
}

interface WallPapers {
  id: number | string;
  userId: number;
  minUrl: string;
}

const pageResult = ref<PageResult<WallPapers>>({
  total: 0,
  record: [],
});
const imgMap = ref<Array<WallPapers[]>>([]);
const currentPage = ref<number>(1);
const totalPage = ref<number>(0);

async function pageSearch(pageNum: number, pageSize: number) {
  // Fetching the data
  const res: any = await $fetch("/img/search3", {
    method: "GET",
    baseURL: useRuntimeConfig().public.baseURL,
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      tagname: tname.tagname,
    },
  });
  pageResult.value = res.data as PageResult<WallPapers>;
  totalPage.value = Math.ceil(res.data.total / 24);
  console.log(totalPage.value);
  imgMap.value.push(pageResult.value.record);
}

async function pageSearch2(pageNum: number, pageSize: number) {
  // Fetching the data
  let filterSearch = {
    pageNum: pageNum,
    pageSize: pageSize,
    tagname: tname.tagname,
    resolution: search.value?.Resolution,
    date: search.value?.Date,
    color: search.value?.Color,
    searchWay: search.value?.SearchWay,
    sortWay: search.value?.SortWay,
  };
  const res: any = await $fetch("/img/search4", {
    method: "POST",
    baseURL: useRuntimeConfig().public.baseURL,
    body: JSON.stringify(filterSearch),
  });

  if (res.data) {
    pageResult.value = res.data as PageResult<WallPapers>;
    //console.log("分页数据:", pageResult.value);
    totalPage.value = Math.ceil(res.data.total / 24);
    console.log(totalPage.value);
    imgMap.value.push(pageResult.value.record);
  }
}

onMounted(() => {
  getSearchFilter();
  console.log(search);
  pageSearch2(1, 24);
});
</script>
