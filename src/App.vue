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
// import EventBus from "@/shared/event-bus";
import NavBar from "@/components/components/NavBar.vue";
import MessageContainer from "@/components/components/MessageContainer.vue";

export default {
  components: {
    NavBar,
    MessageContainer,
  },
  created() {
    this.backgroundAuthCheck();
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
  @import "App.scss";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
