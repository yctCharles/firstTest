<template>
  <div class="flex flex-col w-screen h-screen m-0 p-0" :class="theme">
    <!-- <p>Slug: {{ $route.params.slug }}</p> -->
    <div class="w-full fixed top-0 z-20">
      <SearchHeader />
    </div>
    <div
      class="flex flex-row w-full adapt bg-slate-300 dark:bg-slate-800 mt-20"
    >
      <div
        class="w-1/6 h-full bg-slate-300 dark:bg-slate-700 p-2 flex flex-col min-w-[250px]"
      >
        <!-- <h1 v-for="tag in tagList" :key="tag" class="m-2">Tag :{{ tag }}</h1> -->
        <span class="font-bold text-lg m-2 text-slate-400 dark:text-white">
          图片信息:
        </span>
        <span class="font-bold text-lg m-2 text-slate-400 dark:text-white">
          尺寸:
          <span
            class="font-bold m-2 text-slate-700 dark:text-white flex justify-center items-center"
            style="font-size: 1.5rem"
          >
            {{ wallobj.width }} x {{ wallobj.height }}
          </span>
        </span>

        <span class="font-bold text-lg m-2 text-slate-400 dark:text-white">
          色块:
        </span>
        <div class="flex flex-row w-full items-center justify-center">
          <div class="flex flex-row w-4/5 h-8">
            <div
              class="flex-1 bg-red-500 hover:scale-125 hover:rounded-sm transition-transform"
              v-if="wallobj.colourRed >= 100"
            ></div>
            <div
              class="flex-1 bg-orange-500 hover:scale-125 hover:rounded-sm transition-transform"
              v-if="wallobj.colourOrange >= 100"
            ></div>
            <div
              class="flex-1 bg-yellow-500 hover:scale-125 hover:rounded-sm transition-transform"
              v-if="wallobj.colourYellow >= 100"
            ></div>
            <div
              class="flex-1 bg-green-500 hover:scale-125 hover:rounded-sm transition-transform"
              v-if="wallobj.colourGreen >= 100"
            ></div>
            <div
              class="flex-1 bg-blue-500 hover:scale-125 hover:rounded-sm transition-transform"
              v-if="wallobj.colourBlue >= 100"
            ></div>
            <div
              class="flex-1 bg-purple-500 hover:scale-125 hover:rounded-sm transition-transform"
              v-if="wallobj.colourPurple >= 100"
            ></div>
            <div
              class="flex-1 bg-gray-500 hover:scale-125 hover:rounded-sm transition-transform"
              v-if="wallobj.colourGray >= 100"
            ></div>
            <div
              class="flex-1 bg-white hover:scale-125 hover:rounded-sm transition-transform"
              v-if="wallobj.colourWhite >= 100"
            ></div>
          </div>
        </div>
        <span class="font-bold text-lg m-2 text-slate-400 dark:text-white">
          相关标签:
        </span>
        <TagTemplate :list="tagList" />
        <span class="font-bold text-lg m-2 text-slate-400 dark:text-white">
          上传用户:
        </span>
        <UserBanner />
      </div>
      <div
        class="w-5/6 h-full bg-slate-200 dark:bg-slate-600 flex flex-col min-w-[600px]"
      >
        <div
          class="flex justify-center items-center w-full h-full dark:bg-slate-900 p-8 bg-white rounded-sm relative"
        >
          <div
            class="w-full h-full overflow-hidden flex items-center justify-center"
          >
            <el-image
              ref="imageRef"
              class="w-full h-full max-w-full max-h-full object-contain"
              :src="wallobj.url"
              :preview-src-list="[wallobj.url]"
              hide-on-click-modal
              fit="contain"
            />
          </div>
          <div
            class="rounded-lg flex flex-row w-1/2 h-[10%] justify-center items-center absolute bottom-16 bg-white bg-opacity-65"
          >
            <div
              class="flex flex-col justify-center items-center m-2 bg-white p-2 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 stroke-lime-500 stroke-2 cursor-pointer"
                @click="downloadImage"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </div>

            <div
              class="flex flex-col justify-center items-center m-2 p-2 rounded-lg bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 stroke-orange-400 cursor-pointer"
                :class="{
                  'fill-yellow-200': isCollection,
                }"
                @click="collectionImage"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </div>
            <div
              class="flex flex-row justify-center items-center m-2 p-2 rounded-lg bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 stroke-pink-400 stroke-2 cursor-pointer"
                @click="likeImage"
                :class="{
                  'fill-pink-200': isLike,
                }"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>

              <label for="img_like" class="text-center ml-1 text-cyan-400">
                {{ count }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchHeader from "~/components/Layout/SearchHeader.vue";
import { v4 as uuidv4 } from "uuid";
interface WallObj {
  url: string;
  width: number;
  height: number;
  colourRed: number;
  colourOrange: number;
  colourYellow: number;
  colourGreen: number;
  colourBlue: number;
  colourPurple: number;
  colourWhite: number;
  colourGray: number;
}
const theme = useState("theme");
const route = useRoute();
const tagList = ref<string[]>([]);
const wallobj = ref<WallObj>({
  url: "",
  width: 0,
  height: 0,
  colourRed: 0,
  colourOrange: 0,
  colourYellow: 0,
  colourGreen: 0,
  colourBlue: 0,
  colourPurple: 0,
  colourWhite: 0,
  colourGray: 0,
});
const wallPaperId = route.params.slug;
const userId = route.params.group;
const isCollection = ref(false);
const isLike = ref(false);
const count = ref(0);

await useFetch("/tag/get/" + `${wallPaperId}`, {
  method: "GET",
  baseURL: useRuntimeConfig().public.baseURL,
}).then((res) => {
  //console.log("标签：", res.data.value);
  const data: any = res.data.value;
  const list: string[] = data.data;
  tagList.value = list;
});

if (userStore().userId) {
  await $fetch("/collection/list", {
    method: "GET",
    baseURL: useRuntimeConfig().public.baseURL,
    params: {
      userId: userStore().userId,
      wallpaperId: wallPaperId,
    },
  }).then((res) => {
    //console.log("收藏：", res.data);
    isCollection.value = res.data;
  });
}

await useFetch("/like/getAll/" + `${wallPaperId}`, {
  method: "GET",
  baseURL: useRuntimeConfig().public.baseURL,
}).then((res) => {
  //console.log("点赞数：", res.data.value);
  const d: any = res.data.value;
  count.value = d.data;
});

await useFetch("/img/get/" + `${wallPaperId}`, {
  method: "GET",
  baseURL: useRuntimeConfig().public.baseURL,
}).then((res) => {
  //console.log("图片信息：", res.data.value);
  const d: any = res.data.value;
  wallobj.value = d.data;
  //console.log("图片信息：", wallobj.value);
});

//如果用户已经登录，则获取用户是否已经点赞
if (userStore().userId) {
  await $fetch("/like/islike", {
    method: "GET",
    baseURL: useRuntimeConfig().public.baseURL,
    params: {
      userId: userStore().userId,
      wallpaperId: wallPaperId,
    },
  }).then((res) => {
    //console.log("是否点赞：", res.data);
    isLike.value = res.data;
  });
}

function downloadImage() {
  //const url: any = route.query.url?.toString(); 不再使用 query 参数，而是使用 wallobj.value.url
  const url: any = wallobj.value.url;
  const img = new Image();
  img.crossOrigin = "Anonymous"; // 允许跨域加载
  img.src = url;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    canvas.toBlob((blob: any) => {
      const link = document.createElement("a");
      const mimeType = blob.type; // 获取 MIME 类型
      const extension = mimeType.split("/")[1]; // 获取后缀
      const filename = `${uuidv4()}.${extension}`; // 生成唯一文件名

      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, "image/png");
  };

  img.onerror = (error) => {
    ElMessage({
      message: "图片跨域无法下载，请手动复制链接下载",
      type: "error",
    });
    console.error("Image loading failed:", error);
  };
}

function collectionImage() {
  if (!userStore().userId) {
    ElMessage({
      message: "请先登录",
      type: "error",
    });
    return;
  }

  const action: number = isCollection.value ? 2 : 1;
  $fetch("/collection/" + `${action}`, {
    method: "POST",
    baseURL: useRuntimeConfig().public.baseURL,
    params: {
      userId: userStore().userId,
      wallpaperId: wallPaperId,
    },
  }).then((res) => {
    console.log("收藏结果：", res.data);
    if (res.code == 1) {
      ElMessage({
        message: res.data,
        type: "success",
      });
    } else {
      ElMessage({
        message: res.msg,
        type: "error",
      });
    }
    if (action == 1) {
      isCollection.value = true;
    } else {
      isCollection.value = false;
    }
  });
}

function likeImage() {
  if (!userStore().userId) {
    ElMessage({
      message: "请先登录",
      type: "error",
    });
    return;
  }
  if (!isLike.value) {
    $fetch("/like/action", {
      method: "POST",
      baseURL: useRuntimeConfig().public.baseURL,
      params: {
        userId: userStore().userId,
        wallpaperId: wallPaperId,
      },
    }).then((res) => {
      ElMessage({
        message: res.data,
        type: "success",
      });
      count.value++;
      isLike.value = true;
    });
  }
}
</script>

<style scoped>
.adapt {
  height: 870px;
}
</style>
