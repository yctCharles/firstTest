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

    <el-dropdown @command="handleCommandColor">
      <el-button type="primary" class="w-32 mr-5 p-0" style="padding: 0">
        {{ selectColor
        }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in Color" :command="item">
            <ColorBox
              :color="item.slice(6, item.length).toLowerCase()"
            ></ColorBox
          ></el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
const selectResolution = ref<string>("Resolution");
const selectDate = ref<string>("Date");
const selectColor = ref<string>("Color");

const handleSelect = () => {
  if (searchStore().search.Resolution !== "All") {
    selectResolution.value = searchStore().search.Resolution;
  }
  if (searchStore().search.Date !== "AllTime") {
    selectDate.value = searchStore().search.Date;
  }
  if (searchStore().search.Color !== "All") {
    selectColor.value = searchStore().search.Color;
  }
};
handleSelect();

const handleCommand = (command: string) => {
  selectResolution.value = command;
};

const handleCommandDate = (command: string) => {
  selectDate.value = command;
};

const handleCommandColor = (command: string) => {
  selectColor.value = command;
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

let Color = [
  "ColourRed",
  "ColourOrange",
  "ColourYellow",
  "ColourGreen",
  "ColourBlue",
  "ColourPurple",
  "ColourGray",
  "ColourWhite",
];

watch(selectResolution, () => {
  searchStore().setSearch("Resolution", selectResolution.value);
});

watch(selectDate, () => {
  searchStore().setSearch("Date", selectDate.value);
});

watch(selectColor, () => {
  searchStore().setSearch("Color", selectColor.value);
});
</script>

<style scoped></style>
