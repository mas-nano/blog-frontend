<template>
  <div
    class="fixed w-screen h-screen flex justify-center items-center z-[17] top-0 left-0 bottom-0 right-0"
  >
    <div class="p-3 rounded-lg bg-white h-3/4 w-3/4 flex flex-col">
      <div class="flex justify-between items-center mb-3">
        <h3>Kelola Gambar</h3>
        <button @click="$emit('closeModal')">
          <CloseIcon />
        </button>
      </div>
      <div class="h-full overflow-y-auto">
        <div class="grid md:grid-cols-5 grid-cols-1 gap-3 items-center">
          <div class="relative group" v-for="photo in photoData">
            <img :src="photo.path" alt="" class="object-cover object-center" />
            <div
              class="w-full h-full bg-[rgba(0,0,0,0.5)] absolute top-0 flex justify-center items-center group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-100"
            >
              <button
                class="text-white border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black"
                @click="deletePhoto(photo)"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import httpClient from "../axios";
import CloseIcon from "./icons/CloseIcon.vue";

const emit = defineEmits(["closeModal"]);
const photos = ref([]);

onMounted(() => {
  getPhotos();
});

const photoData = computed(() => {
  return photos.value || [];
});

function deletePhoto(photo) {
  httpClient
    .post(`photo/${photo.id}`)
    .then((res) => {
      getPhotos();
    })
    .catch((err) => {
      console.log(err);
    });
}

function getPhotos() {
  httpClient
    .get("/photo")
    .then((res) => {
      photos.value = res.data.data;
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>
