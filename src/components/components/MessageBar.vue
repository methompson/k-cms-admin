<template>
  <!-- <div :id="message.id" :class="'messageBox ' + msgColor + (hidden ? ' hidden shrunk' : '')" @click="closeMessage"> -->
  <div :id="message.id" :class="'messageBox ' + msgColor" @click="closeMessage">
    {{ message.msg }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default() {
        return {
          id: "",
          type: "",
          msg: "",
          exp: 0,
        };
      },
    },
  },
  data() {
    return {
      hidden: false,
      messageCloseTimeout: null,
    };
  },
  computed: {
    msgColor() {
      if (this.message.type === "error") {
        return "error";
      }

      if (this.message.type === "success") {
        return "success";
      }

      return "info";
    },
  },
  created() {
    const now = new Date().getTime();
    const { exp } = this.message;
    const timeout = exp - now;
    if (timeout < 1) {
      return;
    }

    this.messageCloseTimeout = setTimeout(() => {
      this.closeMessage();
    }, timeout);
  },
  mounted() {
    // Once mounted, we get the height of this element after the nextTick
    // const element = document.getElementById(this.message.id);
    // const height = window.getComputedStyle(element, null).getPropertyValue('height');

    // this.$nextTick(() => {
    //   element.style.height = height;
    // });
  },
  beforeDestroy() {
    clearTimeout(this.messageCloseTimeout);
    console.log("Before Destroy");
  },
  methods: {
    /**
     * We set the hidden flag to true to set the box's opacity to 0
     * Then, after 300ms, we remove the message from the store.
     */
    closeMessage() {
      this.hidden = true;
      clearTimeout(this.messageCloseTimeout);

      this.dispatchClose();

      // setTimeout(() => {
      //   this.dispatchClose();
      // }, 350);
    },
    dispatchClose() {
      return this.$store.dispatch("removeMessage", {
        id: this.message.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .messageBox {
    pointer-events: auto;
    padding: 0.5rem;
    color: white;
    width: 100%;
    font-weight: 700;
    font-size: 1em;
    margin: 0.5rem;
    border-radius: 0.5rem;
    // transition: opacity 0.25s,
    //   height 0.25s,
    //   margin 0.25s,
    //   padding 0.25s,
    //   font-size 0.25s;
  }

  .hidden {
    opacity: 0;
  }

  .shrunk {
    font-size: 0em;
    padding: 0 0.5rem;
    margin: 0 0.5rem;
    height: 0px !important;
  }

  .error {
    background-color: red;
  }

  .success {
    background-color: rgb(0, 180, 0);
  }

  .info {
    background-color: blue;
  }
</style>
