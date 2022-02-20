<template>
  <button class="h-112 w-4/5 flex flex-col justify-center items-center"
    @click.prevent="goToDetail"
  >
    <div class="h-5/6 bg-black static flex flex-col items-center">
     <RatingLabel
      :rating="movie.rating"
     ></RatingLabel>
      <ImageCard
        :image="movie.imgUrl"
      ></ImageCard>
    </div>
   <MovieTitle
    :title="movie.title"
    :genre="movie.Genre.name"
   ></MovieTitle>
  </button>
</template>

<script>
import ImageCard from "../atoms/ImageCard.vue";
import RatingLabel from "../atoms/RatingLabel.vue";
import MovieTitle from "../atoms/MovieTitle.vue";
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: "MovieCard",
  components: {
    ImageCard,
    RatingLabel,
    MovieTitle,
  },
  props: ["movie"],
  methods: {
    ...mapActions(["fetchMovieDetail"]),
    ...mapMutations(["SEE_DETAIL"]),
    async goToDetail() {
      console.log("clicked")
      const response = await this.fetchMovieDetail(this.movie.id);

      if (response) {
        this.SEE_DETAIL(true)
      }
    }
  },
  computed: {
    ...mapState(["seeDetail"])
  }
};
</script>

<style>
#k {
  z-index: 10;
}
#l {
  z-index: 0;
}
</style>
