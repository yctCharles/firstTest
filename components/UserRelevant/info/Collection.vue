<template>
    <h1> 收藏 </h1>
    <div class="w-full grid grid-cols-6 gap-1 max-h-96 overflow-y-auto">
      <div v-for="item in ImageList" :key="item.id" class="hover:scale-105 transition-all duration-300 overflow-hidden">
         <Card :wallPaperObj="item" :width="200" :height="120" />
      </div>
    </div>
</template>

<script setup lang="ts">

  const ImageList = ref<any>([])

  await useFetch('/user/getCollect',{
    method: 'GET',
    baseURL: useRuntimeConfig().public.baseURL,
    headers: {
      token: userStore().token,
    },
    params: {
      userId: userStore().userId,
    }
  }).then((res) => {
      const d:any =res.data.value
      if(d.code === 1){
        ImageList.value = d.data
      }
  })
</script>

