import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    station: '',
    range: {},
  },
  mutations: {
    MUTATE_ITEMS: (state, { stationName, dateRange }) => {
      state.station = stationName;
      Object.assign(state.range, dateRange);
    },
  },
  actions: {
    updateStore: function (store, value) {
      store.commit("MUTATE_ITEMS", value);
    },
  },
  getters: {
    getStation: (state) => state.station,
    getRange: (state) => state.range,
  },
});
