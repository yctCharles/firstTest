<template>
    <div class="grid grid-cols-5 mt-10 mb-10">
      <!-- How to get relevant images data -->
      <div v-for="i in 15" :key="i">
        <Card />
      </div>
    </div>
</template>

<script setup lang="ts"></script>
