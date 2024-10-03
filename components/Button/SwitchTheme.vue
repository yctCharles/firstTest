<template>
     <Switch
        v-model="enabled"
        :class="enabled ? 'bg-blue-600' : 'bg-green-400'"
        @click="switchTheme()"
        class="relative inline-flex h-6 w-11 items-center rounded-full border-2 border-gray-500"
      >
        <span class="sr-only">Enable notifications</span>
        <span
          :class="enabled ? 'translate-x-6' : 'translate-x-1'"
          class="inline-block h-4 w-4 transform rounded-full bg-white transition"
        />
      </Switch>
</template>

<script setup lang="ts">
   import { Switch } from '@headlessui/vue'
   const enabled = ref(false);
   const switchTheme = () => {
      const theme = useState('theme')
      if (theme.value === 'dark') {
         theme.value = 'light'
      } else {
         theme.value = 'dark'
      }
   }

</script>