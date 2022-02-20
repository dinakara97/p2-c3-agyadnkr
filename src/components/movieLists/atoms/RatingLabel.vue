<template>
  <div
    class="rounded-full h-12 w-12 bg-blue-600 relative z-20 -mt-6 flex justify-center items-center text-white text-xl font-bold"
  >
    {{ rating }}
  </div>
</template>

<script>
export default {
  name: "RatingLabel",
  props: ["rating"]
};
</script>

<style></style>
