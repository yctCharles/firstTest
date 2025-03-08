<template>
  <div
    class="flex flex-col w-full h-screen bg-cyan-50 dark:bg-slate-600"
    :class="theme"
  >
    <SearchHeader />
    <div
      class="flex flex-col items-center justify-center w-2/3 h-2/3 m-auto bg-slate-400 mt-20"
    >
      <h2 class="text-white font-bold m-2">click upload image:</h2>
      <label
        for="file-input"
        class="relative upload-icon flex items-center justify-center w-32 h-32 border-2 border-black rounded-sm bg-slate-100 m-2 overflow-hidden"
      >
        <div v-if="imagePreview == null || imagePreview == ''">
          <div>
            <svg
              t="1730006993864"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="11641"
              width="32"
              height="32"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M512 1024C229.226667 1024 0 794.773333 0 512S229.226667 0 512 0s512 229.226667 512 512-229.226667 512-512 512z m-42.666667-554.666667h-170.666666a42.666667 42.666667 0 1 0 0 85.333334h170.666666v170.666666a42.666667 42.666667 0 1 0 85.333334 0v-170.666666h170.666666a42.666667 42.666667 0 1 0 0-85.333334h-170.666666v-170.666666a42.666667 42.666667 0 1 0-85.333334 0v170.666666z"
                fill="#1296db"
                p-id="11642"
              ></path>
            </svg>
          </div>
        </div>
        <div v-else>
          <img
            :src="imagePreview"
            class="absolute inset-0 w-full h-full object-cover"
            alt="Image Preview"
          />
        </div>
      </label>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        @change="handleFileUpload"
        style="display: none"
      />

      <TagSelect @update:selectedTags="handleSelectedTags" />

      <h2 class="text-white font-bold m-2">site private or public:</h2>
      <div class="flex items-center justify-center">
        <Switch
          v-model="status"
          :class="status ? 'bg-pink-600' : 'bg-lime-400'"
          @click="switchStatus()"
          class="relative inline-flex h-6 w-11 items-center rounded-full border-2 border-gray-500"
        >
          <span class="sr-only">Enable notifications</span>
          <span
            :class="status ? 'translate-x-6' : 'translate-x-1'"
            class="inline-block h-4 w-4 transform rounded-full bg-white transition"
          />
        </Switch>
        <h2 class="font-bold mx-3 text-red-400" v-if="status">private</h2>
        <h2 class="font-bold mx-3 text-green-300" v-else>public</h2>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        @click="uploadImage"
      >
        upload Image
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const theme = useState("theme");
const selectedFile = ref<any>(null);
const imagePreview = ref<any>(null);
const selectedTags = ref<number[]>([]);
const status = ref<number>(0);

if (!userStore().token || !userStore().userId) {
  ElMessage({
    message: "请先登录",
    type: "error",
    duration: 2000,
  });
  navigateTo("/");
}

const handleFileUpload = (event: any) => {
  const file = event.target.files[0];
  if (file.size > 1024 * 1024 * 15) {
    ElMessage({
      message: "图片大小不能超过15MB",
      type: "error",
    });
    return;
  }
  if (file) {
    selectedFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const handleSelectedTags = (tags: any) => {
  selectedTags.value = tags.map((tag: any) => tag.id);
};

function switchStatus(): void {
  status.value = status.value === 0 ? 1 : 0;
}

async function uploadImage() {
  if (!selectedFile.value) {
    ElMessage({
      message: "请选择图片",
      type: "error",
    });
  } else if (selectedTags.value == null || selectedTags.value.length == 0) {
    ElMessage({
      message: "至少选择一个标签",
      type: "error",
    });
  } else {
    const formData = new FormData();
    formData.append("file", selectedFile.value);
    formData.append("tags", selectedTags.value.join(","));
    formData.append("status", status.value.toString());

    try {
      const res = await $fetch("/img/upload", {
        method: "POST",
        baseURL: useRuntimeConfig().public.baseURL,
        headers: {
          token: localStorage.getItem("token") || "",
        },
        body: formData,
      });

      if (res.code == 1) {
        ElMessage({
          message: "上传成功",
          type: "success",
        });
      } else {
        ElMessage({
          message: "上传失败",
          type: "error",
        });
      }
    } catch (e) {
      ElMessage({
        message: "请求失败",
        type: "error",
      });
    }
  }
}
</script>
