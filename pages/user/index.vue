<template>
  <div
    class="flex w-full h-screen justify-center bg-cyan-200 dark:bg-slate-700"
    :class="theme"
  >
    <div class="flex flex-col w-1/2 bg-cyan-100 dark:bg-slate-600 rounded-lg">
      <div class="flex felx-row w-full mt-5 mx-3">
        <div
          class="useImg rounded-full w-32 h-32 bg-pink-500 flex justify-center items-center mx-2"
        >
          <h1>useImg</h1>
        </div>
        <div class="flex flex-col text-left h-32 mx-2 justify-center">
          <h1 class="text-2xl font-bold">User Name</h1>
          <h1 class="text-sm">User Email</h1>
          <h1 class="text-sm">Create Time</h1>
        </div>
        <div class="ml-auto relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 absolute bottom-2 right-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </div>
      </div>
      <div
        class="flex flex-row w-2/3 border-2 p-1 border-cyan-200 dark:border-slate-500 rounded-lg justify-center my-8"
      >
        <button
          class="h-full w-1/4 mx-2 bg-sky-300"
          @click="somepage = Collection"
        >
          <span>收藏</span>
        </button>
        <button
          class="h-full w-1/4 mx-2 bg-sky-300"
          @click="somepage = Subscribe"
        >
          <span>关注</span>
        </button>
        <button
          class="h-full w-1/4 mx-2 bg-sky-300"
          @click="somepage = Myupload"
        >
          <span>我的上传</span>
        </button>
        <button
          class="h-full w-1/4 mx-2 bg-sky-300"
          @click="somepage = DataPage"
        >
          <span>其他数据</span>
        </button>
      </div>
      <div
        class="w-11/12 rounded-sm bg-slate-200 flex justify-center items-center h-1/2 p-2 mx-auto"
      >
        <KeepAlive>
            <component :is="somepage" />
        </KeepAlive>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

   const theme = useState("theme");
   const Collection = resolveComponent("Collection");
   const Subscribe = resolveComponent("Subscribe");
   const Myupload = resolveComponent("Myupload");
   const DataPage = resolveComponent("Datapage");
   const somepage = ref(Collection);

</script>
