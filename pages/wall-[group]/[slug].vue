<template>
  <div class="flex flex-col w-screen h-screen m-0 p-0 relative" :class="theme">
    <!-- <p>Slug: {{ $route.params.slug }}</p> -->
    <div
      v-show="showComment"
      class="absolute top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50"
      @click="showComment = false"
    >
      <div
        @click.stop="handleAllReplyBoxClose"
        @scroll="handleScroll"
        class="handle absolute min-w-[800px] left-1/2 translate-x-[-50%] 48 bottom-0 w-[90%] h-2/3 z-10 dark:bg-gray-800 bg-white overflow-y-scroll rounded-tl-2xl rounded-tr-2xl p-10"
      >
        <div
          @click="showComment = false"
          class="absolute top-4 right-6 cursor-pointer"
        >
          <svg
            t="1741434554334"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="10736"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="24"
            height="24"
          >
            <path
              d="M512 428.8l-326.4-326.4c-25.6-25.6-57.6-25.6-83.2 0s-25.6 57.6 0 83.2l326.4 326.4-326.4 326.4c-25.6 25.6-25.6 57.6 0 83.2s57.6 25.6 83.2 0l326.4-326.4 326.4 326.4c25.6 25.6 57.6 25.6 83.2 0s25.6-57.6 0-83.2l-326.4-326.4 326.4-326.4c25.6-25.6 25.6-57.6 0-83.2s-57.6-25.6-83.2 0l-326.4 326.4z"
              fill="#dbdbdb"
              p-id="10737"
            ></path>
          </svg>
        </div>
        <div class="flex justify-start items-center">
          <div
            class="text-2xl font-bold text-center text-black dark:text-white"
          >
            评论 <span class="text-sm"> {{ allCommentCount }} </span>
          </div>
          <div class="ml-2 text-black dark:text-white">
            <span
              class="cursor-pointer"
              :class="{ 'text-sky-500': sortType == 'new' }"
              @click="sortType = 'new'"
            >
              最新
            </span>
            <span class="text-black dark:text-white font-bold"> | </span>
            <span
              class="cursor-pointer"
              :class="{ 'text-sky-500': sortType == 'hot' }"
              @click="sortType = 'hot'"
            >
              最热</span
            >
          </div>
        </div>

        <div
          class="flex m-5 px-1 items-center justify-start pb-12 border-slate-600 border-b-[1px]"
        >
          <div
            class="w-16 h-16 flex items-center justify-center rounded-[100%] dark:bg-slate-400 bg-gray-300 overflow-hidden"
          >
            <img
              v-if="currentUser.userUrl"
              style="width: 100%; height: 100%; object-fit: cover"
              :src="currentUser.userUrl"
              alt="头像"
            />
            <span v-else class="text-white font-bold text-1xl dark:text-white"
              >未登录</span
            >
          </div>
          <div class="w-[80%] mx-5">
            <el-input
              type="text"
              v-model="comment"
              placeholder="欣赏艺术，评论艺术"
              minlength="1"
              maxlength="900"
              :show-word-limit="true"
              v-on:focus="showSubmit = true"
              v-on:blur="showSubmit = false"
              style="height: 50px"
            >
            </el-input>
          </div>
          <div
            class="flex items-center justify-center"
            v-show="comment.length > 0"
          >
            <el-button
              @click="submitComment('commom', 0n, 0)"
              :disabled="currentUser.userName == null"
              >{{
                currentUser.userName == null ? "登录发布评论" : "评论"
              }}</el-button
            >
          </div>
        </div>

        <div class="flex flex-col w-full pl-32 pr-4">
          <div
            @click.stop
            class="w-full flex justify-start py-4"
            v-for="(item, index) in commentList"
            :key="index"
          >
            <div class="w-18 h-full flex flex-col justify-start items-start">
              <div
                class="w-16 h-16 rounded-[100%] bg-slate-600 mr-4 overflow-hidden"
              >
                <img
                  style="width: 100%; height: 100%; object-fit: cover"
                  :src="item.simpleUser.userUrl"
                  alt="头像"
                />
              </div>
            </div>
            <div
              class="flex w-full flex-col border-b-[1px] pb-4 border-slate-400"
            >
              <div class="mian-comment relative">
                <div class="h-4 text-red-400 my-1">
                  {{ item.simpleUser.userName }}
                </div>
                <div class="text-slate-800 my-1">{{ item.content }}</div>
                <div class="text-gray-400 my-1 flex">
                  {{ item.createTime }}

                  <div
                    class="cursor-pointer"
                    @click="handleCommentLike(item.commentId, item.commentId)"
                  >
                    <liked
                      v-if="item.isLike"
                      class="mx-2"
                      width="20"
                      height="20"
                    />
                    <like v-else class="mx-2" width="20" height="20" />
                  </div>
                  <span class="text-gray-400 text-sm flex items-center mr-1">{{
                    item.likeCount
                  }}</span>
                  <span
                    class="dark:text-lime-200 text-lime-400 cursor-pointer"
                    @click.stop="handleReply(item.commentId, 0n, 0)"
                  >
                    回复
                  </span>
                </div>
                <div
                  v-if="item.userId === currentUserId"
                  class="absolute bottom-4 right-5"
                >
                  <img
                    @click="handleDeleteComment(item.commentId, 0n)"
                    src="../../public/icon/delete.svg"
                    class="w-5 h-5 cursor-pointer"
                  />
                </div>
              </div>

              <div class="chilren-comment" v-show="item.showChildren">
                <div
                  class="w-full flex items-center justify-start pb-4 relative"
                  v-for="child in item.children"
                >
                  <div
                    class="w-8 h-full flex flex-col justify-start items-start mr-2"
                  >
                    <div
                      class="w-8 h-8 rounded-[100%] bg-slate-600 mr-4 overflow-hidden"
                    >
                      <img
                        style="width: 100%; height: 100%; object-fit: cover"
                        :src="child.simpleUser.userUrl"
                        alt="头像"
                      />
                    </div>
                  </div>
                  <div class="flex w-full flex-col">
                    <div class="mian-comment">
                      <div class="h-4 text-red-400 my-1 flex items-center">
                        {{ child.simpleUser.userName }}
                        <div
                          v-if="child.toUser !== null"
                          class="ml-2 text-sky-300"
                        >
                          @ {{ child.toUser.userName }}
                        </div>
                      </div>
                      <div class="text-slate-800 my-1">{{ child.content }}</div>
                      <div class="text-gray-400 my-1 flex">
                        {{ child.createTime }}
                        <div
                          @click="
                            handleCommentLike(child.commentId, item.commentId)
                          "
                        >
                          <liked
                            v-if="child.isLike"
                            class="mx-2"
                            width="20"
                            height="20"
                          />
                          <like v-else class="mx-2" width="20" height="20" />
                        </div>
                        <span
                          class="text-gray-400 text-sm flex items-center mr-1"
                          >{{ child.likeCount }}</span
                        >
                        <span
                          class="dark:text-red-200 text-pink-400 cursor-pointer"
                          @click.stop="
                            handleReply(
                              item.commentId,
                              child.commentId,
                              child.userId
                            )
                          "
                        >
                          回复
                        </span>
                        <div
                          v-if="child.userId === currentUserId"
                          class="absolute bottom-4 right-5"
                        >
                          <img
                            @click="
                              handleDeleteComment(
                                child.commentId,
                                item.commentId
                              )
                            "
                            src="../../public/icon/delete.svg"
                            class="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="item.childrenSize > 3" class="">
                  <el-pagination
                    size="small"
                    :page-size="3"
                    @current-change="
                      handleCurrentChange(
                        item.childrenPageNum ? item.childrenPageNum : 1,
                        3,
                        item.commentId
                      )
                    "
                    v-model:current-page="item.childrenPageNum"
                    layout="prev, pager, next"
                    :total="item.childrenSize"
                  />
                </div>
              </div>
              <div
                v-show="item.childrenSize > 0"
                class="text-gray-400 my-1"
                @click="showReply(item.commentId)"
              >
                {{
                  item.showChildren
                    ? "收起"
                    : "共" + item.childrenSize + "条回复，点击查看"
                }}
              </div>
              <div v-show="item.showReplyBox" class="w-full">
                <div class="w-[80%] mx-5 flex justify-between items-center">
                  <el-input
                    type="text"
                    v-model="replyContent"
                    :placeholder="
                      currentReplyUserId === 0
                        ? `@${
                            item.simpleUser?.userName || '用户'
                          } 展示你的高情商回复吧`
                        : `@${
                            item.children?.find(
                              (child) =>
                                child.commentId === currentReplyCommentId
                            )?.simpleUser?.userName || '用户'
                          } 展示你的高情商回复吧`
                    "
                    minlength="1"
                    maxlength="900"
                    :show-word-limit="true"
                    v-on:focus="showSubmit = true"
                    v-on:blur="showSubmit = false"
                    style="height: 50px"
                  >
                  </el-input>
                  <el-button
                    @click="submitComment('reply', item.commentId, item.userId)"
                    :disabled="currentUser.userName == null"
                    class="ml-5"
                  >
                    {{ currentUser.userName == null ? "登录后可回复" : "发送" }}
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full fixed top-0 z-20">
      <SearchHeader />
    </div>
    <div
      class="flex flex-row w-full adapt bg-slate-300 dark:bg-slate-800 mt-20 relative"
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

            <div
              @click="showComment = true"
              class="flex flex-row justify-center items-center m-2 p-2 rounded-lg bg-white cursor-pointer absolute right-10"
            >
              <svg
                t="1741434305564"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6257"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="36"
                height="36"
              >
                <path
                  d="M832 128H192c-70.4 0-128 57.6-128 128v384c0 70.4 57.6 128 128 128h128v64c0 25.6 12.8 44.8 32 57.6 12.8 6.4 19.2 6.4 32 6.4s25.6-6.4 38.4-12.8L569.6 768H832c70.4 0 128-57.6 128-128V256c0-70.4-57.6-128-128-128zM320 512c-38.4 0-64-25.6-64-64s25.6-64 64-64 64 25.6 64 64-25.6 64-64 64z m192 0c-38.4 0-64-25.6-64-64s25.6-64 64-64 64 25.6 64 64-25.6 64-64 64z m192 0c-38.4 0-64-25.6-64-64s25.6-64 64-64 64 25.6 64 64-25.6 64-64 64z m0 0"
                  fill="#4FC1E9"
                  p-id="6258"
                ></path>
              </svg>
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
interface SimpleUser {
  userUrl: string;
  userName: string;
  userEmail: string;
}

