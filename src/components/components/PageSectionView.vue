<template>
  <div class="sectionHolder">
    <div>section {{ section.id }}</div>
    <div>
      <button type="button" @click="addContentSection">Add New Content</button>
    </div>
    <div>
      <ContentSectionView
        v-for="contentSection in section.contentSections"
        :key="contentSection.id"
        :contentSection="contentSection"
        @deleteContentSection="deleteContentSection" />
    </div>
  </div>

</template>

<script>
import PageSection from "@/shared/PageSection";
import ContentSectionView from "@/components/components/ContentSectionView.vue";

export default {
  components: {
    ContentSectionView,
  },
  props: {
    section: {
      type: PageSection,
      default() {
        const section = new PageSection();
        return section;
      },
    },
  },
  methods: {
    addContentSection() {
      console.log("Adding a component");
      this.section.addContentSection();
    },
    deleteContentSection(ev) {
      console.log("Deleting", ev.id);
      this.section.deleteContentSection(ev.id);
    },
  },
};
</script>

<style lang="scss" scoped>
  .sectionHolder {
    width: 100%;
    background-color: #eeeeee;
    border: 1px solid black;
  }
</style>
