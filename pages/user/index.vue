<template>
  <div
    class="flex w-full h-screen justify-center bg-cyan-200 dark:bg-slate-700"
    :class="theme"
  >
    <div class="flex flex-col w-3/4 bg-cyan-100 dark:bg-slate-600 rounded-lg">
      <div class="flex felx-row w-full mt-5 mx-3">
        <div
          class="useImg rounded-full w-32 h-32 bg-pink-500 flex justify-center items-center mx-2"
        >
          <img
            :src="userInfo?.userUrl || '/img/blob.png'"
            alt="用户头像"
            class="w-full h-full rounded-full object-cover"
          />
        </div>
        <div class="flex flex-col text-left h-32 mx-2 justify-center">
          <h1 class="text-2xl font-bold">{{ userInfo?.userName }}</h1>
          <h1 class="text-sm"><span class="font-bold">email :</span> {{ userInfo?.userEmail }}</h1>
          <h1 class="text-sm"><span class="font-bold">Create Time: </span>{{ userInfo?.createTime }}</h1>
          <h1 class="text-sm"><span class="font-bold">Update Time:</span> {{ userInfo?.updateTime }}</h1>
        </div>
        <div class="ml-auto relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 absolute bottom-2 right-4"
            @click="editUser"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </div>
      </div>
      <div class="flex text-center bg-slate-100 dark:bg-slate-500 rounded-lg my-3 mx-3 h-20 w-3/5 p-2">
            <h1 class="text-sm text-slate-500 dark:text-gray-50">{{ userInfo?.description }}</h1>
          </div>
      <div
        class="flex flex-row w-2/3 border-2 p-1 border-cyan-200 dark:border-slate-500 rounded-lg justify-center my-8 mx-auto"
      >
        <button
          class="h-full w-1/4 mx-2 bg-sky-300"
          @click="somepage = Collection"
        >
          <span>收藏</span>
        </button>
        <button
          class="h-full w-1/4 mx-2 bg-sky-300"
          @click="somepage = Subscribe"
        >
          <span>关注</span>
        </button>
        <button
          class="h-full w-1/4 mx-2 bg-sky-300"
          @click="somepage = Myupload"
        >
          <span>我的上传</span>
        </button>
        <button
          class="h-full w-1/4 mx-2 bg-sky-300"
          @click="somepage = DataPage"
        >
          <span>其他数据</span>
        </button>
      </div>
      <div
        class="w-11/12 rounded-sm bg-slate-200 h-1/2 p-2 mx-auto dark:bg-slate-500"
      >
        <KeepAlive>
          <component :is="somepage" />
        </KeepAlive>
      </div>
    </div>

    <el-drawer
      v-model="visibleUser"
      title="修改用户"
      direction="rtl"
      size="50%"
      @close="selectedFile = null"
    >
      <!-- 修改用户表单 -->
      <el-form :model="userModel" label-width="100px">
        <el-form-item label="用户名：">
          <el-input
            v-model="userModel.userName"
            placeholder="修改用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="userEmail" prop="userEmail">
          <el-input
            type="email"
            v-model="userModel.userEmail"
            placeholder="修改userEmail"
          ></el-input>
        </el-form-item>
        <el-form-item label="userUrl">
          <label
            for="file-input"
            class="relative upload-icon flex items-center justify-center w-32 h-32 border-2 border-black rounded-sm bg-slate-100 m-2 overflow-hidden"
          >
            <div v-if="userModel.userUrl == null || userModel.userUrl == ''">
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
                :src="userModel.userUrl"
                class="absolute inset-0 w-full h-full object-cover"
                alt="Image Preview"
              />
            </div>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            @change="userIamgeUpload"
            style="display: none"
          />
        </el-form-item>
        <el-form-item label="userSex">
          <el-radio-group v-model="userModel.userSex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="description">
          <el-input
            type="textarea"
            v-model="userModel.description"
            :maxlength="50"
            show-word-limit
            placeholder="请输入个性签名，最多50个字符"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitUser">提交</el-button>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
