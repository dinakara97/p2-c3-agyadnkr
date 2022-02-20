<template>
  <div class="py-2 h-1/6 w-full justify-start text-left">
    <p class="text-xl font-bold text-white">
      {{ title }}
    </p>
    <p class="text-md font-light text-slate-300">
      {{ genre }}
    </p>
  </div>
</template>

<script>
export default {
  name: "MovieTitle",
  props: ["title", "genre"],
};
</script>

<style></style>
