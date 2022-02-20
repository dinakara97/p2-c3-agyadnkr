<template>
  <div
    class="mt-4 w-full h-100 bg-gradient-to-r from-stone-900 via-stone-900 to-transparent flex flex-row justify-between"
  >
    <div
      class="h-full w-5/12 flex flex-col justify-start text-left px-8 py-8 text-white gap-y-2"
    >
      <p class="font-bold font-sans text-5xl">{{ detail.title }}</p>
      <p class="font-medium font-sans text-xl text-slate-300">
        {{ detail.Genre.name }}
      </p>
      <p>
        {{ detail.synopsis }}
      </p>
      <div class="flex flex-row gap-x-8">
        <div class="h-16 flex flex-row items-center">
          <button
            class="px-8 py-2 rounded-lg bg-blue-500"
            @click.prevent="bookmarkButton"
            v-if="isLogged"
          >
            Add to bookmark
          </button>
        </div>
        <div class="h-16 flex flex-row items-center">
          <button
            class="px-8 py-2 rounded-lg bg-blue-500"
            @click.prevent="seeMoreDetail"
          >
            see More Detail
          </button>
        </div>
      </div>
    </div>
    <div class="h-44 w-40 flex flex-col justify-center items-center">
      <a
        :href="detail.trailerUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-white py-2"
        >See trailer here</a
      >
      <img :src="qrImage" alt="QR Code" class="object-contain h-36 w-36" />
    </div>
    <div class="flex flex-row w-1/3">
      <img
        :src="detail.imgUrl"
        :alt="detail.title"
        class="object-cover w-full -mr-12 z-0"
      />
      <button
        class="relative z-40 mr-16 mt-4 self-start py-2 px-3 bg-black rounded-lg opacity-80"
        @click.prevent="closeDetail"
      >
        <i class="fa-solid fa-xmark fa-xl"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { qr } from "../apis/index";
export default {
  name: "Detail",
  data() {
    return {
      qrUrl: "",
    };
  },
  methods: {
    ...mapMutations(["SEE_DETAIL"]),
    ...mapActions(["addToBookmark"]),
    seeMoreDetail() {
      this.$router.push(`movies/${this.detail.id}`)
    },
    closeDetail() {
      this.SEE_DETAIL(false);
    },
    bookmarkButton() {
      this.addToBookmark(this.detail.id);
    },
    async fetchQrUrl() {
      try {
        const apiKey =
          "a18271sX6eLZmJWixoEUS1bK5q9ZEl4zmx7yi5SguXkqe3q3mfb3GkF0";
        const response = await qr.get("/", {
          params: {
            apikey: apiKey,
            data: this.detail.trailerUrl,
          },
        });
        this.qrUrl = response.data.qrcode;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },
  computed: {
    ...mapState({
      detail: "movieDetail",
      isLogged: "isLogged",
    }),
    qrImage() {
      return this.qrUrl;
    },
  },
  created() {
    this.fetchQrUrl();
  },
  updated() {
    this.fetchQrUrl();
  },
};
</script>

<style></style>
