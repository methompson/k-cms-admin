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
      <div>
        <label>Text Content</label>
      </div>
      <textarea id="content" rows="5" cols="33" />
    </div>

    <button type="button" @click="cancel">Cancel</button>
    <button type="button" @click="saveData">Save</button>
  </EditorModal>
</template>

<script>
import SimpleMDE from "simplemde";

import TextContentSection from "@/shared/page-creator/TextContentSection";
import { isObject } from "@/shared/is-data";

import EditorModal from "./EditorModal.vue";

export default {
  components: {
    EditorModal,
  },
  props: {
    contentSection: {
      type: TextContentSection,
      default() {
        return new TextContentSection();
      },
    },
  },
  data() {
    return {
      name: "",
      classes: "",
      mde: null,
    };
  },
  mounted() {
    this.name = this.contentSection.contentMeta.name;
    this.classes = this.contentSection.contentMeta.classes;
    this.content = this.contentSection.content;

    const contentTextArea = document.getElementById("content");

    if (contentTextArea) {
      this.mde = new SimpleMDE({
        element: contentTextArea,
      });

      this.mde.value(this.contentSection.content);
    }
  },
  methods: {
    closeEditor() {
      this.$emit("closeEditor");
    },
    cancel() {
      this.closeEditor();
    },
    saveData() {
      const content = isObject(this.mde) ? this.mde.value() : "";

      console.log(content);

      this.$emit("saveData", {
        name: this.name,
        classes: this.classes,
        content,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  // @import "../../../../node_modules/simplemde/dist/simplemde.min.css"
  @import "~@/../node_modules/simplemde/dist/simplemde.min.css"
</style>
