<template>
  <div
    class="fixed w-screen h-screen flex z-20 bg-[rgba(0,0,0,0.4)] items-center justify-center"
    v-if="$store.state.showLoading"
  >
    <div
      class="w-10 h-10 border-8 border-x-[#3751FF] border-t-[#3751FF] border-b-transparent rounded-full animate-spin"
    ></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
