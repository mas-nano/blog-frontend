<template>
  <Header title="Overview" />
  <div class="w-full px-8">
    <div class="grid justify-between grid-cols-2 gap-3 md:grid-cols-4">
      <div class="w-full md:text-3xl text-xl p-4 bg-white rounded-lg shadow-lg">
        <h3>Posts</h3>
        <span class="font-semibold">30</span>
      </div>
      <div class="w-full md:text-3xl text-xl p-4 bg-white rounded-lg shadow-lg">
        <h3>Author</h3>
        <span class="font-semibold">30</span>
      </div>
      <div class="w-full md:text-3xl text-xl p-4 bg-white rounded-lg shadow-lg">
        <h3>Category</h3>
        <span class="font-semibold">30</span>
      </div>
      <div class="w-full md:text-3xl text-xl p-4 bg-white rounded-lg shadow-lg">
        <h3>Views</h3>
        <span class="font-semibold">30</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../../components/Header.vue";
</script>
