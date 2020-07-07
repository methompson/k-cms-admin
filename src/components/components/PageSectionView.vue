<template>
  <div
    :class="'sectionHolder' + selectionClass"
    @drop="onDrop"
    @dragover="onDragOver"
    @dragleave="onDragLeave">

    <span :class="coverClass" />

    <span
      :draggable="draggable"
      :class="draggable ? 'ghost' : ''"
      @dragend="onDragEnd"
      @dragstart="onDragStart">

      <div class="topBar">
        <button type="button" @click="addNewContentSection">Add New Content</button>
        <span
          class="title"
          @mousedown="onMouseDown"
          @mouseup="onMouseUp">
          section {{ section.id }}
        </span>
        <span @click="deletePageSection" class="fas">&#xf057;</span>
      </div>

      <div>
        <ContentSectionView
          v-for="contentSection in section.contentSections"
          :key="contentSection.id"
          :contentSection="contentSection"
          :parentContainer="section.id"
          @deleteContentSection="deleteContentSection" />
      </div>

    </span>

  </div>

</template>

<script>
import { mapState } from 'vuex';

import PageSection from "@/shared/page-creator/PageSection";
import ContentSectionView from "@/components/components/ContentSectionView.vue";
import EventBus from "@/shared/event-bus";

export default {
  data() {
    return {
      draggable: false,
      hoverProportion: null,
    };
  },
  computed: {
    ...mapState([
      "contentDragEvent",
      "pageDragEvent",
    ]),
    coverClass() {
      if (this.pageDragEvent) {
        return "cover";
      }

      return "";
    },
    selectionClass() {
      if (this.hoverProportion !== null && this.hoverProportion > 0.5) {
        return " selectionBottom";
      }

      if (this.hoverProportion !== null && this.hoverProportion <= 0.5) {
        return " selectionTop";
      }

      return "";
    },
  },
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
    addNewContentSection() {
      this.section.addNewContentSection();
    },
    deleteContentSection(ev) {
      this.section.deleteContentSection(ev.id);
    },
    deletePageSection() {
      this.$emit("deletePageSection", {
        id: this.section.id,
      });
    },
    onDrop(ev) {
      ev.preventDefault();
      ev.stopPropagation();

      console.log("Dropped on Page Section");

      if (this.contentDragEvent) {
        this.moveContentSection();
      }

      if (this.pageDragEvent) {
        this.movePageSection();
      }

      this.hoverProportion = null;
    },
    moveContentSection() {
      // Check that there's no targetSection
      if (this.contentDragEvent.targetSection !== "") {
        return;
      }

      // Check that the current setion is not the same as the dragged content parent
      if (this.contentDragEvent.draggedParent === this.section.id) {
        return;
      }

      EventBus.$emit("contentSectionChange", {
        droppedContent: this.contentDragEvent.draggedSection,
        droppedContentParentId: this.contentDragEvent.draggedParent,
        droppedOverContentParentId: this.section.id,
      });
    },
    movePageSection() {
      // Check that we're not dropping on the same section
      if (this.pageDragEvent.draggedSection === this.section.id) {
        return;
      }

      EventBus.$emit("pageSectionChange", {
        droppedSection: this.pageDragEvent.draggedSection,
        targetSection: this.section.id,
        hoverProportion: this.hoverProportion,
      });
    },
    onDragOver(ev) {
      ev.preventDefault();

      if (!this.pageDragEvent) {
        return;
      }

      if (this.section.id === this.pageDragEvent.draggedSection) {
        return;
      }

      this.$store.dispatch("draggingOverPageSection", {
        id: this.section.id,
      });

      const targetDimensions = ev.target.getBoundingClientRect();
      const posInEl = ev.clientY - targetDimensions.y;
      this.hoverProportion = posInEl / targetDimensions.height;
    },
    onDragLeave() {
      this.$store.dispatch("dragLeavingPageSection");
      this.hoverProportion = null;
    },
    onMouseDown() {
      // TODO listen for left mouse click only
      this.draggable = true;
    },
    onMouseUp() {
      this.draggable = false;
    },
    onDragStart(ev) {
      ev.dataTransfer.setData('text/plain', null);
      this.$store.dispatch("startPageSectionDrag", {
        id: this.section.id,
      });
    },
    onDragEnd() {
      this.draggable = false;
      this.$store.dispatch("stopPageSectionDrag");
    },
  },
};
</script>

<style lang="scss" scoped>
  .sectionHolder {
    width: calc(100% - 4px);
    background-color: #eeeeee;
    border: 2px solid black;
    margin: 1em 0;
    position: relative;
  }

  .selectionTop {
    border-top: 2px solid red;
  }

  .selectionBottom {
    border-bottom: 2px solid red;
  }

  .cover {
    background-color: red;
    opacity: 0.25;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }

</style>