const theme = useState("theme");
const Collection = resolveComponent("Collection");
const Subscribe = resolveComponent("Subscribe");
const Myupload = resolveComponent("Myupload");
const DataPage = resolveComponent("Datapage");
const somepage = ref(Collection);
const userInfo = ref<UserInfo>();
const selectedFile = ref<File | null>(null);
const visibleUser = ref(false);

const userIamgeUpload = (event: any) => {
  const file = event.target.files[0];
  if (file.size > 1024 * 1024 * 3) {
    ElMessage({
      message: "图片大小不能超过3MB",
      type: "error",
    });
    return;
  }
  if (file) {
    selectedFile.value = file;
    userModel.value.userUrl = URL.createObjectURL(file);
  }
};

interface UserInfo {
  userName: string;
  userEmail: string;
  userUrl: string;
  userSex: string;
  description: string;
  createTime: Date | null;
  updateTime: Date | null;
}

const userModel = ref<UserInfo>({
  userName: "",
  userEmail: "",
  userUrl: "",
  userSex: "",
  description: "",
  createTime: null,
  updateTime: null,
})

const editUser = () => {
  userModel.value.userName = userInfo.value?.userName || "";
  userModel.value.userEmail = userInfo.value?.userEmail || "";
  userModel.value.userUrl = userInfo.value?.userUrl || "";
  userModel.value.userSex = userInfo.value?.userSex || "";
  userModel.value.description = userInfo.value?.description || "";
  console.log("图片文件：", selectedFile.value);
  visibleUser.value = true;
}

const getuserInfo = () => {
  useFetch("/user/getInfo/" + `${userStore().userId}`, {
    method: "GET",
    baseURL: useRuntimeConfig().public.baseURL,
    headers: {
      token: userStore().token,
    },
  }).then((res) => {
    const d: any = res.data.value;
    // d: code , data ,msg
    if (d.code == 1) {
      userInfo.value = d.data;
    } else {
      ElMessage({
        message: d.msg,
        type: "error",
      });
    }
  });
}

const submitUser = () => {
  const formData = new FormData();
  formData.append("file", selectedFile.value as File || null);
  formData.append("userName", userModel.value.userName);
  formData.append("userSex", userModel.value.userSex);
  formData.append("description", userModel.value.description);

  useFetch("/user/updateuser", {
    method: "PUT",
    baseURL: useRuntimeConfig().public.baseURL,
    body: formData,
     headers: {
      token: userStore().token,
     },
    }).then((res) => {
    const d: any = res.data.value;
    // d: code , data ,msg
    if(d.code==1){
      //成功调用回显用户信息
      getuserInfo();
      visibleUser.value = false;
      ElMessage({
        message:"修改成功",
        type: "success",
      });
    }else{
      ElMessage({
        message:"修改失败",
        type: "error",
      });
    }
    })
  }

onBeforeMount( () => {
try {
 // if(import.meta.client) {  //process.client 服务端无法获取到localStorage里的信息，这里必须客户端执行
    useFetch("/user/getInfo/" + `${userStore().userId}`, {
    method: "GET",
    baseURL: useRuntimeConfig().public.baseURL,
    headers: {
      token: userStore().token,
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        navigateTo("/");
        userStore().setToken("");
        userStore().setUserId("");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        const isLogin = useState("testLogin")
        isLogin.value = false;
        ElMessage({
          message:"请登录",
          type: "error",
        });
      }
    }
  }).then((res) => {
    const d: any = res.data.value;
    // d: code , data ,msg
    if(d.code==1){
       userInfo.value = d.data;
    }
  });
//}
} catch (error) {
  ElMessage({
          message:"请求失败",
          type: "error",
        });
  console.error("请求发生错误", error);
  navigateTo("/");
}
})
</script>

