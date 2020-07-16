<template>
  <span class="screenContainer" @click="cancel">
    <div @click="(ev) => { ev.stopPropagation(); }" class="editorContainer">
      <slot />
    </div>
  </span>
</template>

<script>
export default {
  methods: {
    cancel() {
      this.$emit("closeEditor");
    },
  },
};
</script>

<style lang="scss" scoped>
  .screenContainer {
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;

    display: inline-grid;
    grid-template-columns: [gutterBegin] 5vw [content] auto [gutterEnd] 5vw [end];
    grid-template-rows: [gutterBegin] 5vh [content] auto [gutterEnd] 5vh [end];
  }

  .editorContainer {
    grid-row-start: content;
    grid-column-start: content;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 1.5em;
  }
</style>
