<template>
  <main class="w-full h-screen bg-slate-600">
    <div class="flex justify-center items-center w-full bg-sky-100 dark:bg-slate-600 py-5">
      <div class="w-11/12 grid grid-cols-6 gap-x-3" v-for="item in imgList" :key="item.id">
        <Card :a=item />
      </div>
    </div>
  </main>
</template>

<script setup >
    // interface imgList{
    //     id:number,
    //     title:string,
    //     img:string
    // }
    const imgList = ref([])
    //const q = useRoute().query.q
    const {data:imgUrl} =await useFetch('http://localhost:8080/img/search')

    imgList.value = imgUrl.value.data
</script>
