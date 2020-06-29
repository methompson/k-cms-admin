<template>
  <div id="app">

    <NavBar />

    <transition
      name="pageFade"
      mode="out-in"
      @before-enter="startingTransition"
      @after-enter="finishedTransition">
      <router-view />
    </transition>

    <MessageContainer />

  </div>
</template>

<script>
import NavBar from "@/components/components/NavBar.vue";
import MessageContainer from "@/components/components/MessageContainer.vue";

export default {
  components: {
    NavBar,
    MessageContainer,
  },
  mounted() {
    this.$store.dispatch("initFromLocalStorage")
      .then((result) => {
        // Check current page
        if (result) {
          // this.$router.push('Home');
        }

        this.backgroundAuthCheck();
      });
  },
  methods: {
    startingTransition() {
      // console.log("Starting Navigating");
    },
    finishedTransition() {
      // console.log('Finished Navigating');
    },
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

  .pageFade-enter-active,
  .pageFade-leave-active {
    transition-duration: 0.1s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .pageFade-enter,
  .pageFade-leave-active {
    opacity: 0
  }
</style>
