import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import VueTablerIcons from "vue-tabler-icons";

import "./assets/css/tailwind.css";

Vue.use(VueAxios, axios);
Vue.use(VueTablerIcons);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
