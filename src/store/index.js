import Vue from "vue";
import Vuex from "vuex";

import { getDefaultState } from "./default-state";
import * as authStore from "./auth-store";
import * as msgStore from "./msg-store";
import * as dragStore from "./drag-section-store";

Vue.use(Vuex);

const theState = getDefaultState();

const store = new Vuex.Store({
  state: theState,
  mutations: {
    ...authStore.mutations,
    ...msgStore.mutations,
    ...dragStore.mutations,
  },
  actions: {
    ...authStore.actions,
    ...msgStore.actions,
    ...dragStore.actions,
  },
  modules: {
  },
});

// We need to init the store from the LocalStorage immediate after the store is created
// so that other portions of the app reliant on authentication information can get it
// immediately rather than waiting for App.vue to run. This is especially important
// for the router guard which will run before App. vue is created.
store.dispatch("initFromLocalStorage");

export default store;
