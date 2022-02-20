<template>
  <div class="h-12 w-full flex flex-row justify-center gap-x-2 mb-4">
    <button
      class="h-12 w-12 rounded-lg bg-blue-600 flex justify-center items-center"
      @click.prevent="toFirst"
    >
      <i class="fa-solid fa-angles-left -mt-4"></i>
    </button>
    <button
      class="h-12 w-12 rounded-lg bg-blue-600 flex justify-center items-center"
      @click.prevent="previous"
    >
      <i class="fa-solid fa-angle-left -mt-4"></i>
    </button>
    <div
      class="h-12 px-4 rounded-lg bg-blue-600 flex justify-center items-center text-white"
    >
      {{ page }}
    </div>
    <button
      class="h-12 w-12 rounded-lg bg-blue-600 flex justify-center items-center"
      @click.prevent="next"
    >
      <i class="fa-solid fa-angle-right -mt-4"></i>
    </button>
    <button
      class="h-12 w-12 rounded-lg bg-blue-600 flex justify-center items-center"
      @click.prevent="toLast"
    >
      <i class="fa-solid fa-angles-right -mt-4"></i>
    </button>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
  name: "Pagination",
  methods: {
    ...mapMutations(["TO_LASTPAGE", "TO_FIRSTPAGE", "NEXT_PAGE", "PREVIOUS_PAGE"]),
    ...mapActions(["fetchAllMovies"]),
    toFirst() {
      this.TO_FIRSTPAGE();
      this.fetchAllMovies();
    },
    next() {
      this.NEXT_PAGE();
      this.fetchAllMovies();
    },
    previous() {
      this.PREVIOUS_PAGE();
      this.fetchAllMovies();
    },
    toLast() {
      this.TO_LASTPAGE();
      this.fetchAllMovies();
    },
  },
  computed: {
    ...mapState(["pageNumber", "maxPageNumber"]),
    page() {
      return `${this.pageNumber} of ${this.maxPageNumber}`
    }
  }
};
</script>

<style></style>