interface Comment {
  commentId: bigint;
  content: string;
  wallpaperId: number;
  userId: number;
  likeCount: number;
  rootCommentId: bigint;
  toCommentId: bigint;
  createTime: Date;
  updateTime: Date;
  toUserId: number;
  toUser: SimpleUser;
  simpleUser: SimpleUser;
  childrenSize: number;
  isLike: boolean;
  children?: Comment[];
  childrenPageNum?: number;
  showChildren?: boolean;
  showReplyBox?: boolean;
}

const currentUserId = Number(userStore().userId);
// console.log("查询当前用户id：", currentUserId);
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
const currentUser = ref<SimpleUser>({
  userUrl: "",
  userName: "",
  userEmail: "",
});

const sortType = ref<string>("new");
const commentList = ref<Comment[]>([]);
const currentReplyCommentId = ref<bigint>(0n);
const currentReplyUserId = ref<number>(0);
const showComment = ref(false);
const showSubmit = ref(false);
const comment = ref("");
const replyContent = ref("");
const wallPaperId = route.params.slug;
const uploadUserId = route.params.group;
const isCollection = ref(false);
const isLike = ref(false);
const count = ref(0);
const allCommentCount = ref(0);

watch(sortType, async (newVal) => {
  commentList.value = [];
  allCommentCount.value = 0;
  currentPage.value = 1;
  await pageComment(1, 5);
  await setRootFirstChildren();
  pageGetCount();
});

