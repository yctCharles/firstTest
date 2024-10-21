<template>
  <ul
      class="*:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:text-center *:px-2 *:m-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 flex flex-wrap flex-row *:text-green-400  font-bold"
    >
      <li v-for="item in list" :key="item" class="m-1">
        #{{ item }}
      </li>
    </ul>
</template>

<script setup>
  const {list} =defineProps(['list'])
</script>