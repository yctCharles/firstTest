<template>
  <div class="flex flex-col w-full relative" :class="theme">
    <SearchHeader :tagname="q" />
    <SearchMainer :tagname="q" />
  </div>
</template>

<script setup lang="ts">
const theme = useState("theme");
const route = useRoute();
const q = route.query.q || "";
</script>
