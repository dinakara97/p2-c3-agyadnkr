<template>
  <img
    :src="image"
    alt="Poster"
    class="object-cover h-full w-full relative relativez-0 -mt-6 inset-x-0 top-0"
  />
</template>

<script>
export default {
  name: "ImageCard",
  props: ["image"],
};
</script>

<style></style>
