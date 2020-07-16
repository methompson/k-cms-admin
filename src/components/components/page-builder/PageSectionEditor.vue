<template>
  <EditorModal @closeEditor="cancel">
    <div>
      <label>Name</label>
      <input type="text" v-model="name">
    </div>

    <div>
      <label>Classes</label>
      <input type="text" v-model="classes">
    </div>

    <button type="button" @click="cancel">Cancel</button>
    <button type="button" @click="saveData">Save</button>
  </EditorModal>
</template>

<script>
import PageSection from "@/shared/page-creator/PageSection";

import EditorModal from "./EditorModal.vue";

export default {
  components: {
    EditorModal,
  },
  props: {
    pageSection: {
      type: PageSection,
      default() {
        const section = new PageSection();
        return section;
      },
    },
  },
  data() {
    return {
      name: "",
      classes: "",
    };
  },
  methods: {
    cancel() {
      console.log("Closing");
      this.$emit("closeEditor");
    },
    saveData() {
      this.$emit("saveData", {
        name: this.name,
        classes: this.classes,
      });
    },
  },
  mounted() {
    console.log(this.pageSection);
    this.name = this.pageSection.meta.name;
    this.classes = this.pageSection.meta.classes;
  },
};
</script>

<style lang="scss" scoped>
</style>
