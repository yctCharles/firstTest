<template>
  <div
    class="pagebox flex w-full h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 absolute left-0 top-0 items-center rounded-sm"
    :class="theme"
  >
    <div
      class="bg-slate-200 w-1/3 m-5 p-2 relative rounded-2xl dark:bg-slate-800"
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
          Sign up a account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" method="POST" @submit="submitRegister">
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
                v-model="emailmessage"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-100"
                >Password</label
              >
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                v-model="passwordmessage"
                required="true"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div class="flex items-center justify-between">
              <label
                for="certain password"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-100"
                >Certain Password</label
              >
              <span v-if="passwordmessage != certainpasswordmessage" class="text-red-500">Password not match</span>
              <span v-if="passwordmessage == certainpasswordmessage && passwordmessage != ''" class="text-green-500">Password match</span>
            </div>
            <div class="mt-2">
              <input
                id="certain_password"
                name="certain_password"
                type="password"
                autocomplete="certain-password"
                v-model="certainpasswordmessage"
                required="true"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              :disabled="judgeRegister"
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              :class="{
                'cursor-not-allowed': judgeRegister,
              }"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500 dark:text-lime-100">
          Already have an account?
          {{ " " }}
          <a
            href="#"
            @click="$emit('componentChange', { message: 'Login' })"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-lime-100"
          >
            go to Login
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="register">
const theme = useState("theme");
const emailmessage = ref("");
const passwordmessage = ref("");
const certainpasswordmessage = ref("");
const judgeRegister = computed(() => {
  if (emailmessage.value == "" || passwordmessage.value == "" || certainpasswordmessage.value == "") {
    return true;
  }
  if (passwordmessage.value != certainpasswordmessage.value) {
    return true;
  }
  return false;
});
  const config:any = useRuntimeConfig();
async function submitRegister(){
    await useFetch("/user/register", {
        baseURL:config.public.baseURL,
        method: "post",
        headers:{
            "Content-Type": "application/json",
        },
        body: {
            email: emailmessage.value,
            password: passwordmessage.value,
        },
    }).then((res:any) => {
      if(res.data.value.code == 0){
          ElMessage.error(res.data.value.msg)
      }else if(res.data.value.code == 1){
          ElMessage.success(res.data.value.data)
      } 
    })
}

</script>

<style scoped>
.pagebox {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