const showReply = (commentId: bigint) => {
  commentList.value.forEach((comment) => {
    if (comment.commentId === commentId) {
      comment.showChildren = !comment.showChildren;
    }
  });
  //获取到commentId下的主评论对象
  const commentObj = commentList.value.find(
    (comment) => comment.commentId === commentId
  );
  if (commentObj && commentObj.showChildren === true) {
    pageGetChildrenComment(
      commentObj.childrenPageNum ? commentObj.childrenPageNum : 1,
      3,
      commentId
    );
  }
};

const handleDeleteComment = (commentId: bigint, rootCommentId: bigint) => {
  ElMessageBox.confirm("确定删除该评论吗？删除后回复评论也会被删除", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteComment(commentId, rootCommentId);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};

const deleteComment = async (commentId: bigint, rootCommentId: bigint) => {
  await $fetch("/comment/delete", {
    method: "DELETE",
    baseURL: useRuntimeConfig().public.baseURL,
    headers: {
      token: userStore().token,
    },
    params: {
      commentId: commentId.toString(),
      userId: currentUserId,
    },
  }).then((res: any) => {
    console.log("删除评论：", res);
    if (res.code === 1) {
      //刷新数量
      pageGetCount();
      //成功后手动移除
      if (rootCommentId === 0n) {
        commentList.value = commentList.value.filter(
          (comment) => comment.commentId !== commentId
        );
      } else {
        const commentObj = commentList.value.find(
          (comment) => comment.commentId === rootCommentId
        );
        if (commentObj) {
          commentObj.children = commentObj.children?.filter(
            (comment) => comment.commentId !== commentId
          );
        }
      }
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    }
  });
};

const pageGetCount = async () => {
  const res: any = await $fetch("/comment/get-all-count", {
    method: "GET",
    baseURL: useRuntimeConfig().public.baseURL,
    params: {
      wallpaperId: wallPaperId,
    },
  });
  if (res.data) {
    allCommentCount.value = res.data;
  }
};

const handleAllReplyBoxClose = () => {
  commentList.value.forEach((comment) => {
    comment.showReplyBox = false;
  });
};
const handleReply = (
  commentId: bigint,
  toCommentId: bigint,
  childUserId: number
) => {
  //先关闭其他的
  commentList.value.forEach((comment) => {
    comment.showReplyBox = false;
  });
  //再打开自己的
  commentList.value.forEach((comment) => {
    if (comment.commentId === commentId) {
      comment.showReplyBox = true;
    }
  });
  //如果是点击的子评论回复
  if (toCommentId && toCommentId != 0n) {
    currentReplyCommentId.value = toCommentId;
  } else {
    currentReplyCommentId.value = commentId;
    //用于判断是回复主评论还是回复子评论
    currentReplyUserId.value = 0;
  }

  if (childUserId && childUserId != 0) {
    currentReplyUserId.value = childUserId;
  }
};
const currentPage = ref<number>(1);
const totalPage = ref<number>(0);
const handleScroll = (e: Event) => {
  const scrollTop = (e.target as HTMLElement).scrollTop;
  const clientHeight = (e.target as HTMLElement).clientHeight;
  const scrollHeight = (e.target as HTMLElement).scrollHeight;

  if (
    scrollHeight - clientHeight - scrollTop <= 0 &&
    currentPage.value < totalPage.value
  ) {
    currentPage.value++;
    pageComment(currentPage.value, 5);
  }
};

await useFetch("/tag/get/" + `${wallPaperId}`, {
  method: "GET",
  baseURL: useRuntimeConfig().public.baseURL,
}).then((res) => {
  //console.log("标签：", res.data.value);
  const data: any = res.data.value;
  const list: string[] = data.data;
  tagList.value = list;
});

const pageComment = async (pageNum: number, pageSize: number) => {
  const res = await $fetch("/comment/get", {
    method: "GET",
    baseURL: useRuntimeConfig().public.baseURL,
    headers: {
      token: userStore().token,
    },
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      wallpaperId: wallPaperId,
      sortType: sortType.value,
    },
  }).then((res: any) => {
    console.log("评论：", res);
    const list = ref<Comment[]>([]);
    list.value = res.record;
    totalPage.value = Math.ceil(res.total / 5);
    list.value = list.value.map((comment) => ({
      ...comment,
      children: [],
      showChildren: false,
      showReplyBox: false,
      childrenSize: 0,
      childrenPageNum: 1,
    }));
    commentList.value.push(...list.value);
  });
};

