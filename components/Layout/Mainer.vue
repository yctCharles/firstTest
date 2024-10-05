<template>
  <div
    class="w-100% bg-cyan-100 dark:bg-slate-700 flex flex-col justify-center items-center"
  >
    <div
      class="w-11/12 bg-cyan-200 dark:bg-slate-600 flex flex-col justify-center items-center rounded-lg"
    >
      <div class="w-4/5 h-20 flex justify-center items-center m-4">
        <input
          class="w-4/5 h-12 rounded-full bg-white text-black pl-3"
          @keyup.enter="gotoSearch"
          type="text"
          placeholder="Search you want to..."
        />
      </div>
      <TagsBox />
      <div class="w-full flex justify-center items-center">
        <ImgBox />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const gotoSearch = () => {
  router.push("/search");
};
</script>
