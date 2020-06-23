import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import authMixin from "./components/mixins/auth-mixin";

Vue.config.productionTip = false;

Vue.mixin(authMixin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
