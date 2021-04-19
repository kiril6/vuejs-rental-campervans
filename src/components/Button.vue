<template>
  <div class="button" :class="{ disabled: isDisabled }">
    <span>{{ name }}</span>
    <slot />
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    name: String,
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/colors.scss";

.button {
  background: $element;
  color: $white;
  border: 1px solid $border;

  &.disabled {
    @apply opacity-75 pointer-events-none;
  }
  span {
    text-transform: uppercase;
    @apply ml-4;
  }
  &:hover {
    @apply filter drop-shadow-lg cursor-pointer;
  }
  @apply md:mt-0 flex flex-row flex-row-reverse justify-center w-11/12 px-3 py-2 mt-6 font-semibold rounded-md;
}
</style>
