import Vue from "vue";
import Vuex from "vuex";
import { customer } from "../apis/index";
import Swal from "sweetalert2";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    movieList: [],
    movieDetail: {},
    genreList: [],
    bookmarkList: [],
    sortFilter: "",
    genreFilter: "",
    searchFilter: "",
    seeDetail: false,
    pageNumber: 1,
    maxPageNumber: null,
    perPage: 8,
  },
  mutations: {
    CHANGE_ISLOGGED(state, payload) {
      state.isLogged = payload;
    },
    FETCH_MOVIELIST(state, payload) {
      state.movieList = payload;
    },
    FETCH_BOOKMARK(state, payload) {
      state.bookmarkList = payload;
    },
    FETCH_MOVIEDETAIL(state, payload) {
      state.movieDetail = payload;
    },
    FETCH_GENRELIST(state, payload) {
      state.genreList = payload;
    },
    FILTER_SORT(state, payload) {
      state.sortFilter = payload;
    },
    FILTER_GENRE(state, payload) {
      state.genreFilter = payload;
    },
    FILTER_SEARCH(state, payload) {
      state.searchFilter = payload;
    },
    TO_LASTPAGE(state) {
      state.pageNumber = state.maxPageNumber;
    },
    TO_FIRSTPAGE(state) {
      state.pageNumber = 1;
    },
    NEXT_PAGE(state) {
      if (state.pageNumber !== state.maxPageNumber) {
        state.pageNumber++;
      }
    },
    PREVIOUS_PAGE(state) {
      if (state.pageNumber !== 1) {
        state.pageNumber--;
      }
    },
    SET_PERPAGE(state, payload) {
      state.perPage = payload;
    },
    SET_MAXPAGENUMBER(state, payload) {
      state.maxPageNumber = payload;
    },
    SEE_DETAIL(state, payload) {
      state.seeDetail = payload
    }
  },
  actions: {
    async fetchAllMovies({ state, commit }) {
      try {
        const params = {
          page: state.pageNumber,
          per_page: state.perPage,
        };

        if (state.sortFilter) {
          params.sort = state.sortFilter;
        }
        if (state.genreFilter) {
          params.genre = state.genreFilter;
        }
        if (state.searchFilter) {
          params.search = state.searchFilter;
        }

        const response = await customer.get("/movies", { params });

        commit("FETCH_MOVIELIST", response.data.rows);

        const maxPageNumber = Math.ceil(response.data.count / state.perPage);
        commit("SET_MAXPAGENUMBER", maxPageNumber);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
    },
    async fetchAllBookmarks({ commit }) {
      try {
        const response = await customer.get("/bookmarks", {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        // console.log(response.data)
        commit("FETCH_BOOKMARK", response.data.Movies);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
    },
    async fetchMovieDetail({ commit }, id) {
      try {
        // console.log(id)
        const response = await customer.get(`movies/${id}`,
        {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        });

        // console.log(response.data)
        commit("FETCH_MOVIEDETAIL", response.data);
        return true
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
    },
    async fetchAllGenres({ commit }) {
      try {
        const response = await customer.get("/genres");

        commit("FETCH_GENRELIST", response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
    },
    async addToBookmark(context, id) {
      try {
        const accessToken = localStorage.getItem("access_token")
        // console.log(accessToken)
        await customer.post(`movies/${id}`, {},
        {
          headers: {
            access_token: accessToken
          }
        })

        Swal.fire({
          icon: "success",
          title: "Add Bookmark Success",
          text: `Success add this movie to bookmark`,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
    },
    async loginHandler({ commit }, payload) {
      try {
        const response = await customer.post("/login", {
          email: payload.email,
          password: payload.password,
        });

        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("userId", response.data.id);

        commit("CHANGE_ISLOGGED", true);
        Swal.fire({
          icon: "success",
          title: "Login",
          text: "Login Success!!",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
    },
    async loginGoogleHandler({ commit }, token) {
      try {
        const response = await customer.post(`/login-google`, { token });
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("userId", response.data.id);
        
        commit("CHANGE_ISLOGGED", true);
        Swal.fire({
          icon: "success",
          title: "Success!!",
          text: `Welcome to the Family`,
        });
        return true;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      }
    },
    async registerHandler(context, payload) {
      try {
        // console.log(payload)
        await customer.post("/register", {
          email: payload.email,
          password: payload.password,
        });
        Swal.fire({
          icon: "success",
          title: "Register",
          text: "Register Success!!",
        });
        return true
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
    },
  },
  modules: {},
});
