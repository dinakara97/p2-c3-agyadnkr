<template>
  <div
    class="mt-12 mb-8 w-full min-h-screen grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 vsm:grid-cols-1 gap-y-8 lg:gap-x-4 md:gap-x-2 sm:gap-x-2 gap-x-2"
  >
    <MovieCard
      v-for="movie in movies" :key="movie.id"
      :movie="movie"
    ></MovieCard>
  </div>
</template>

<script>
import MovieCard from '../organisms/MovieCard.vue'
export default {
  name: "MovieList",
  components: {
    MovieCard
  },
  props: ["movies"]
};
</script>

<style></style>
