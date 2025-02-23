<template>
  <div class="w-full h-6 rounded-sm" :class="`bg-` + `${color}` + `-500`">
    <span
      class="text-black text-center flex items-center justify-center"
      v-if="color != 'gray'"
    >
      {{ color }}
    </span>
    <span
      class="text-white text-center flex items-center justify-center"
      v-if="color == 'gray'"
    >
      {{ color }}
    </span>
  </div>
</template>

<script setup>
const { color } = defineProps({
  color: String,
});
</script>

<style></style>
