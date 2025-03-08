<template>
  <div
    class="pagebox flex w-full h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 absolute left-0 top-0 items-center rounded-sm z-20"
    :class="theme"
  >
    <div
      class="bg-slate-200 w-1/3 m-5 p-2 relative rounded-2xl dark:bg-slate-600"
    >
      <div class="absolute top-1 right-2">
        <button @click="$emit('data-sent', { message: false })">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 stroke-slate-400 fill-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="/img/mindlogo.png"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-slate-100"
        >
          Sign in to your account
        </h2>
      </div>
      <form class="" method="POST" @submit.prevent="submitForm">
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-100"
              >Email address</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required="true"
                v-model="emailinfo"
                class="my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="mt-5">
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-100"
                >Password</label
              >
              <div class="text-sm">
                <a
                  href="#"
                  class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-lime-100"
                  >Forgot password?</a
                >
              </div>
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                v-model="passwordinfo"
                required="true"
                class="my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="mt-10">
            <button
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500 dark:text-lime-100">
        Not a member?
        {{ " " }}
        <a
          @click="$emit('componentChange', { message: 'Register' })"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-lime-100"
        >
          create a account
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts" name="login">
const theme = useState("theme");
const emailinfo = ref("");
const passwordinfo = ref("");
const config = useRuntimeConfig();
async function submitForm() {
  try {
    await useFetch("/user/login", {
      baseURL: config.public.baseURL,
      method: "POST",
      body: {
        email: emailinfo.value,
        password: passwordinfo.value,
      },
    }).then((res: any) => {
      if (res.data.value.code == 0) {
        ElMessage({
          message: res.data.value.msg,
          type: "error",
        });
        return;
      } else if (res.data.value.code == 1) {
        userStore().setToken(res.data.value.data.token);
        userStore().setUserId(res.data.value.data.userId);
        localStorage.setItem("token", res.data.value.data.token);
        localStorage.setItem("userId", res.data.value.data.userId);
        const islogin = useState("testLogin");
        islogin.value = true;
        ElMessage({
          message: res.data.value.msg,
          type: "success",
          duration: 2500,
        });
      }
    });
  } catch (error) {
    ElMessage.error("请求接口失败");
    console.error("请求接口失败", error);
    return;
  }
}
</script>

<style scoped>
.pagebox {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
