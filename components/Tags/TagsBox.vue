<template>
  <div class="w-4/5 flex flex-wrap flex-col justify-center items-center">
    <h2 class="text-white font-bold m-2">hot tags:</h2>
    <ul
      class="*:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:text-center *:px-2 *:m-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 flex flex-wrap flex-row *:text-green-400  font-bold"
    >
      <li>Sales</li>
      <li>Marketing</li>
      <li>Seo</li>
      <li>Spa</li>
      <li>Nuxt</li>
      <li>Vue</li>
    </ul>

    <NuxtLink to="/">
      <h1 class="text-sky-500 font-bold">More Tags...</h1>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts"></script>
