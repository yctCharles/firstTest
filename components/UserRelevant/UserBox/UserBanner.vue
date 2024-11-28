<template>
  <div class="flex flex-row">
      <div class="w-24 h-24 bg-purple-400 rounded-full border-double border-2 border-orange-600">
        <img :src="imgUrl" class="w-full h-full rounded-full object-cover" alt="user" >
      </div>
      <div class="flex flex-col justify-center ml-4 w-32">
        <h1 class="font-bold text-slate-600 dark:text-white"> {{ user.userName }} </h1>
        <h1 class="font-bold text-slate-600 dark:text-white"> {{ user.userEmail }} </h1>
      </div>
  </div>
</template>

<script setup>
     const {user}= defineProps(["user"]);
     console.log("上传用户信息：",user);
     const imgUrl = user.userUrl;
</script>

<style>

</style>