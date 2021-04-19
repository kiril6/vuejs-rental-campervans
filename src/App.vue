<template>
  <div id="app">
    <div class="layout">
      <div class="layout__logo">
        <router-link
          tag="img"
          to="/"
          :src="require(`@/assets/images/logo.png`)"
        ></router-link>
      </div>
      <div class="layout__content">
        <router-view
          :detailsData="[
            $route.params.station,
            $route.params.dateStart,
            $route.params.dateEnd,
          ]"
          :key="$route.path"
        />
      </div>
      <div class="layout__footer">
        <Footer v-text="footer"></Footer>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  data() {
    return {
      footerTitle: "© Land Adventurer, ",
    };
  },
  components: {
    Footer,
  },
  computed: {
    footer() {
      return this.footerTitle + new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/colors.scss";

#app {
  @apply h-screen font-sans;

  * {
    outline: 0;
  }
  background: $background;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .layout {
    &__logo {
      @apply lg:mb-20 flex justify-center pt-8 mb-8 cursor-pointer;
      img {
        @apply w-60 md:w-auto;
      }
    }
    &__content {
      overflow-y: auto;
    }
    &__footer {
      background: rgba($background, 0.97);
      box-shadow: 0px 0px 2px 2px rgba(191, 195, 186, 0.95);
      @apply fixed bottom-0 z-10 flex justify-center w-screen;
    }
  }
}
</style>
