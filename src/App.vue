<script setup>
import axios from "./axios";
import LoadingOverlay from "./components/LoadingOverlay.vue";
import Notification from "./components/Notification.vue";
import "./style.css";

setInterval(() => {
  if (localStorage.getItem("AUTH_TOKEN")) {
    axios.post("/refresh").then((res) => {
      localStorage.setItem("AUTH_TOKEN", res.data.data.token);
    });
  }
}, 3595000);
</script>

<template>
  <LoadingOverlay />
  <Notification />
  <RouterView />
</template>