const setRootFirstChildren = () => {
  commentList.value.forEach((comment) => {
    pageGetChildrenComment(
      comment.childrenPageNum ? comment.childrenPageNum : 1,
      2,
      comment.commentId
    );
  });
};

const handleCurrentChange = (
  pageNum: number,
  pageSize: number,
  commentId: bigint
) => {
  console.log("子评论分页：", pageNum, pageSize, commentId);
  pageGetChildrenComment(pageNum, pageSize, commentId);
};

const pageGetChildrenComment = async (
  pageNum: number,
  pageSize: number,
  rootCommentId: bigint
) => {
  const res = await $fetch("/comment/get-children", {
    method: "GET",
    baseURL: useRuntimeConfig().public.baseURL,
    headers: {
      token: userStore().token,
    },
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      rootCommentId: rootCommentId.toString(),
      sortType: sortType.value,
    },
  }).then((res: any) => {
    //加入到父级评论中
    commentList.value.forEach((comment) => {
      if (comment.commentId === rootCommentId && comment.children) {
        comment.children = res.record;
        comment.childrenSize = res.total;
        console.log("添加子评论：", comment.children);
      }
    });
  });
};

const handleCommentLike = async (commentId: bigint, rootCommentId: bigint) => {
  if (!userStore().token) {
    ElMessage.error("请先登录");
    return;
  }
  const res = await $fetch("/comment/like/action", {
    method: "POST",
    baseURL: useRuntimeConfig().public.baseURL,
    headers: {
      token: userStore().token,
    },
    params: {
      commentId: commentId.toString(),
      userId: userStore().userId,
    },
  }).then((res: any) => {
    if (res.code === 1) {
      //手动更新点赞状态
      if (rootCommentId === commentId) {
        //主评论点赞
        commentList.value.forEach((comment) => {
          if (comment.commentId === commentId) {
            comment.isLike = !comment.isLike;
            if (comment.isLike) {
              comment.likeCount = comment.likeCount + 1;
            } else {
              comment.likeCount = comment.likeCount - 1;
            }
          }
        });
      } else {
        commentList.value.forEach((comment) => {
          if (comment.commentId === rootCommentId && comment.children) {
            comment.children.forEach((child) => {
              if (child.commentId === commentId) {
                child.isLike = !child.isLike;
                if (child.isLike) {
                  child.likeCount = child.likeCount + 1;
                } else {
                  child.likeCount = child.likeCount - 1;
                }
              }
            });
          }
        });
      }
      ElMessage.success(res.data);
    } else {
      ElMessage.error("点赞失败");
    }
  });
};

