<template>
  <div class="w-4/5 flex flex-wrap flex-col justify-center items-center">
    <h2 class="text-white font-bold m-2">Please select relevant tags:</h2>
    <ul class="flex flex-wrap flex-row w-1/2">
      <li
        v-for="(tag, index) in tagList"
        :key="index"
        class="rounded-lg border border-sky-100 bg-sky-50 text-center px-2 m-2 py-0.5 dark:text-gray-50 dark:border-sky-500/15 dark:bg-slate-700 cursor-pointer select-none"
        @click="toggleTag(tag)"
        :class="{ 'bg-sky-600 text-white dark:bg-slate-500 dark:text-green-300 dark:border-white': selectedTags.includes(tag) }"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Switch } from '@headlessui/vue'
interface Tag {
  id: number;
  name: string;
}

const tagList = ref<Tag[]>([]);
const selectedTags = ref<Tag[]>([]);
const emit = defineEmits(['update:selectedTags']);
const toggleTag = (tag: Tag) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
};

watchEffect(() => {
  emit('update:selectedTags', selectedTags.value);
})

await useFetch("/tag/getAll", {
  method: "GET",
  baseURL: useRuntimeConfig().public.baseURL,
}).then((res) => {
  const d: any = res.data.value;
  tagList.value = d.data;
});
</script>
