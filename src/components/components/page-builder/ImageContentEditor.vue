<template>
  <EditorModal @closeEditor="closeEditor">
    <div>
      <label>Name</label>
      <input type="text" v-model="name">
    </div>

    <div>
      <label>classes</label>
      <input type="text" v-model="classes">
    </div>

    <div>
      <label>Image Source</label>
      <input type="text" v-model="content">
    </div>

    <button type="button" @click="cancel">Cancel</button>
    <button type="button" @click="saveData">Save</button>
  </EditorModal>
</template>

<script>
import ImageContentSection from "@/shared/page-creator/ImageContentSection";

import EditorModal from "./EditorModal.vue";

export default {
  components: {
    EditorModal,
  },
  props: {
    contentSection: {
      type: ImageContentSection,
      default() {
        return new ImageContentSection();
      },
    },
  },
  data() {
    return {
      name: "",
      classes: "",
      content: "",
    };
  },
  mounted() {
    this.name = this.contentSection.contentMeta.name;
    this.classes = this.contentSection.contentMeta.classes;
    this.content = this.contentSection.content;
  },
  methods: {
    closeEditor() {
      this.$emit("closeEditor");
    },
    cancel() {
      this.closeEditor();
    },
    saveData() {
      this.$emit("saveData", {
        name: this.name,
        classes: this.classes,
        content: this.content,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
