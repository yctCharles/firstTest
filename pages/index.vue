<template>
  <div class="flex flex-col" :class="theme">
    <Header />
    <Mainer />
    <Footer />
  </div>
</template>

<script setup lang="ts">
   const theme=  useState("theme");
   
  //   onMounted(async () => {
  //       await useFetch("/api",{
  //           method: "GET",
  //           headers: {
  //               "Content-Type": "application/json",
  //               "token":localStorage.getItem("token") || ""
  //           },
  //       }).then((res: any)=>{
  //           if(res.data.value.code == 1){
  //               localStorage.removeItem("token")
  //           }
  //       })
  //  })
</script>
