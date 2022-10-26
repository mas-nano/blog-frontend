<template>
  <Header title="Posts" />
  <div class="px-8 pb-8">
    <div class="grid grid-cols-1 lg:flex justify-between items-center mb-8">
      <form
        method="post"
        class="flex mb-3 lg:mb-0"
        @submit.prevent="handleSearch"
      >
        <input
          type="text"
          name="search"
          id="search"
          class="px-4 py-2 w-full"
          placeholder="Cari post..."
          v-model="search"
        />
        <button class="px-4 py-2 bg-[#3751FF] text-white" type="submit">
          <SearchIcon />
        </button>
      </form>
      <div class="mb-3 flex justify-between">
        <button
          class="bg-[#3751FF] py-2 px-4 text-white rounded mr-[22px]"
          @click="showModal = !showModal"
        >
          Kelola Gambar
        </button>
        <RouterLink
          class="bg-[#3751FF] py-2 px-4 text-white rounded text-lg"
          :to="{ name: 'admin.post.create' }"
        >
          Tambah post
        </RouterLink>
      </div>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 transition-all ease-in-out duration-200 gap-3"
    >
      <div
        class="p-3 bg-white shadow-md rounded-lg flex flex-col"
        v-for="post in postsData"
        :key="post.id"
      >
        <div class="flex-1">
          <img
            :src="post.thumbnail_photo"
            alt=""
            class="object-cover object-center h-64 w-full"
          />
          <a
            :href="`http://localhost:8000/${post.slug}`"
            class="text-lg font-semibold"
            target="_blank"
            rel="noreferrer noopener"
            >{{ post.title }}</a
          >
          <p class="text-sm text-slate-500">{{ post.category.name }}</p>
        </div>
        <div class="flex justify-end">
          <div class="flex">
            <RouterLink
              class="mr-2 py-1 px-2 rounded bg-yellow-500"
              :to="{ name: 'admin.post.update', params: { uuid: post.uuid } }"
            >
              <EditIcon />
            </RouterLink>
            <button
              class="py-1 px-2 rounded bg-red-500 text-gray-200"
              @click="deletePost(post)"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Transition name="fade" appear>
    <div
      class="content-[''] fixed top-0 left-0 right-0 bottom-0 bg-black z-[16] opacity-50"
      v-if="showModal"
    ></div>
  </Transition>
  <Transition name="pop" appear>
    <ModalPictures v-if="showModal" @close-modal="showModal = !showModal" />
  </Transition>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import httpClient from "../../axios";
import Header from "../../components/Header.vue";
import DeleteIcon from "../../components/icons/DeleteIcon.vue";
import EditIcon from "../../components/icons/EditIcon.vue";
import SearchIcon from "../../components/icons/SearchIcon.vue";
import ModalPictures from "../../components/ModalPictures.vue";

const posts = ref([]);
const search = ref("");
const showModal = ref(false);
const page = ref(0);
const lastPage = ref(0);

onMounted(() => {
  getPost();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const postsData = computed(() => {
  return posts.value || [];
});

function getPost() {
  httpClient
    .get(`/post?page=${page.value + 1}&search=${search.value}`)
    .then((res) => {
      let newArray = [...posts.value, ...res.data.data.data];
      posts.value = newArray;
      page.value = res.data.data.current_page;
      lastPage.value = res.data.data.last_page;
    })
    .catch((err) => {
      console.log(err);
    });
}

function deletePost(post) {
  if (confirm(`Apakah anda yakin menghapus post ini (${post.title})?`)) {
    httpClient.delete(`/post/${post.uuid}`).then((res) => {
      getPost();
    });
  }
}

function handleScroll(e) {
  if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.scrollHeight
  ) {
    if (lastPage.value != page.value) {
      // page.value = page.value + 1;
      getPost();
    }
  }
}

function handleSearch() {
  page.value = 0;
  posts.value = [];
  getPost();
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
