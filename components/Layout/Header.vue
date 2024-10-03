<template>
  <div class="flex flex-row w-100% h-24 bg-cyan-100 dark:bg-slate-700">
    <div class="w-64 h-100% left-0 mr-auto flex items-center justify-center">
      <NuxtLink to="/">
        <img src="/img/mindlogo.png" class="obj-fit" alt="logo" />
      </NuxtLink>
    </div>
    <div class="w-36 h-100% flex items-center justify-center text-center m-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 mr-1 fill-blue-400 stroke-blue-900 dark:stroke-slate-300"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
        />
      </svg>
      <NuxtLink to="/">
        <h1 class="text-blue-700 font-bold dark:text-slate-300">Forum</h1>
      </NuxtLink>
    </div>
    <div class="w-20 h-100% flex items-center justify-center m-2">
      <SwitchTheme />
    </div>
    <div class="w-20 h-100% flex items-center justify-center m-2 relative">
      <div @click="showLogin()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-12 fill-yellow-50 stroke-1 stroke-cyan-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>

        <h4 v-if="!testLogin" class="dark:text-white font-bold text-slate-600">
          未登入
        </h4>
      </div>
    </div>

    <div class="loginPage" v-show="showpage">
      <Login @data-sent="receiveData" />
    </div>
  </div>
</template>

<script setup lang="ts" name="Header">
const testLogin = ref(false);
const showpage = ref(false);
const showLogin = () => {
  if (!testLogin.value) {
    showpage.value = true;
  }
};

const receiveData = (data: any) => {
  console.log(data);
  showpage.value = data.message;
};
</script>

<style scoped></style>
