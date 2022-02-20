<template>
  <div class="mt-8 mb-4 h-12 flex flex-row justify-between">
    <div class="h-full w-18/24 flex flex-row gap-x-8">
      <select class="bg-sky-600 pl-4 w-1/4 rounded-lg text-white"
        v-model="sort"
        @change.prevent="filterMovies"
      >
        <option value="" class="bg-white text-black">Sort By</option>
        <option value="latest" class="bg-white text-black">Latest Movie</option>
        <option value="rating" class="bg-white text-black">
          Rating From Highest
        </option>
        <option value="titleAsc" class="bg-white text-black">Title From A-Z</option>
        <option value="titleDesc" class="bg-white text-black">Title From Z-A</option>
      </select>
      <select class="bg-sky-600 pl-4 w-1/4 rounded-lg text-white" v-model="genre"
        @change.prevent="filterMovies"
      >
        <option value="">Filter Genre</option>
        <option v-for="genre in genreList" :key="genre.id"
          :value="genre.id"
          class="bg-white text-black"
        >
          {{ genre.name }}  
        </option>
      </select>
      <select class="bg-sky-600 pl-4 w-1/6 rounded-lg text-white"
        v-model="perPageNumber"
        @change.prevent="filterMovies"
      >
        <option value="8" class="bg-white text-black">Per Page</option>
        <option value="12" class="bg-white text-black">12</option>
        <option value="24" class="bg-white text-black">24</option>
        <option value="48" class="bg-white text-black">48</option>
      </select>
      <button class="w-2/24 bg-sky-600 text-white rounded-lg"
        @click.prevent="resetFilter"
      >Reset</button>
    </div>
    <div class="h-full w-6/24 flex flex-row gap-x-4">
    <form class="h-full w-full flex flex-row gap-x-4"
      @submit.prevent="filterMovies"
    >
      <input
        type="text"
        class="bg-sky-600 px-8 w-full rounded-full font-medium text-white"
        placeholder="Search"
        v-model="search"
      />
      <button
        class="h-12 w-16 rounded-full bg-sky-600 flex justify-center align-middle self-center"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
  name: "Filterbar",
  methods: {
    ...mapMutations(["FILTER_SORT", "FILTER_GENRE", "FILTER_SEARCH", "SET_PERPAGE"]),
    ...mapActions(["fetchAllGenres", "fetchAllMovies"]),
    filterMovies() {
      this.fetchAllMovies();
    },
    resetFilter() {
      this.FILTER_GENRE("");
      this.FILTER_SORT("");
      this.FILTER_SEARCH("");
      this.SET_PERPAGE(8);
      this.fetchAllMovies();
      this.fetchAllGenres();
    }
  },
  computed: {
    ...mapState(["sortFilter", "genreFilter", "searchFilter", "genreList", "perPage"]),
    sort: {
      get() {
        return this.sortFilter;
      },
      set(value) {
        this.FILTER_SORT(value)
      }
    },
    genre: {
      get() {
        return this.genreFilter;
      },
      set(value) {
        this.FILTER_GENRE(value);
      }
    },
    search: {
      get() {
        return this.searchFilter;
      },
      set(value) {
        this.FILTER_SEARCH(value);
      }
    },
    perPageNumber: {
      get() {
        return this.perPage;
      },
      set(value) {
        this.SET_PERPAGE(value)
      }
    }
  },
  created() {
    this.fetchAllGenres();
  }
};
</script>

<style></style>
