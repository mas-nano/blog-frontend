<template>
  <table
    class="border-collapse border-2 border-slate-300 bg-white"
    :class="width"
  >
    <thead>
      <tr>
        <th
          v-for="th in tableHeader"
          :key="th"
          class="border-2 border-slate-300"
        >
          <div class="flex justify-between items-center px-3 py-2">
            <span>{{ th.text }}</span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody class="">
      <tr v-for="td in tableData" :key="td.id">
        <td class="px-3 py-2 border-2 border-slate-300">{{ td.name }}</td>
        <td class="px-3 py-2 border-2 border-slate-300 text-center">
          <button
            class="mr-2 py-1 px-2 rounded bg-yellow-500"
            @click="$emit('edit', td)"
          >
            <EditIcon />
          </button>
          <button
            class="py-1 px-2 rounded bg-red-500 text-gray-200"
            @click="$emit('delete', td)"
          >
            <DeleteIcon />
          </button>
        </td>
      </tr>
      <tr v-if="tableData.length == 0">
        <td colspan="2" class="px-3 py-2 border-2 border-slate-300 text-center">
          Data tidak ada
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed } from "vue";
import DeleteIcon from "./icons/DeleteIcon.vue";
import EditIcon from "./icons/EditIcon.vue";

const props = defineProps({
  columns: Array,
  data: Array,
  width: String,
});

const emits = defineEmits(["edit", "delete"]);

const tableHeader = computed(() => {
  return props.columns || [];
});

const tableData = computed(() => {
  return props.data || [];
});

const width = computed(() => {
  return props.width || "w-full";
});
</script>
