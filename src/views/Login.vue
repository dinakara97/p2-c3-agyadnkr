<template>
  <div class="min-h-screen w-screen flex items-center justify-center">
    <div
      class="min-h-4/6 w-4/5 lg:w-2/5 md:w-3/4 sm:w-3/4 bg-white rounded-lg shadow-xl flex flex-col"
    >
      <div class="flex justify-center pt-10 pb-10">
        <p class="font-bold text-5xl">Login</p>
      </div>
      <div class="px-12">
        <form
          class="flex flex-col gap-y-8"
          id="login-form"
          @submit.prevent="loginSubmit"
        >
          <div class="flex flex-col gap-y-2">
            <label for="login-email" class="font-bold px-2 text-left"
              >Email</label
            >
            <input
              type="text"
              id="login-email"
              class="w-full rounded-lg border py-2 px-4"
              v-model="login.email"
              placeholder="Insert email here"
            />
          </div>
          <div class="flex flex-col gap-y-2">
            <label for="login-password" class="font-bold px-2 text-left"
              >Password</label
            >
            <input
              type="password"
              id="login-password"
              class="w-full rounded-lg border py-2 px-4"
              v-model="login.password"
              placeholder="Insert password here"
            />
          </div>
          <div class="flex justify-center items-center mt-4">
            <BlueButton :text="'Login'"></BlueButton>
          </div>
        </form>
        <div class="flex justify-center pt-2">
          <button
            class="hover:text-gray-500 mb-4"
            id="register-button"
            @click.prevent="$router.push({ name: 'Register' })"
          >
            Don't have account? Register here
          </button>
        </div>
        <div class="flex justify-center pt-10 pb-10">
          <GoogleLogin
            :params="params"
            :renderParams="renderParams"
            :onSuccess="onSuccess"
            :onFailure="onFailure"
          ></GoogleLogin>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import GoogleLogin from "vue-google-login";
import BlueButton from "../components/buttons/BlueButton.vue";
export default {
  name: "Login",
  components: {
    BlueButton,
    GoogleLogin
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      renderParams: {
        width: 230,
        height: 50,
        longtitle: true,
      },
      params: {
        client_id:
          "625606840817-s9m79qmi17l6v1m6sggbqadt5t8u69db.apps.googleusercontent.com",
      },
    };
  },
  methods: {
    ...mapActions(["loginHandler", "loginGoogleHandler"]),
    async loginSubmit() {
      await this.loginHandler(this.login);
      if (this.isLogged) {
        this.$router.push({ name: "Home" });
        this.login.email = "";
        this.login.password = "";
      }
    },
    async onSuccess(googleUser) {
      // console.log(googleUser.getBasicProfile());
      let googleToken = googleUser.getAuthResponse().id_token;
      const response = await this.loginGoogleHandler(googleToken);
      // console.log(response)
      if (response) {
        this.$router.push({ name: "Home" })
      }
    },
    onFailure(error) {
      console.log(error);
    },
  },
  computed: {
    ...mapState(["isLogged"]),
  },
};
</script>

<style></style>
