<template>
  <Header title="User" />
  <div class="flex px-8 gap-3">
    <div class="w-72">
      <div class="flex flex-col items-center gap-3 rounded-lg bg-white p-8">
        <div class="relative group">
          <img
            src="https://picsum.photos/200"
            alt=""
            class="object-cover object-center w-24 h-24 rounded-full"
          />
        </div>
        <p class="text-center font-bold">{{ user?.name }}</p>
        <p class="text-center">{{ user?.email }}</p>
        <p class="text-center">
          {{
            user?.profile?.biodata == null
              ? "Belum mengisi biodata"
              : user?.profile?.biodata
          }}
        </p>
      </div>
    </div>
    <div class="flex-1 p-8 rounded-lg bg-white">
      <form action="" method="post" @submit.prevent="updateProfile">
        <div class="mb-3">
          <label for="nama" class="block mb-3">Nama</label>
          <input
            type="text"
            name="nama"
            id="nama"
            class="rounded-lg border-[#F0F1F7] border-2 py-4 px-3 w-full block"
            placeholder="Nama..."
            v-model="name"
          />
          <span class="text-red-500 text-sm" v-if="errorName">{{
            errorName[0]
          }}</span>
        </div>
        <div class="mb-3">
          <label for="email" class="block mb-3">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            class="rounded-lg border-[#F0F1F7] border-2 py-4 px-3 w-full block"
            placeholder="Email..."
            v-model="email"
          />
          <span class="text-red-500 text-sm" v-if="errorEmail">{{
            errorEmail[0]
          }}</span>
        </div>
        <div class="mb-3">
          <label for="biodata" class="block mb-3">Biodata</label>
          <textarea
            type="text"
            name="biodata"
            id="biodata"
            class="rounded-lg border-[#F0F1F7] border-2 py-4 px-3 w-full block"
            placeholder="Biodata..."
            v-model="biodata"
          ></textarea>
          <span class="text-red-500 text-sm" v-if="errorBiodata">{{
            errorBiodata[0]
          }}</span>
        </div>
        <div class="mb-3">
          <label for="password" class="block mb-3">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            class="rounded-lg border-[#F0F1F7] border-2 py-4 px-3 w-full block"
            placeholder="Password... (optional)"
            v-model="password"
          />
          <span class="text-red-500 text-sm" v-if="errorPassword">{{
            errorPassword[0]
          }}</span>
        </div>
        <div class="mb-3">
          <label for="password_confirmation" class="block mb-3"
            >Konfirmasi Password</label
          >
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            class="rounded-lg border-[#F0F1F7] border-2 py-4 px-3 w-full block"
            placeholder="Konfirmasi Password... (optional)"
            v-model="passwordConfirmation"
          />
          <span class="text-red-500 text-sm" v-if="errorPasswordConfirmation">{{
            errorPasswordConfirmation[0]
          }}</span>
        </div>
        <button class="bg-[#3751FF] py-2 px-4 text-white mb-3 rounded">
          Simpan
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import httpClient from "../../axios";
import Header from "../../components/Header.vue";

const store = useStore();
const userData = ref({});
const name = ref("");
const email = ref("");
const biodata = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const errorName = ref("");
const errorEmail = ref("");
const errorBiodata = ref("");
const errorPassword = ref("");
const errorPasswordConfirmation = ref("");
const id = ref("");
const photoButton = ref("");
const photo = ref("");

onMounted(() => {
  getAccount();
});

const user = computed(() => {
  return userData.value || {};
});

function getAccount() {
  httpClient.get("/account").then((res) => {
    userData.value = res.data.data;
    name.value = res.data.data.name;
    email.value = res.data.data.email;
    biodata.value = res.data.data.profile.biodata;
    id.value = res.data.data.id;
  });
}

function updateProfile() {
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("email", email.value);
  formData.append("biodata", biodata.value);
  formData.append("password", password.value);
  formData.append("password_confirmation", passwordConfirmation.value);
  console.log(formData);
  httpClient
    .post(`/user/update/${id.value}`, formData)
    .then((res) => {
      store.commit("changeNotificationState", {
        ...store.state.notification,
        show: true,
        msg: "Data berhasil diubah",
        status: "success",
      });
      setTimeout(() => {
        store.commit("changeNotificationState", {
          ...store.state.notification,
          show: false,
        });
      }, 4000);
      getAccount();
    })
    .catch((err) => {
      console.log(err);
    });
}

function changePhoto(e) {
  photo.value = e.target.files[0];
  updateProfile();
}
</script>
