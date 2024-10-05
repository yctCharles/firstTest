<template>
  <div class="flex flex-col w-full"  :class="theme">
     <SearchHeader />
     <SearchMainer />
  </div>
</template>

<script setup lang="ts">
  const theme =useState("theme");
</script>