const submitComment = async (
  type: string,
  rootCommentId: bigint,
  userId: number
) => {
  //封装请求体,type不是reply就是主评论
  let body = {
    content: comment.value,
    userId: userStore().userId,
    wallpaperId: wallPaperId,
    toCommentId: 0n.toString(),
    rootCommentId: 0n.toString(),
    toUserId: 0,
  };

  //回复子评论
  if (
    type === "reply" &&
    rootCommentId &&
    rootCommentId != 0n &&
    currentReplyUserId.value !== 0
  ) {
    body.rootCommentId = rootCommentId.toString();
    body.toCommentId = currentReplyCommentId.value.toString();
    body.content = replyContent.value;
    body.toUserId = currentReplyUserId.value;
  }

  //有userId证明是回复主评论,覆盖前面的
  if (type === "reply" && currentReplyUserId.value === 0) {
    body.toUserId = userId;
    body.content = replyContent.value;
    body.toCommentId = rootCommentId.toString();
    body.rootCommentId = rootCommentId.toString();
  }

  console.log("评论开始");
  const res = await $fetch("/comment/add", {
    method: "POST",
    baseURL: useRuntimeConfig().public.baseURL,
    body: body,
    headers: {
      token: userStore().token,
    },
  }).then((res: any) => {
    console.log("评论完：", res);
    if (res.code === 1) {
      ElMessage.success("评论成功");
      allCommentCount.value = allCommentCount.value + 1;
      if (type === "reply") {
        //刷新子评论
        commentList.value.forEach((comment) => {
          if (comment.commentId === rootCommentId) {
            comment.children = [];
            comment.childrenPageNum = 1;
            pageGetChildrenComment(
              comment.childrenPageNum,
              3,
              comment.commentId
            );
          }
        });
        //回复完清空回复内容
        replyContent.value = "";
      } else {
        //刷新主评论
        pageComment(1, 10);
        //清空主评论内容
        comment.value = "";
      }
    }
  });
};

if (userStore().userId) {
  await $fetch("/collection/list", {
    method: "GET",
    baseURL: useRuntimeConfig().public.baseURL,
    params: {
      userId: userStore().userId,
      wallpaperId: wallPaperId,
    },
  }).then((res: any) => {
    //console.log("收藏：", res.data);
    isCollection.value = res.data;
  });
}

if (userStore().userId) {
  await $fetch("/user/get/" + `${userStore().userId}`, {
    method: "GET",
    baseURL: useRuntimeConfig().public.baseURL,
  }).then((res: any) => {
    currentUser.value = res.data;
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
  }).then((res: any) => {
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
  }).then((res: any) => {
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
    }).then((res: any) => {
      ElMessage({
        message: res.data,
        type: "success",
      });
      count.value++;
      isLike.value = true;
    });
  }
}

onMounted(async () => {
  await pageComment(1, 5);
  await setRootFirstChildren();
  await pageGetCount();
});
</script>

<style scoped>
.adapt {
  height: 870px;
}

.handle::-webkit-scrollbar {
  display: none; /* 隐藏滚动条 */
}
</style>
