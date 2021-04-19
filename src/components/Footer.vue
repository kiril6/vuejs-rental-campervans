<template>
  <div class="footer">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/colors.scss";

.footer {
  border-top: 1px solid $border;
  color: $text;
  @apply md:text-lg flex items-center justify-center w-3/4 px-4 py-4 text-base font-semibold;
}
</style>
