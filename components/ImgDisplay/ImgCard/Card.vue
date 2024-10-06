<template>
  <div
    class="h-48 bg-pink-50 dark:bg-gray-400 rounded-sm flex items-center justify-center m-2 w-72 hover:bg-pink-100 hover:dark:bg-gray-300"
    @click="checkImg"
  >
    <img class="w-full h-full" :src="a" loading="lazy" alt="" />
  </div>
</template>

<script setup lang="ts">
 const {a}= defineProps(["a"]);
const router = useRouter();
const checkImg = () => {
  router.push({
    path: "/wall/id",
    query: { url: a },
  });
};
</script>
