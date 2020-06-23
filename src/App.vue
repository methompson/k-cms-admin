<template>
  <div id="app">

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="showLogin" to="/login">Login</router-link>
      <span v-else>
        <router-link to="/pages">Pages</router-link> |
        <span class="link" @click="logout">Logout</span>
      </span>
    </div>

    <router-view />

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  mounted() {
    this.$store.dispatch("initFromLocalStorage")
      .then((result) => {
        // Check current page
        if (result) {
          // this.$router.push('Home');
        }
      });
  },
  computed: {
    ...mapState([
      "userToken",
    ]),
    showLogin() {
      return !this.userToken;
    },
  },
  methods: {
    logout() {
      console.log("Logging Out");
      this.$store.dispatch("logout")
        .then(() => {
          this.$router.push('Login');
        })
        .catch(() => {
          // Do something
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a,
#nav .link {
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
