<template>
  <div id="nav">

    <router-link v-if="showLogin" to="/login">Login</router-link>

    <span v-else>
      <router-link to="/">Home</router-link> |
      <router-link to="/pages">Pages</router-link> |
      <router-link to="/blog">Blog</router-link> |
      <router-link to="/users">Users</router-link> |
      <span class="link" @click="logout">Logout</span>
    </span>

    <button type="button" @click="test">Add Message</button>

  </div>
</template>

<script>
export default {
  computed: {
    showLogin() {
      return !this.userToken;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout")
        .then(() => {
          this.$router.push('/login');
        })
        .catch(() => {
          // Do something
        });
    },
    test() {
      const msg = `Test ${Math.floor(Math.random() * 10000)}`;
      this.$store.dispatch("addMessage", {
        msg,
        type: "info",
        timeout: 800,
      })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
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
