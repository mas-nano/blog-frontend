<template>
  <div class="flex">
    <button
      class="p-3 border border-slate-300 bg-white text-xs"
      @click="$emit('changePage', 1)"
      :disabled="props.pagination.current_page == 1"
    >
      First
    </button>
    <button
      class="p-3 border border-slate-300 bg-white text-xs"
      @click="$emit('changePage', props.pagination.current_page - 1)"
      :disabled="props.pagination.current_page == 1"
    >
      Prev
    </button>
    <button
      v-for="page in pageNumber"
      class="p-3 border border-slate-30 bg-white text-xs"
      :class="{
        ' bg-[#3751FF] text-white': page === props.pagination.current_page,
      }"
      :key="page"
      @click="$emit('changePage', page)"
    >
      {{ page }}
    </button>
    <button
      class="p-3 border border-slate-300 bg-white text-xs"
      @click="$emit('changePage', props.pagination.current_page + 1)"
      :disabled="props.pagination.current_page == props.pagination.last_page"
    >
      Next
    </button>
    <button
      class="p-3 border border-slate-300 bg-white text-xs"
      @click="$emit('changePage', props.pagination.last_page)"
      :disabled="props.pagination.current_page == props.pagination.last_page"
    >
      Last
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
const offset = 2;
const props = defineProps({
  pagination: Object,
});

const emit = defineEmits(["changePage"]);

const pageNumber = computed(() => {
  const { to, current_page, last_page } = props.pagination;
  let pages = [];

  if (!to) return [];
  let fromPage = current_page - offset;
  if (fromPage < 1) fromPage = 1;
  let toPage = fromPage + offset * 2;
  if (toPage >= last_page) toPage = last_page;
  for (let pageNumber = fromPage; pageNumber <= toPage; pageNumber++) {
    pages.push(pageNumber);
  }
  return pages;
});
</script>
