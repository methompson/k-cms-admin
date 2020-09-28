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

        <div class="buttonCenter delBtn">
          <span @click="deletePageSection" class="fas">&#xf057;</span>
        </div>

        <div class="buttonCenter editBtn">
          <span @click="showPageSectionEditor" class="fas">&#xf044;</span>
        </div>

        <div
          class="titleCenter title"
          @mousedown="onMouseDown"
          @mouseup="onMouseUp">
            <span>Name: {{ section.meta.name }}</span>
        </div>
      </div>

      <div>id: {{ section.id }}</div>

      <div>
        <ContentSectionView
          v-for="contentSection in section.contentSections"
          :key="contentSection.id"
          :contentSection="contentSection"
          :parentContainer="section.id"
          @deleteContentSection="deleteContentSection"
          @duplicateContent="duplicateContentSection" />
      </div>

    </span>

    <PageSectionEditor
      v-if="showEditor"
      :pageSection="section"
      @saveData="savePageData"
      @closeEditor="closeEditor" />

  </div>

</template>

<script>
import { mapState } from 'vuex';

import { isObject } from "@/shared/is-data";
import EventBus from "@/shared/event-bus";
import PageSection from "@/shared/page-creator/PageSection";

import PageSectionEditor from "@/components/components/page-builder/PageSectionEditor.vue";
import ContentSectionView from "@/components/components/page-builder/ContentSectionView.vue";

export default {
  data() {
    return {
      draggable: false,
      hoverProportion: null,
      newContentHover: false,
      showEditor: false,
    };
  },
  computed: {
    ...mapState([
      "contentDragEvent",
      "pageDragEvent",
      "newContentDragEvent",
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

      if (this.newContentHover) {
        return " sectionSelection";
      }

      return "";
    },
  },
  components: {
    ContentSectionView,
    PageSectionEditor,
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
    deleteContentSection(ev) {
      this.section.deleteContentSection(ev.id);

      EventBus.$emit("modifyPageData");
    },
    duplicateContentSection(ev) {
      this.section.duplicateContentSection(ev.id);

      EventBus.$emit("modifyPageData");
    },
    deletePageSection() {
      this.$emit("deletePageSection", {
        id: this.section.id,
      });
    },
    showPageSectionEditor() {
      this.showEditor = true;
    },
    closeEditor() {
      console.log("Clsoing Editor");
      this.showEditor = false;
    },
    savePageData(ev) {
      if (!isObject(ev)) {
        return;
      }

      this.section.setName(ev.name);
      this.section.setClasses(ev.classes);

      this.closeEditor();
      EventBus.$emit("modifyPageData");
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

      if (this.newContentDragEvent) {
        this.newContentDrop();
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

      if (this.pageDragEvent) {
        this.pageDrag(ev);
      }

      if (this.newContentDragEvent) {
        this.newContentHover = true;
      }
    },
    onDragLeave() {
      this.newContentHover = false;
      this.hoverProportion = null;

      if (!this.pageDragEvent) {
        return;
      }

      this.$store.dispatch("dragLeavingPageSection");
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
    newContentDrop() {
      console.log(this.newContentDragEvent);
      const { type } = this.newContentDragEvent;

      this.section.addNewContentSection(type);
      EventBus.$emit("modifyPageData");
    },
    pageDrag(ev) {
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
  },
};
</script>

<style lang="scss" scoped>
  .sectionHolder {
    width: calc(100% - 4px);
    background-color: white;
    border: 2px solid #555;
    margin: 1em 0;
    position: relative;
  }

  .sectionSelection {
    background-color: #ccc;
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

  .topBar {
    display: grid;
    grid-template-columns: [edit-button] 2em [title-bar] auto [del-button] 2em [end];
    grid-template-rows: [start] auto [end];
    align-items: center;
    border-bottom: 1px solid #555;
    user-select: none;
  }

  .delBtn, .editBtn {
    text-align: center;
    width: 100%;
  }

  .buttonCenter,
  .titleCenter {
    grid-row-start: start;
    display: flex;
    align-items: center;
    align-self: stretch;
    font-size: 1.25em;
    font-weight: 700;
  }

  .titleCenter {
    background-color: #bbb;
    justify-content: flex-start;
    padding-left: 0.5em;
  }

  .buttonCenter {
    background-color: #ddd;
    justify-content: center;
  }

  .delBtn {
    grid-column-start: del-button;
  }
  .editBtn {
    grid-column-start: edit-button;
  }
  .title {
    grid-column-start: title-bar;
  }

</style>
