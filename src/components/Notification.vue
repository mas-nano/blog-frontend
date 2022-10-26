<script setup>
import FailIcon from "./icons/FailIcon.vue";
import SuccessIcon from "./icons/SuccessIcon.vue";
</script>
<template>
  <div
    class="fixed right-0 top-0 py-5 px-4 bg-white rounded-lg translate-y-2 translate-x-full transition ease-in-out duration-200 shadow-lg z-50"
    :class="{ ' -translate-x-1': $store.state.notification.show }"
  >
    <div class="flex gap-3 items-center">
      <SuccessIcon v-if="$store.state.notification.status == 'success'" />
      <FailIcon v-if="$store.state.notification.status == 'fail'" />
      <div class="flex flex-col">
        <span class="text-lg font-semibold">{{
          $store.state.notification.msg
        }}</span>
        <span class="text-xs">{{ $store.state.notification.body }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
