<template>
  <div class="textComponent">
    <span v-html="renderedContent" />
  </div>
</template>

<script>
import marked from "marked";

export default {
  props: {
    sectionData: {
      type: Object,
      default() {
        return {
          content: "",
        };
      },
    },
  },
  computed: {
    renderedContent() {
      return marked(this.sectionData.content);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
