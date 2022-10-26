<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import httpClient from "../../axios";
import store from "../../store";
const email = ref("");
const password = ref("");
const router = useRouter();

function handleSubmit() {
  httpClient
    .post("/login", { email: email.value, password: password.value })
    .then((res) => {
      localStorage.setItem("AUTH_TOKEN", res.data.data.token);
      store.commit("login", res.data);
      router.push({ name: "admin.dashboard" });
    })
    .catch((err) => {
      store.commit("changeNotificationState", {
        ...store.state.notification,
        show: true,
        msg: "Login gagal!",
        status: "fail",
      });
      setTimeout(() => {
        store.commit("changeNotificationState", {
          ...store.state.notification,
          show: false,
        });
      }, 4000);
    });
}
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center bg-[#363740]">
    <div class="bg-white px-8 py-10 flex flex-col items-center rounded-lg">
      <div class="flex flex-col gap-3 items-center mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-12 h-12"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>
        <h1 class="text-xl font-semibold text-[#A4A6B3]">Organtri Admin</h1>
      </div>
      <h3 class="font-bold text-2xl text-[#252733] mb-3 text-center">
        Login ke Dashboard Organtri
      </h3>
      <span class="font-normal text-sm text-[#9FA2B4] mb-12"
        >Masukkan email dan password Anda</span
      >
      <form action="post" @submit.prevent="handleSubmit" class="w-full">
        <div class="flex flex-col gap-1 w-full mb-6">
          <span class="font-bold text-xs text-[#9FA2B4]">Email</span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            class="rounded-lg border-[#F0F1F7] border-2 py-4 px-3"
            v-model="email"
          />
        </div>
        <div class="flex flex-col gap-1 w-full mb-6">
          <span class="font-bold text-xs text-[#9FA2B4]">Password</span>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            class="rounded-lg border-[#F0F1F7] border-2 py-4 px-3"
            v-model="password"
          />
        </div>
        <button
          class="py-4 w-full bg-[#3751FF] rounded-lg text-white"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
