<template>
  <div id="nav" class="flex flex-col font-sans w-full text-white text-md">
    <router-link
      to="/"
      class="w-full flex items-center py-6 pl-10 border-sky-400 font-sans text-white text-md hover:bg-blue-800"
    >
      Movies
    </router-link>
    <!-- <router-link
      to="/genres"
      class="w-full flex items-center py-6 pl-10 border-sky-400 font-sans text-white text-md hover:bg-blue-800"
    >
      Genres
    </router-link> -->
    <router-link
      to="/bookmarks"
      class="w-full flex items-center py-6 pl-10 border-sky-400 font-sans text-white text-md hover:bg-blue-800"
    >
      Bookmarks
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
#nav a.router-link-exact-active {
  width: 100%;
  border-left-width: 12px;
  background-color: #2c5282;
  display: flex;
  align-items: center;
}
</style>
