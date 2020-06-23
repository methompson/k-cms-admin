import Vue from "vue";
import Vuex from "vuex";

import { getDefaultState } from "./default-state";
import * as authStore from "./auth-store";

Vue.use(Vuex);

const theState = getDefaultState();

export default new Vuex.Store({
  state: theState,
  mutations: {
    ...authStore.mutations,
  },
  actions: {
    ...authStore.actions,
  },
  modules: {
  },
});
