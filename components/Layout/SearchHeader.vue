<template>
  <nav
    class="flex flex-row justify-between items-center h-20 bg-cyan-100 dark:bg-slate-700 fixed w-full z-50"
  >
    <div class="flex justify-center items-center w-64">
      <NuxtLink to="/" class="w-full h-full">
        <img src="/img/mindlogo.png" alt="Mind logo" class="obj-fit" />
      </NuxtLink>
    </div>

    <div class="flex flex-row justify-center items-center h-full bg-sky-200">
      <div
        class="border-r-2 border-r-gray-400 px-1 last:border-none"
        v-for="item in list"
        :key="item"
      >
        <NuxtLink
          to="/"
          class="flex justify-center items-center h-full px-1 text-lg font-semibold text-gray-500 hover:text-gray-900"
        >
          {{ item }}
        </NuxtLink>
      </div>
    </div>

    <div class="search">
      <div class="w-96 flex justify-center items-center m-4">
        <input
          v-model="params"
          class="w-full rounded-full bg-white text-black pl-3 border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Search you want to..."
          @keyup.enter="gotoSearch"
        />
      </div>
    </div>

    <div>
      <SwitchTheme />
    </div>

    <div class="flex justify-center items-center w-64 h-full bg-slate-700">
      ???
    </div>
  </nav>
</template>

<script setup lang="ts">
const list: Ref<string[]> = ref(["test1", "test2", "test3"]);
const params = ref("");
const gotoSearch = async () => {
  await navigateTo({
    path: "/search",
    query: {
      q: params.value,
    }
  });
  window.location.reload()
};
</script>
