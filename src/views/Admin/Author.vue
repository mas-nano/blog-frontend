<template>
  <Header title="Author" />
  <div class="px-8 w-full">
    <div class="flex justify-between items-center flex-wrap">
      <div class="flex mb-3 w-full lg:max-w-max">
        <input
          type="text"
          name="search"
          id="search"
          class="px-4 py-2 w-full lg:min-w-min"
          placeholder="Cari author..."
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
        Add Author
      </button>
    </div>
    <table class="border-collapse border-2 border-slate-300 bg-white w-full">
      <thead>
        <tr>
          <th class="border-2 border-slate-300">Foto</th>
          <th class="border-2 border-slate-300">Nama</th>
          <th class="border-2 border-slate-300">Email</th>
          <th class="border-2 border-slate-300">Aksi</th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="td in usersData" :key="td.id">
          <td class="px-3 py-2 border-slate-300 border flex justify-center">
            <img
              :src="
                td.profile.photo != 'default'
                  ? td.profile.photo
                  : 'https://picsum.photos/200'
              "
              alt=""
              class="h-20 w-h-20 object-cover object-center"
            />
          </td>
          <td class="px-3 py-2 border-2 border-slate-300">{{ td.name }}</td>
          <td class="px-3 py-2 border-2 border-slate-300">{{ td.email }}</td>
          <td class="px-3 py-2 border-2 border-slate-300 text-center">
            <button
              class="mr-2 py-1 px-2 rounded bg-yellow-500"
              @click="editAuthor(td)"
            >
              <EditIcon />
            </button>
            <button
              class="py-1 px-2 rounded bg-red-500 text-gray-200"
              @click="deleteAuthor(td)"
            >
              <DeleteIcon />
            </button>
          </td>
        </tr>
        <tr v-if="usersData.length == 0">
          <td
            colspan="4"
            class="px-3 py-2 border-2 border-slate-300 text-center"
          >
            Data tidak ada
          </td>
        </tr>
      </tbody>
    </table>
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
        <p class="font-bold">Add Author</p>
        <button class="h-6 w-6" @click="closeModal">
          <CloseIcon />
        </button>
      </div>
      <form action="post" @submit.prevent="createOrUpdateAuthor">
        <label for="name" class="mb-3 block">Author</label>
        <input
          type="text"
          name="name"
          id="name"
          class="rounded-lg mb-3 border-[#F0F1F7] border-2 py-4 px-3 w-full block"
          placeholder="Nama..."
          v-model="name"
        />
        <span class="text-red-500 text-sm" v-if="errorName">{{
          errorName[0]
        }}</span>
        <label for="email" class="mb-3 block">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          class="rounded-lg mb-3 border-[#F0F1F7] border-2 py-4 px-3 w-full block"
          placeholder="Email..."
          v-model="email"
        />
        <span class="text-red-500 text-sm" v-if="errorEmail">{{
          errorEmail[0]
        }}</span>
        <label for="password" class="mb-3 block">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="rounded-lg mb-3 border-[#F0F1F7] border-2 py-4 px-3 w-full block"
          placeholder="Password..."
          v-model="password"
        />
        <span class="text-red-500 text-sm" v-if="errorPassword">{{
          errorPassword[0]
        }}</span>
        <label for="passwordConfirmation" class="mb-3 block"
          >Konfirmasi Password</label
        >
        <input
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          class="rounded-lg mb-3 border-[#F0F1F7] border-2 py-4 px-3 w-full block"
          placeholder="Konfirmasi Password..."
          v-model="passwordConfirmation"
        />
        <span class="text-red-500 text-sm" v-if="errorPasswordConfirmation">{{
          errorPasswordConfirmation[0]
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
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import httpClient from "../../axios";
import Header from "../../components/Header.vue";
import CloseIcon from "../../components/icons/CloseIcon.vue";
import DeleteIcon from "../../components/icons/DeleteIcon.vue";
import EditIcon from "../../components/icons/EditIcon.vue";
import SearchIcon from "../../components/icons/SearchIcon.vue";
const showModal = ref(false);
const users = ref([]);
const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const errorName = ref("");
const errorEmail = ref("");
const errorPassword = ref("");
const errorPasswordConfirmation = ref("");
const search = ref("");
const edit = ref({});
const store = useStore();
const isEdit = ref(false);

onMounted(() => {
  getAuthor();
});

function getAuthor() {
  httpClient
    .get(`/user`)
    .then((res) => {
      users.value = res.data.data.data;
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

function createOrUpdateAuthor() {
  if (isEdit.value) {
    console.log("upd");
    updateAuthor();
  } else {
    createAuthor();
  }
}

function createAuthor() {
  httpClient
    .post("/user/register", {
      id: edit.value?.id,
      name: name.value,
      email: email.value,
      password: password?.value,
      password_confirmation: passwordConfirmation?.value,
    })
    .then((res) => {
      store.commit("changeNotificationState", {
        ...store.state.notification,
        show: true,
        msg: "Data berhasil ditambah",
        status: "success",
      });
      setTimeout(() => {
        store.commit("changeNotificationState", {
          ...store.state.notification,
          show: false,
        });
      }, 4000);
      getAuthor();
      closeModal();
    })
    .catch((err) => {
      if (err.response.status == 422) {
        errorName.value = err.response.data.message.name;
        errorEmail.value = err.response.data.message.email;
        errorPassword.value = err.response.data.message.password;
        errorPasswordConfirmation.value =
          err.response.data.message.password_confirmation;
      }
    });
}

function updateAuthor() {
  httpClient
    .post(`/user/update/${edit.value?.id}`, {
      name: name.value,
      email: email.value,
      password: password?.value,
      password_confirmation: passwordConfirmation?.value,
    })
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
      getAuthor();
      closeModal();
    })
    .catch((err) => {
      if (err.response.status == 422) {
        errorName.value = err.response.data.message.name;
        errorEmail.value = err.response.data.message.email;
        errorPassword.value = err.response.data.message.password;
        errorPasswordConfirmation.value =
          err.response.data.message.password_confirmation;
      }
    });
}

const usersData = computed(() => {
  return users.value || [];
});

function closeModal() {
  showModal.value = false;
  name.value = "";
  email.value = "";
  password.value = "";
  passwordConfirmation.value = "";
  errorName.value = "";
  errorEmail.value = "";
  errorPassword.value = "";
  errorPasswordConfirmation.value = "";
  edit.value = {};
  isEdit.value = false;
}

function changePage(page) {
  getAuthor(page);
}

function getSearch() {
  getAuthor(1);
}

function editAuthor(td) {
  edit.value = td;
  name.value = td.name;
  email.value = td.email;
  showModal.value = !showModal.value;
  isEdit.value = true;
}

function deleteAuthor(td) {
  if (confirm(`Yakin untuk menghapus user (${td.name})?`)) {
    httpClient
      .delete(`/user/delete/${td.id}`)
      .then((res) => {
        getAuthor();
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
        // console.log(err);
      });
  }
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
