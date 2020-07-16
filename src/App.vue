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

  @font-face {
    font-family: 'Font Awesome 5 Brands';
    font-style: normal;
    font-weight: 400;
    font-display: block;
    src: url("./assets/fonts/fa-brands-400.eot");
    src: url("./assets/fonts/fa-brands-400.eot?#iefix") format("embedded-opentype"), url("./assets/fonts/fa-brands-400.woff2") format("woff2"), url("./assets/fonts/fa-brands-400.woff") format("woff"), url("./assets/fonts/fa-brands-400.ttf") format("truetype"), url("./assets/fonts/fa-brands-400.svg#fontawesome") format("svg");
  }
  .fab {
    font-family: 'Font Awesome 5 Brands';
    font-weight: 400;
  }

  @font-face {
    font-family: 'Font Awesome 5 Free';
    font-style: normal;
    font-weight: 400;
    font-display: block;
    src: url("./assets/fonts/fa-regular-400.eot");
    src: url("./assets/fonts/fa-regular-400.eot?#iefix") format("embedded-opentype"), url("./assets/fonts/fa-regular-400.woff2") format("woff2"), url("./assets/fonts/fa-regular-400.woff") format("woff"), url("./assets/fonts/fa-regular-400.ttf") format("truetype"), url("./assets/fonts/fa-regular-400.svg#fontawesome") format("svg");
  }
  .far {
    font-family: 'Font Awesome 5 Free';
    font-weight: 400;
  }

  @font-face {
    font-family: 'Font Awesome 5 Free';
    font-style: normal;
    font-weight: 900;
    font-display: block;
    src: url("./assets/fonts/fa-solid-900.eot");
    src: url("./assets/fonts/fa-solid-900.eot?#iefix") format("embedded-opentype"), url("./assets/fonts/fa-solid-900.woff2") format("woff2"), url("./assets/fonts/fa-solid-900.woff") format("woff"), url("./assets/fonts/fa-solid-900.ttf") format("truetype"), url("./assets/fonts/fa-solid-900.svg#fontawesome") format("svg");
  }
  .fa,
  .fas {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
  }

  .ghost {
    opacity: 0.2;
  }
</style>
