<template>
  <span :class="`pageSection ${contentSection.width.class}`">
    <span
      :draggable="draggable"
      :class="`outerBounds ${selectionClass}` + (isDraggedSection ? ' ghost' : '')"
      @dragend="onDragEnd"
      @dragstart="onDragStart">

      <div
        class="container"
        @dragover="onDragOver"
        @dragleave="onDragLeave">
        <span
          :class="coverClass"
          @drop="onDrop"/>

        <span @click="shrinkSection" class="shrinkBtn">-</span>
        <span @click="growSection" class="growBtn">+</span>
        <span @click="showContentEditor" class="editBtn fas">&#xf044;</span>

        <span
          class="titleBar"
          @mousedown="onMouseDown"
          @mouseup="onMouseUp">
            {{ this.contentSection.width.name }}
        </span>

        <span @click="deleteSection" class="closeBtn fas">&#xf057;</span>

        <span class="content">
          <!-- Section {{ this.contentSection.id }} -->
          <div>
            Type: {{ this.contentSection.type }}
          </div>
          <div>
            Name: {{ this.contentSection.contentMeta.name }}
          </div>
        </span>

      </div>
    </span>

    <TextContentEditor
      v-if="showEditor && contentSection.type === 'text'"
      :contentSection="this.contentSection"
      @saveData="saveContentData"
      @closeEditor="closeEditor" />
    <HTMLContentEditor
      v-if="showEditor && contentSection.type === 'html'"
      :contentSection="this.contentSection"
      @saveData="saveContentData"
      @closeEditor="closeEditor" />
    <ImageContentEditor
      v-if="showEditor && contentSection.type === 'image'"
      :contentSection="this.contentSection"
      @saveData="saveContentData"
      @closeEditor="closeEditor" />
  </span>
</template>

<script>
import { mapState } from 'vuex';

import ContentSection from "@/shared/page-creator/ContentSection";
import { isObject } from "@/shared/is-data";
import EventBus from "@/shared/event-bus";

import TextContentEditor from "./TextContentEditor.vue";
import HTMLContentEditor from "./HTMLContentEditor.vue";
import ImageContentEditor from "./ImageContentEditor.vue";

export default {
  components: {
    TextContentEditor,
    HTMLContentEditor,
    ImageContentEditor,
  },
  props: {
    contentSection: {
      type: ContentSection,
      default() {
        return {
          id: "default",
          name: "default",
          width: {
            class: "",
          },
        };
      },
    },
    parentContainer: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      draggable: false,
      containerEl: null,
      hoverProportion: null,
      showEditor: false,
    };
  },
  computed: {
    ...mapState([
      "contentDragEvent",
      "newContentDragEvent",
    ]),
    coverClass() {
      let className = "cover";

      if (this.isDraggedOver) {
        className += " hoverOver";
      }

      if (!this.contentDragEvent && !this.newContentDragEvent) {
        className += " disappeared";
      }

      // contentDragEvent.draggedSection === '' ? ' disappeared' : ''

      return className;
    },
    isDraggedSection() {
      if (this.contentDragEvent) {
        return this.contentSection.id === this.contentDragEvent.draggedSection;
      }

      return false;
    },
    isDraggedOver() {
      if (this.contentDragEvent) {
        return this.contentSection.id === this.contentDragEvent.targetSection;
      }

      if (this.newContentDragEvent) {
        return this.contentSection.id === this.newContentDragEvent.targetSection;
      }

      return false;
    },
    selectionClass() {
      if (!this.isDraggedOver
        || !this.hoverProportion
      ) {
        return "";
      }

      if (this.hoverProportion > 0.5
      ) {
        return "selectionRight";
      }

      return "selectionLeft";
    },
  },
  methods: {
    growSection() {
      this.contentSection.increaseSize();
      EventBus.$emit("modifyPageData");
    },
    shrinkSection() {
      this.contentSection.decreaseSize();
      EventBus.$emit("modifyPageData");
    },
    deleteSection() {
      this.$emit("deleteContentSection", {
        id: this.contentSection.id,
      });
    },
    onMouseDown() {
      // TODO listen for left mouse click only
      this.draggable = true;
    },
    onMouseUp(ev) {
      this.onDragEnd(ev);
    },
    onDragStart(ev) {
      ev.dataTransfer.setData('text/plain', null);
      this.$store.dispatch("startContentSectionDrag", {
        id: this.contentSection.id,
        parentId: this.parentContainer,
      });

      // Prevents the elements below from dragging too
      ev.stopPropagation();
    },
    onDragEnd() {
      this.draggable = false;
      this.$store.dispatch("stopContentSectionDrag");
    },
    onDragOver(ev) {
      ev.preventDefault();
      if (this.contentDragEvent) {
        this.contentDragEventHoverHandler(ev);
      } else if (this.newContentDragEvent) {
        this.newContentDragEventHoverHandler(ev);
      }
    },
    contentDragEventHoverHandler(ev) {
      if (this.contentDragEvent.draggedSection === this.contentDragEvent.targetSection) {
        return;
      }

      this.$store.dispatch("draggingOverContent", {
        id: this.contentSection.id,
        parentId: this.parentContainer,
      });

      this.commonHoverHandler(ev);
    },
    newContentDragEventHoverHandler(ev) {
      this.$store.dispatch("newContentDragOverContentSection", {
        targetSection: this.contentSection.id,
        targetSectionParent: this.parentContainer,
      });

      this.commonHoverHandler(ev);
    },
    commonHoverHandler(ev) {
      const { target } = ev;
      const targetDimensions = target.getBoundingClientRect();
      const posInEl = ev.clientX - targetDimensions.x;
      const proportion = posInEl / targetDimensions.width;

      this.hoverProportion = proportion;
    },
    /**
     * The dragged element has left the bounds of this content. We no longer
     * record this content as being part of the drag and drop event.
     */
    onDragLeave() {
      if (this.contentDragEvent) {
        this.$store.dispatch("dragLeavingContent");
      }

      if (this.newContentDragEvent) {
        this.$store.dispatch("newContentDragLeaveContentSection");
      }
      this.hoverProportion = null;
    },
    onDrop(ev) {
      ev.preventDefault();
      ev.stopPropagation();

      if (this.contentDragEvent) {
        this.contentDragEventHandler();
      } else if (this.newContentDragEvent) {
        this.newContentDragEventHandler();
      }

      this.onDragLeave();
    },
    contentDragEventHandler() {
      if (this.contentDragEvent.draggedSection === this.contentDragEvent.targetSection) {
        return;
      }

      EventBus.$emit("contentSectionChange", {
        droppedContent: this.contentDragEvent.draggedSection,
        droppedContentParentId: this.contentDragEvent.draggedParent,
        droppedOverContent: this.contentDragEvent.targetSection,
        droppedOverContentParentId: this.contentDragEvent.targetParent,
        hoverProportion: this.hoverProportion,
      });
    },
    newContentDragEventHandler() {
      console.log("New Content Event");
      EventBus.$emit("newContentSectionDropOnContent", {
        type: this.newContentDragEvent.type,
        dropTarget: this.contentSection.id,
        dropTargetParent: this.parentContainer,
        hoverProportion: this.hoverProportion,
      });
    },
    closeEditor() {
      this.showEditor = false;
    },
    showContentEditor() {
      this.showEditor = true;
    },
    saveContentData(ev) {
      console.log("Saving", ev);
      if (!isObject(ev)) {
        return;
      }

      this.contentSection.setName(ev.name);
      this.contentSection.setClasses(ev.classes);
      this.contentSection.setContent(ev.content);

      this.closeEditor();

      EventBus.$emit("modifyPageData");
    },
  },
};
</script>

