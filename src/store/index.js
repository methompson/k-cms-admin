import Vue from "vue";
import Vuex from "vuex";

import { getDefaultState } from "./default-state";
import * as authStore from "./auth-store";
import * as msgStore from "./msg-store";

Vue.use(Vuex);

const theState = getDefaultState();

export default new Vuex.Store({
  state: theState,
  mutations: {
    ...authStore.mutations,
    ...msgStore.mutations,
  },
  actions: {
    ...authStore.actions,
    ...msgStore.actions,
  },
  modules: {
  },
});
