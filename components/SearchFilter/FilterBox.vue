<template>
  <div
    class="flex justify-center items-center bg-sky-200 w-full h-12 bg-opacity-50"
  >
    <el-dropdown @command="handleCommand">
      <el-button type="primary" class="w-32">
        <span v-if="selectResolution !== 'Resolution'">>=</span>
        {{ selectResolution
        }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in Resolution" :command="item">
            {{ item }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dropdown @command="handleCommandDate">
      <el-button type="primary" class="w-32 mx-5 p-0" style="padding: 0">
        {{ selectDate }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in Date" :command="item">
            {{ item }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
const selectResolution = ref<string>("Resolution");
const selectDate = ref<string>("Date");
const handleCommand = (command: string) => {
  selectResolution.value = command;
};

const handleCommandDate = (command: string) => {
  selectDate.value = command;
};

let Resolution = [
  "1920x1080",
  "1280x720",
  "854x480",
  "640x360",
  "426x240",
  "256x144",
];

let Date = ["LastDay", "LastWeek", "LastMonth", "LastYear", "AllTime"];

watch(selectResolution, () => {
  searchStore().setSearch("Resolution", selectResolution.value);
});

watch(selectDate, () => {
  searchStore().setSearch("Date", selectDate.value);
});
</script>

<style scoped></style>
