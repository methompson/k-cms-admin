<template>
  <div>
    <div class="tray">
      <span
        draggable="true"
        class="contentBox"
        @dragstart="(ev) => { onDragStart(ev, 'text'); }"
        @dragend="onDragEnd">

        <div class="trayIcon fas">&#xf031;</div>

        Text Content
      </span>

      <span
        draggable="true"
        class="contentBox"
        @dragstart="(ev) => { onDragStart(ev, 'image'); }"
        @dragend="onDragEnd">

        <div class="trayIcon fas">&#xf03e;</div>

        Image Content
      </span>

      <span
        draggable="true"
        class="contentBox"
        @dragstart="(ev) => { onDragStart(ev, 'html'); }"
        @dragend="onDragEnd">

        <div class="trayIcon fas">&#xf121;</div>

        Raw HTML Content
      </span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onDragStart(ev, type) {
      console.log("Drag Start", type);
      if (type === 'text') {
        this.createTextDragEvent();
      }
      if (type === 'image') {
        this.createImageDragEvent();
      }
      if (type === 'html') {
        this.createHtmlDragEvent();
      }
    },
    onDragEnd() {
      console.log("Drag End");
      this.$store.dispatch("cancelNewContentDrag");
    },
    createTextDragEvent() {
      this.createDragEvent("text");
    },
    createImageDragEvent() {
      this.createDragEvent("image");
    },
    createHtmlDragEvent() {
      this.createDragEvent("html");
    },
    createDragEvent(type) {
      this.$store.dispatch("startNewContentDrag", {
        type,
      });
    },
  },
};
</script>

<style lang="scss" scoped>

  .tray {
    margin: 1em;
    padding: 1em;
    border: 1px solid #444;
    background-color: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;;
  }

  .contentBox {
    display: inline-block;
    border: 1px solid #999;
    padding: 0.25em;
    margin: 0.25em;
    background-color: #eee;
    user-select: none;
  }

  .trayIcon {
    font-size: 2rem;
  }

</style>
