<template>
  <div class="w-20/24">
    <div class="mx-10 flex flex-col">
      <div class="mt-8 text-white text-3xl font-medium text-left">
        Movie Lists
      </div>
      <!-- DETAIL PAGE -->
      <Detail
        v-if="seeDetail"
      ></Detail>

      <!-- FILTER BAR -->
     <Filterbar></Filterbar>

      <!-- MOVIE CARDS -->
      <MovieList
        :movies="movies"
      ></MovieList>
    </div>
    <Pagination></Pagination>
  </div>
</template>

<script>
import MovieList from '../components/movieLists/templates/MovieList.vue'
import Filterbar from '../components/movieLists/templates/Filterbar.vue'
import Pagination from '../components/movieLists/organisms/Pagination.vue'
import Detail from '../views/Detail.vue'

import { mapActions, mapState } from 'vuex'

export default {
  name: "Home",
  components: {
    MovieList,
    Filterbar,
    Pagination,
    Detail
  },
  methods: {
    ...mapActions(["fetchAllMovies"])
  },
  computed: {
    ...mapState({
      movies: "movieList",
      seeDetail: "seeDetail"
    })
  },
  created() {
    this.fetchAllMovies();
  }
};
</script>
