<template>
  <div class="flex flex-col w-full" :class="theme">
    <SearchHeader />
    <div
      class="flex w-full justify-center items-center bg-cyan-200 dark:bg-slate-600"
    >
      <form class="bg-cyan-50 dark:bg-slate-500 p-2 rounded-sm mt-2">
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
            <div class="flex flex-col justify-center items-center">
              <h2
                class="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100"
              >
                Upload your image
              </h2>
           
            <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-100">
              This information will be displayed publicly so be careful what you
              share.
            </p> 
            </div>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label
                  for="username"
                  class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >Username</label
                >
                <div class="mt-2">
                  <div
                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  >
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autocomplete="username"
                      class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="janesmith"
                    />
                  </div>
                </div>
              </div>

              <div class="col-span-full">
                <label
                  for="about"
                  class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >About</label
                >
                <div class="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows="3"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p
                  class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-100"
                >
                  Write a few sentences about yourself.
                </p>
              </div>

              <div class="col-span-full">
                <label
                  for="photo"
                  class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >Photo</label
                >
                <div class="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    class="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div class="col-span-full">
                <label
                  for="cover-photo"
                  class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >Cover photo</label
                >
                <div
                  class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-white"
                >
                  <div class="text-center">
                    <PhotoIcon
                      class="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        for="file-upload"
                        class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          class="sr-only"
                        />
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-b border-gray-900/10 pb-12">
            <h2
              class="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100"
            >
              Notifications
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-100">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div class="mt-10 space-y-10">
              <fieldset>
                <legend
                  class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
                >
                  By Email
                </legend>
                <div class="mt-6 space-y-6">
                  <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label
                        for="comments"
                        class="font-medium text-gray-900 dark:text-gray-100"
                        >Comments</label
                      >
                      <p class="text-gray-500 dark:text-gray-100">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label
                        for="candidates"
                        class="font-medium text-gray-900 dark:text-gray-100"
                        >Candidates</label
                      >
                      <p class="text-gray-500 dark:text-gray-100">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label
                        for="offers"
                        class="font-medium text-gray-900 dark:text-gray-100"
                        >Offers</label
                      >
                      <p class="text-gray-500 dark:text-gray-100">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend
                  class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
                >
                  Push Notifications
                </legend>
                <p
                  class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-100"
                >
                  These are delivered via SMS to your mobile phone.
                </p>
                <div class="mt-6 space-y-6">
                  <div class="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      for="push-everything"
                      class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                      >Everything</label
                    >
                  </div>
                  <div class="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      for="push-email"
                      class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                      >Same as email</label
                    >
                  </div>
                  <div class="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      for="push-nothing"
                      class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                      >No push notifications</label
                    >
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { PhotoIcon, UserCircleIcon } from "@heroicons/vue/24/solid";
const theme=  useState("theme");
</script>
