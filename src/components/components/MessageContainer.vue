<template>
  <div class="windowContainer">
    <div class="infoBarContainer">
      <transition-group name="message">
        <MessageBar v-for="msg in messages" :key="`${msg.id}`" :message="msg" />
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import MessageBar from "@/components/components/MessageBar.vue";

export default {
  components: {
    MessageBar,
  },
  computed: {
    ...mapState([
      'messages',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .windowContainer {
    // background-color: red;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    display: grid;
    grid-template-columns: 10% auto 10%;
    grid-template-rows: auto 5%;
    pointer-events: none;
  }

  .infoBarContainer {
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 1;
    justify-self: center;
    align-self: end;
    width: 100%;
  }

  .message-enter-active, .message-leave-active {
    transition: opacity 0.3s;
  }

  .message-enter, .message-leave-to {
    opacity: 0;
  }

</style>
