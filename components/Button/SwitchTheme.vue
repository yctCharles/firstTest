<template>
  <Switch
    v-model="enabled"
    :class="enabled ? 'bg-sky-400' : 'bg-green-400'"
    @click="switchTheme()"
    class="relative inline-flex h-6 w-11 items-center rounded-full border-2 border-gray-100"
  >
    <span class="sr-only">Enable notifications</span>
    <span
      :class="enabled ? 'translate-x-6' : 'translate-x-1'"
      class="h-4 w-4 transform rounded-full bg-white transition flex justify-center items-center"
    >
      <img
        v-if="!enabled"
        src="../../public/icon/sun.svg"
        class="w-3 h-3 z-10"
      />

      <img
        v-if="enabled"
        src="../../public/icon/moon1.svg"
        class="w-3 h-3 z-10"
      />
    </span>
  </Switch>
</template>

<script setup lang="ts">
import { Switch } from "@headlessui/vue";
const enabled = ref(false);
const switchTheme = () => {
  const theme = useState("theme");
  if (theme.value === "dark") {
    theme.value = "light";
  } else {
    theme.value = "dark";
  }
};
</script>
