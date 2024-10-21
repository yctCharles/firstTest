<template>
  <div class="flex flex-row">
      <div class="w-24 h-24 bg-purple-400 rounded-full border-double border-2 border-orange-600"></div>
      <div class="flex flex-col justify-center ml-4">
        <h1 class="text-2xl font-bold text-white"> {{ user.userName }} </h1>
        <h1 class="text-2xl font-bold text-white"> {{ user.userEmail }} </h1>
      </div>
  </div>
</template>

<script setup>
     const {user}= defineProps(["user"]);
</script>

<style>

</style>