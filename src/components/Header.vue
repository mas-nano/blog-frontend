<template>
  <div class="w-full flex p-8 items-center justify-between">
    <div class="flex items-center">
      <button @click="$store.commit('changeSidebarState')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 md:hidden md:mr-0 mr-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <span class="font-bold text-2xl">{{ props.title }}</span>
    </div>
    <div class="flex items-center justify-between gap-4">
      <span class="md:block hidden">{{ user.name }}</span>
      <img
        src="https://picsum.photos/200"
        alt=""
        class="rounded-full h-11 w-11 object-cover object-center"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import httpClient from "../axios";

const userData = ref({});

onMounted(() => {
  httpClient.get("/account").then((res) => {
    userData.value = res.data.data;
  });
});

const user = computed(() => {
  return userData.value || {};
});

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped></style>
