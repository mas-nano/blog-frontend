<template>
  <Header title="Category" />
  <div class="px-8 w-full lg:w-2/3">
    <div class="flex justify-between items-center flex-wrap">
      <div class="flex mb-3 w-full lg:max-w-max">
        <input
          type="text"
          name="search"
          id="search"
          class="px-4 py-2 w-full lg:min-w-min"
          placeholder="Cari kategori..."
          v-model="search"
        />
        <button class="px-4 py-2 bg-[#3751FF] text-white" @click="getSearch">
          <SearchIcon />
        </button>
      </div>
      <button
        type="button"
        class="bg-[#3751FF] py-2 px-4 text-white mb-3 rounded"
        @click="showModal = !showModal"
      >
        Add Category
      </button>
    </div>
    <TableData
      :columns="columns"
      :data="categories.data"
      @edit="editCategory"
      @delete="deleteCategory"
    />
    <div
      class="flex justify-between items-center my-3 flex-wrap md:flex-nowrap"
    >
      <span class="w-full lg:max-w-max now"
        >Show {{ categories.from }} to {{ categories.to }} of
        {{ categories.total }} entries</span
      >
      <Pagination :pagination="categories" @change-page="changePage" />
    </div>
  </div>
  <Transition name="fade" appear>
    <div
      class="content-[''] fixed top-0 left-0 right-0 bottom-0 bg-black z-[18] opacity-50"
      v-if="showModal"
    ></div>
  </Transition>
  <Transition name="pop" appear>
    <div
      class="px-8 py-4 rounded-lg bg-white shadow-lg max-w-fit h-fit z-[19] fixed top-0 left-0 right-0 bottom-0 m-auto transition-none"
      v-if="showModal"
    >
      <div class="flex justify-between mb-3 items-center">
        <p class="font-bold">Add Category</p>
        <button class="h-6 w-6" @click="closeModal">
          <CloseIcon />
        </button>
      </div>
      <form action="post" @submit.prevent="createOrUpdateCategory">
        <label for="category" class="mb-3 block">Category</label>
        <input
          type="text"
          name="category"
          id="category"
          class="rounded-lg border-[#F0F1F7] border-2 py-4 px-3 w-full block"
          placeholder="Category..."
          v-model="category"
        />
        <span class="text-red-500 text-sm" v-if="errorCategory">{{
          errorCategory[0]
        }}</span>
        <div class="flex justify-end mt-3">
          <button
            type="submit"
            class="py-2 px-4 bg-[#3751FF] rounded-lg text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import httpClient from "../../axios";
import Header from "../../components/Header.vue";
import CloseIcon from "../../components/icons/CloseIcon.vue";
import SearchIcon from "../../components/icons/SearchIcon.vue";
import Pagination from "../../components/Pagination.vue";
import TableData from "../../components/TableData.vue";
const showModal = ref(false);
const categories = ref([]);
const category = ref("");
const errorCategory = ref("");
const search = ref("");
const edit = ref({});
const store = useStore();

const columns = [
  { name: "category", text: "Category" },
  { name: "aksi", text: "Aksi" },
];

onMounted(() => {
  getCategory();
});

function getCategory(page = null) {
  httpClient
    .get(
      `/category${page != null ? "?page=" + page : ""}${
        search.value != "" ? "&search=" + search.value : ""
      }`
    )
    .then((res) => {
      categories.value = res.data.data;
    })
    .catch(() => {
      store.commit("changeNotificationState", {
        ...store.state.notification,
        show: true,
        msg: "Data gagal diambil",
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

function createOrUpdateCategory() {
  httpClient
    .post("/category", {
      id: edit.value?.id,
      name: category.value,
    })
    .then((res) => {
      store.commit("changeNotificationState", {
        ...store.state.notification,
        show: true,
        msg: "Data berhasil ditambah atau diubah",
        status: "success",
      });
      setTimeout(() => {
        store.commit("changeNotificationState", {
          ...store.state.notification,
          show: false,
        });
      }, 4000);
      getCategory();
      closeModal();
    })
    .catch((err) => {
      errorCategory.value = err.response.data.message.name;
    });
}

function closeModal() {
  showModal.value = false;
  category.value = "";
  errorCategory.value = "";
  edit.value = {};
}

function changePage(page) {
  getCategory(page);
}

function getSearch() {
  getCategory(1);
}

function editCategory(td) {
  edit.value = td;
  category.value = td.name;
  showModal.value = !showModal.value;
}

function deleteCategory(td) {
  httpClient
    .delete(`/category/${td.id}`)
    .then((res) => {
      getCategory();
      store.commit("changeNotificationState", {
        ...store.state.notification,
        show: true,
        msg: "Data berhasil dihapus",
        status: "success",
      });
      setTimeout(() => {
        store.commit("changeNotificationState", {
          ...store.state.notification,
          show: false,
        });
      }, 4000);
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(50%);
}
</style>
