<script setup>
import { useRouter } from "vue-router";
import httpClient from "./../../axios";
const route = useRouter();

function logout() {
  httpClient
    .post("/logout")
    .then(() => {
      route.push("/");
      localStorage.clear();
    })
    .catch((err) => {
      route.push("/");
    });
}
</script>

<template>
  <div
    class="w-64 bg-[#363740] h-screen top-0 fixed inset-y-0 left-0 transform -translate-x-full transition duration-200 ease-in-out md:-translate-x-0"
    :class="{ ' -translate-x-0': $store.state.showSidebar }"
  >
    <div
      class="text-[#A4A6B3] flex gap-2 items-center mx-auto my-6 w-full justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
      <span class="text-xl font-semibold">Organtri Admin</span>
    </div>
    <div class="flex flex-col text-[#A4A6B3]">
      <RouterLink
        :to="{ name: 'admin.dashboard' }"
        class="flex gap-3 items-center py-5 px-7 hover:bg-[rgba(159,162,180,0.08)] hover:text-[#DDE2FF]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-7 h-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
          />
        </svg>
        <span>Overview</span>
      </RouterLink>
      <RouterLink
        :to="{ name: 'admin.category' }"
        class="flex gap-3 items-center py-5 px-7 hover:bg-[rgba(159,162,180,0.08)] hover:text-[#DDE2FF]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 6h.008v.008H6V6z"
          />
        </svg>
        <span>Category</span>
      </RouterLink>
      <RouterLink
        :to="{ name: 'admin.post' }"
        class="flex gap-3 items-center py-5 px-7 hover:bg-[rgba(159,162,180,0.08)] hover:text-[#DDE2FF]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
          />
        </svg>
        <span>Post</span>
      </RouterLink>
      <RouterLink
        :to="{ name: 'admin.author' }"
        class="flex gap-3 items-center py-5 px-7 hover:bg-[rgba(159,162,180,0.08)] hover:text-[#DDE2FF]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        <span>Author</span>
      </RouterLink>
      <RouterLink
        :to="{ name: 'admin.profile' }"
        class="flex gap-3 items-center py-5 px-7 hover:bg-[rgba(159,162,180,0.08)] hover:text-[#DDE2FF]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        <span>User Profile</span>
      </RouterLink>
      <hr class="border-t-slate-500" />
      <div
        @click="logout"
        class="flex gap-3 items-center py-5 px-7 hover:bg-[rgba(159,162,180,0.08)] hover:text-[#DDE2FF] hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
        <span>Logout</span>
      </div>
    </div>
  </div>
  <div
    class="md:ml-64 ml-0 transition-all duration-200 ease-in-out bg-[#E5E5E5] min-h-screen"
    :class="{ ' translate-x-64': $store.state.showSidebar }"
  >
    <RouterView />
  </div>
</template>

<style scoped>
.router-link-exact-active {
  background-color: rgba(159, 162, 180, 0.08);
  border-left-width: 2px;
  border-left-color: #dde2ff;
  color: #dde2ff;
}
</style>
