<template>
  <Header title="Tambah Post" />
  <div class="px-8 pb-8 container">
    <form
      method="post"
      action=""
      @submit.prevent="handleSubmit"
      enctype="multipart/form-data"
    >
      <h3 class="text-2xl font-semibold mb-3">Judul Post</h3>
      <div class="md:w-2/3 mb-3 w-full">
        <input
          type="text"
          name="title"
          id="title"
          class="px-4 py-2 rounded w-full"
          v-model="title"
        />
        <span v-if="errors.title" class="block text-red-500 text-sm">{{
          errors.title[0]
        }}</span>
      </div>
      <h3 class="text-2xl font-semibold mb-3">Thumbnail</h3>
      <div class="md:w-2/3 mb-3 w-full">
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          class="mb-3"
          @change="onFileChange"
        />
        <span
          v-if="errors.thumbnail_photo"
          class="block text-red-500 text-sm"
          >{{ errors.thumbnail_photo[0] }}</span
        >
      </div>
      <img :src="url" v-if="url" alt="" class="max-w-2/3 rounded-lg mb-3" />
      <h3 class="text-2xl font-semibold mb-3">Kategori</h3>
      <div class="md:w-2/3 mb-3 w-full">
        <select
          name="category"
          id="category"
          class="w-full rounded bg-white px-4 py-2"
          @change="onCategoryChange"
        >
          <option value="">-- Pilih Kategori --</option>
          <option
            :value="category.id"
            v-for="category in categoriesName"
            :key="category.id"
            :selected="category.id == category_id ? 'true' : null"
          >
            {{ category.name }}
          </option>
        </select>
        <span v-if="errors.category_id" class="block text-red-500 text-sm">{{
          errors.category_id[0]
        }}</span>
      </div>
      <h3 class="text-2xl font-semibold mb-3">Paragraf Pertama</h3>
      <div class="md:w-2/3 mb-3 w-full">
        <textarea
          name="firstParagraph"
          id="firstParagraph"
          rows="5"
          class="px-4 py-2 rounded w-full"
          v-model="firstParagraph"
        ></textarea>
        <span
          v-if="errors.first_paragraph"
          class="block text-red-500 text-sm"
          >{{ errors.first_paragraph[0] }}</span
        >
      </div>
      <div class="mb-3">
        <h3 class="text-2xl font-semibold">Isi Post</h3>
        <span v-if="errors.body" class="block text-red-500 text-sm">{{
          errors.body[0]
        }}</span>
      </div>
      <div class="prose lg:prose-xl w-full mb-3">
        <ckeditor
          :editor="editor"
          v-model="ckeditorData"
          :config="editorConfig"
        />
      </div>
      <button
        type="submit"
        class="bg-[#3751FF] py-2 px-4 text-white mb-3 rounded"
      >
        Simpan
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import httpClient from "../../axios";
import Header from "../../components/Header.vue";

const router = useRouter();
const route = useRoute();
const editor = ClassicEditor;
const categories = ref([]);
const ckeditorData = ref("");
const url = ref("");
const thumbnail = ref("");
const title = ref("");
const category_id = ref("");
const firstParagraph = ref("");
const errorData = ref({});

function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const body = new FormData();
        loader.file.then((file) => {
          body.append("upload", file);
          httpClient
            .post("/post/image", body)
            .then((res) => {
              console.log(res.data.url);
              resolve({
                default: res.data.url,
              });
            })
            .catch((err) => {
              reject({
                error: res.data.error.message,
              });
            });
        });
      });
    },
  };
}

function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

const editorConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "strikethrough",
      "subscript",
      "superscript",
      "underline",
      "link",
      "|",
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "fontFamily",
      "alignment",
      "|",
      "bulletedList",
      "numberedList",
      "-",
      "outdent",
      "indent",
      "|",
      "imageUpload",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
      "code",
      "codeBlock",
      "highlight",
    ],
    shouldNotGroupWhenFull: true,
  },
  language: "en",
  image: {
    toolbar: [
      "imageTextAlternative",
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
      "linkImage",
    ],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  extraPlugins: [uploadPlugin],
  mediaEmbed: {
    previewsInData: false,
    providers: [
      {
        // hint: this is just for previews. Get actual HTML codes by making API calls from your CMS
        name: "iframely previews",

        // Match all URLs or just the ones you need:
        url: /.+/,

        html: (match) => {
          const url = match[0];

          var iframeUrl =
            import.meta.env.VITE_IFRAME_SRC +
            "?app=1&api_key=" +
            import.meta.env.VITE_API_IFRAMELY_KEY +
            "&url=" +
            encodeURIComponent(url);
          // alternatively, use &key= instead of &api_key with the MD5 hash of your api_key
          // more about it: https://iframely.com/docs/allow-origins
          console.log(iframeUrl);
          return (
            // If you need, set maxwidth and other styles for 'iframely-embed' class - it's yours to customize
            '<div class="iframely-embed">' +
            '<div class="iframely-responsive">' +
            `<iframe src="${iframeUrl}" ` +
            'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
            "</iframe>" +
            "</div>" +
            "</div>"
          );
        },
      },
    ],
  },
};

onMounted(() => {
  httpClient
    .get("/category")
    .then((res) => {
      categories.value = res.data.data.data;
    })
    .catch((err) => {
      console.log(err);
    });

  if (route.params?.uuid) {
    httpClient
      .get(`post/${route.params.uuid}`)
      .then((res) => {
        ckeditorData.value = res.data.data.body;
        title.value = res.data.data.title;
        category_id.value = res.data.data.category.id;
        url.value = res.data.data.thumbnail_photo;
        firstParagraph.value = res.data.data.first_paragraph;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

const categoriesName = computed(() => {
  return categories.value || [];
});

const errors = computed(() => {
  return errorData.value || {};
});

function onFileChange(e) {
  const file = e.target.files[0];
  thumbnail.value = e.target.files[0];
  url.value = URL.createObjectURL(file);
}

function onCategoryChange(e) {
  category_id.value = e.target.value;
}

function handleSubmit() {
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("thumbnail_photo", thumbnail.value);
  formData.append("body", ckeditorData.value);
  formData.append("category_id", category_id.value);
  formData.append("first_paragraph", firstParagraph.value);
  if (route.params?.uuid) {
    httpClient
      .post(`/post/${route.params.uuid}`, formData)
      .then((res) => {
        router.push({ name: "admin.post" });
      })
      .catch((err) => {
        errorData.value = err.response.data.message;
        console.log("gagal");
      });
  } else {
    httpClient
      .post("/post", formData)
      .then((res) => {
        router.push({ name: "admin.post" });
      })
      .catch((err) => {
        errorData.value = err.response.data.message;
        console.log("gagal");
      });
  }
}
</script>