<style lang="scss" scoped>
  .pageSection {
    border: 0;
    display: inline-block;
    margin: 0;
    padding: 0;
    position: relative;
  }

  .cover {
    background-color: lime;
    // background-color: transparent;
    top: 0;
    left: 0;
    z-index: 999;
    position: absolute;
    opacity: 0.5;
    width: 100%;
    height: 100%;
  }

  .hoverOver {
    // background-color: transparent;
    background-color: forestgreen;
  }

  .disappeared {
    display: none;
  }

  .outerBounds {
    display: flex;
    padding: 0;
    background-color: yellow;
    margin: 0.25em;
    border: 2px solid black;
  }

  .selectionLeft {
    border-left: 2px solid red;
  }
  .selectionRight {
    border-right: 2px solid red;
  }

  .container {
    display: grid;
    width: 100%;
    grid-template-columns: [minus-button] 2em [plus-button] 2em [edit-button] 2em [title-bar] auto [close-button] 2em [end];
    grid-template-rows: [top-bar] auto [content] auto [end];
  }

  .growBtn,
  .shrinkBtn,
  .editBtn,
  .titleBar,
  .closeBtn {
    background-color: teal;
    text-align: center;
    width: 100%;
    font-size: 1.25em;
    font-weight: 700;
    grid-row-start: top-bar;
    grid-row-end: content;
    justify-self: center;
    align-self: center;
    user-select: none;
  }

  .shrinkBtn {
    grid-column-start: minus-button;
  }

  .growBtn {
    grid-column-start: plus-button;
  }

  .editBtn {
    grid-column-start: edit-button;
  }

  .titleBar {
    width: 100%;
    background-color: red;
    grid-column-start: title-bar;
  }

  .closeBtn {
    grid-column-start: close-button;
  }

  .content {
    grid-column-start: minus-button;
    grid-column-end: end;
    grid-row-start: content;
    grid-row-end: end;
    padding: 0 0.25em 0.25em;
  }

  .width_1_16 { width: calc(100% / 16); }
  .width_1_8 { width: calc(100% / 8); }
  .width_1_6 { width: calc(100% / 6); }
  .width_1_5 { width: calc(100% / 5); }
  .width_1_4 { width: calc(100% / 4); }
  .width_1_3 { width: calc(100% / 3); }
  .width_1_2 { width: calc(100% / 2); }
  .width_2_3 { width: calc(100% * (2 / 3)); }
  .width_3_4 { width: calc(100% * (3 / 4)); }
  .width_5_6 { width: calc(100% * (5 / 6)); }
  .width_1_1 { width: calc(100%); }

</style>
