<template>
  <div class="w-20/24 min-h-screen">
    <div class="mt-16 mx-8 flex flex-row">
      <div class="w-1/3">
        <img
          :src="detail.imgUrl"
          :alt="detail.title"
          class="object-contain w-full"
        />
      </div>
      <div class="w-1/2 flex flex-col text-left pl-12 pt-8 text-white text-xl">
        <p class="py-4 font-bold font-sans text-4xl">Title</p>
        <p class="pl-8">{{ detail.title }}</p>
        <p class="pb-4 pt-8 font-bold font-sans text-4xl">Genre</p>
        <p class="pl-8">{{ detail.Genre.name }}</p>
        <p class="pb-4 pt-8 font-bold font-sans text-4xl">Rating</p>
        <p class="pl-8">{{ detail.rating }}/10 Stars</p>
        <p class="pb-4 pt-8 font-bold font-sans text-4xl">Synopsis</p>
        <p class="pl-8">{{ detail.synopsis }}</p>
        <div class="flex flex-row pt-8 gap-x-8">
          <button class="px-8 py-2 rounded-lg bg-blue-500"
          v-if="isLogged"
          @click.prevent="bookmarkButton"
          >
            Add to bookmark
          </button>
          <a
            class="px-8 py-2 rounded-lg bg-blue-500"
            :href="detail.trailerUrl"
            target="_blank"
            rel="noopener noreferrer"
            >Watch Trailer</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "MoreDetail",
  methods: {
    ...mapActions(["fetchMovieDetail", "addToBookmark"]),
    bookmarkButton() {
      this.addToBookmark(this.detail.id);
    }
  },
  computed: {
    ...mapState({
      detail: "movieDetail",
      isLogged: "isLogged"
    }),
  },
  created() {
    const id = this.$route.params.id;
    this.fetchMovieDetail(id);
  },
};
</script>

<style></style>
