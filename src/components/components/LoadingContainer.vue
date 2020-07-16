<template>
  <div>
    <div class="contentContainer">
      <transition
        name="loadingSpinner"
        @before-enter="startingTransition"
        @after-enter="finishedTransition" >
        <div
          v-if="!visible"
          key="loadingSpinner"
          class="loadingSpinner" />

        <div v-else class="content" key="content">
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    startingTransition() {
      // console.log("Started Container Transition");
    },
    finishedTransition() {
      // console.log("Finished Container Transition");
    },
  },
};
</script>

<style lang="scss" scoped>
  .contentContainer {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
  }

  .invisible {
    opacity: 0;
  }

  .visible {
    opacity: 1;
  }

  .loadingSpinner-enter-active, .loadingSpinner-leave-active {
    transition: opacity 0.25s;
  }
  .loadingSpinner-enter, .loadingSpinner-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .content, .loadingSpinner {
    justify-self: center;
    grid-column-start: 1;
    grid-row-start: 1;
  }

  .loadingSpinner {
    background-color: transparent;
    width: 3em;
    height: 3em;
    border-top: 3px solid darkcyan;
    border-right: 1px solid transparent;
    border-left: 1px solid transparent;
    border-bottom: 1px solid transparent;
    // border-right: 3px dashed lightblue;
    // border-left: 3px dashed lightblue;
    // border-bottom: 3px dashed lightblue;
    border-radius: 3em;

    animation-duration: 1.5s;
    animation-name: spin;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
