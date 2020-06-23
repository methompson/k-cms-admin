<template>
  <div id="app">

    <NavBar />
    <router-view />

  </div>
</template>

<script>
import NavBar from "@/components/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  mounted() {
    this.$store.dispatch("initFromLocalStorage")
      .then((result) => {
        // Check current page
        if (result) {
          // this.$router.push('Home');
        }
      });
  },
};
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
