<template>
  <main class="w-full h-screen bg-slate-600">
    <div class="flex justify-center items-center w-full bg-sky-100 dark:bg-slate-600 py-5">
      <div class="w-11/12 grid grid-cols-6 gap-x-3" v-for="item in imgList" :key="item.id">
        <Card :wallPaperObj=item />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
    interface WallPapers{
        id:number,
        userId:number,
        url:string,
        width:number,
        height:number,
    }
    const imgList = ref<WallPapers[]>([])
    const {data} =await useFetch('/img/search',{
      method:'GET',
      baseURL:useRuntimeConfig().public.baseURL,
    })
    const data2 : any = data.value
    const wallobj= data2.data as WallPapers[]
    wallobj.forEach((item:WallPapers)=>{
        imgList.value.push(item)
    })
</script>
