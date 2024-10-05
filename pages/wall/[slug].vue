<template>
  <div class="flex flex-col w-full h-screen" :class="theme">
    <!-- <p>Slug: {{ $route.params.slug }}</p> -->
    <SearchHeader />
    <div class="flex flex-row w-full h-full bg-slate-300 dark:bg-slate-800">
      <div class="w-1/6 h-full bg-slate-200 dark:bg-slate-700 p-2">
        <h1>Tag</h1>
        <h1>Author</h1>
      </div>
      <div class="w-5/6 h-full bg-slate-100 dark:bg-slate-600 flex flex-col">
        <div
          class="flex justify-center items-center w-full h-5/6 bg-slate-50 m-2"
        >
          <!-- <img src="" alt=""> -->
          <p class="text-3xl font-bold">Slug: {{ $route.params.slug }}</p>
        </div>
        <div class="flex flex-row w-full h-1/6 justify-center items-center">
          <div class="flex flex-col justify-center items-center m-2 w-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 stroke-lime-500 stroke-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <label for="img_download" class="text-center cursor-pointer"
              >download</label
            >
          </div>

          <div class="flex flex-col justify-center items-center m-2 w-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 fill-yellow-200 stroke-orange-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <label for="img_collection" class="text-center cursor-pointer">
              collection
            </label>
          </div>
          <div class="flex flex-col justify-center items-center m-2 w-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 stroke-pink-400 stroke-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>

            <label for="img_like" class="text-center cursor-pointer">
               {{ 0 }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchHeader from "~/components/Layout/SearchHeader.vue";

const theme = useState("theme");
</script>
