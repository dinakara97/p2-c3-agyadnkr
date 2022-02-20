<template>
  <div class="w-20/24">
    <div class="mx-10 flex flex-col">
      <div class="mt-8 text-white text-3xl font-medium text-left">
        My Bookmark
      </div>

      <Detail v-if="seeDetail"></Detail>

      <!-- MOVIE CARDS -->
      <MovieList :movies="bookmarkList"></MovieList>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import MovieList from "../components/movieLists/templates/MovieList.vue"
import Detail from '../views/Detail.vue';
export default {
  name: "Bookmark",
  components: {
    MovieList,
    Detail
  },
  methods: {
    ...mapActions(["fetchAllBookmarks"]),

  },
  computed: {
    ...mapState(["bookmarkList", "seeDetail"])
  },
  created() {
    this.fetchAllBookmarks();
  }
};
</script>

<style></style>
