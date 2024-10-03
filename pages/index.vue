<template>
  <div class="flex flex-col" :class="theme">
    <Header />
    <Mainer />
    <Footer />
  </div>
</template>

<script setup lang="ts">
   const theme=  useState("theme");
</script>
