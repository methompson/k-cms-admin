<template>
  <div class="organizerContainer">
    <div>
      <textarea v-model="jsonInput" rows="5" cols="33"></textarea>
    </div>
    <div>
      <button type="button" @click="importFromJSON">Import From JSON</button>
    </div>

    <div>
      Page Title
      <input type="text">
    </div>

    <div>
      Page Name
      <input type="text">
    </div>

    <div>
      Container Classes
      <input type="text">
    </div>

    <ContentTray />

    <button type="button" @click="addNewPageSection">Add a New Page Section</button>
    <button type="button" @click="exportToJSON">Export to JSON</button>

    <div class="sectionContainer" v-if="pageContainer">

      <PageSectionView
        v-for="section in pageContainer.pageSections"
        :key="section.id"
        :section="section"
        @deletePageSection="deletePageSection" />

    </div>
  </div>
</template>

<script>
import PageContainer from "@/shared/page-creator/PageContainer";
import PageSectionView from "@/components/components/page-builder/PageSectionView.vue";
import ContentTray from "@/components/components/page-builder/ContentTray.vue";
import EventBus from "@/shared/event-bus";

export default {
  components: {
    PageSectionView,
    ContentTray,
  },
  data() {
    return {
      pageContainer: null,
      draggedSection: "",
      jsonInput: "",
    };
  },
  mounted() {
    this.pageContainer = new PageContainer();
    EventBus.$on("contentSectionChange", this.moveContent);
    EventBus.$on("pageSectionChange", this.movePageSection);
  },
  beforeDestroy() {
    EventBus.$off("contentSectionChange");
    EventBus.$off("pageSectionChange");
  },
  methods: {
    addNewPageSection() {
      this.pageContainer.addNewPageSection();
    },
    deletePageSection(ev) {
      console.log(ev.id);
      this.pageContainer.deletePageSectionById(ev.id);
    },
    moveContent(ev) {
      console.log("Moving Content", ev);
      const movedContentParent = this.pageContainer.getPageSectionById(ev.droppedContentParentId);
      const droppedOnContentParent = this.pageContainer.getPageSectionById(ev.droppedOverContentParentId);

      console.log(movedContentParent, droppedOnContentParent);

      // Step 1, get a reference to the dropped content section.
      // Step 2, remove the dropped content section from the original page section
      // Step 3, insert the dropped content into the new page section

      const content = movedContentParent.getContentSectionById(ev.droppedContent);
      movedContentParent.deleteContentSection(ev.droppedContent);

      // In order to make this more generic, the hoverProportion can be a Number from 0 to 1
      // or null for an empty section
      if (!ev.hoverProportion && !ev.droppedOverContent) {
        droppedOnContentParent.insertContentSectionAtEnd(content);
      } else if (ev.hoverProportion > 0.5) {
        droppedOnContentParent.insertContentSectionAfterId(ev.droppedOverContent, content);
      } else {
        droppedOnContentParent.insertContentSectionBeforeId(ev.droppedOverContent, content);
      }
    },
    movePageSection(ev) {
      console.log("Moving Page Section", ev);
      const droppedSection = this.pageContainer.getPageSectionById(ev.droppedSection);

      this.pageContainer.deletePageSectionById(ev.droppedSection);

      if (ev.hoverProportion > 0.5) {
        this.pageContainer.insertPageSectionAfterId(ev.targetSection, droppedSection);
      } else if (ev.hoverProportion <= 0.5) {
        this.pageContainer.insertPageSectionBeforeId(ev.targetSection, droppedSection);
      }
    },
    exportToJSON() {
      const exportedJSON = this.pageContainer.exportToJSON();
      console.log(exportedJSON);
    },
    importFromJSON() {
      const newPageContainer = new PageContainer();

      try {
        newPageContainer.importFromJSON(this.jsonInput);
      } catch (e) {
        console.log("Error Parsing JSON");
        return;
      }

      this.pageContainer = newPageContainer;
    },
  },
};
</script>

<style lang="scss" scoped>
  .sectionContainer {
    text-align: left;
    width: 100%;
  }
</style>
