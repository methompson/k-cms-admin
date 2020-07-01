<template>
  <span :class="`pageSection ${contentSection.width.class}`" >
    <span :class="'outerBounds' + (isDraggedSection ? ' ghost' : '')">

      <div class="container">

        <span @click="shrinkSection" class="shrinkBtn">-</span>
        <span @click="growSection" class="growBtn">+</span>

        <span class="titleBar" @mousedown="mouseDownEvent" @mouseup="mouseUpEvent">{{ this.contentSection.width.name }}</span>

        <span @click="deleteSection" class="closeBtn">X</span>

        <span class="content">
          Section {{ this.contentSection.id }}
        </span>

      </div>
    </span>
  </span>
</template>

<script>
import ContentSection from "@/shared/ContentSection";

export default {
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
    draggedSection: {
      type: String,
      default: "",
    },
  },
  computed: {
    isDraggedSection() {
      return this.contentSection.id === this.draggedSection;
    },
  },
  methods: {
    growSection() {
      console.log("Growing");
      this.contentSection.increaseSize();
    },
    shrinkSection() {
      console.log("Shrinking");
      this.contentSection.decreaseSize();
    },
    deleteSection() {
      this.$emit("deleteContentSection", {
        id: this.contentSection.id,
      });
    },
    mouseDownEvent(ev) {
      console.log("Mouse Down", ev);
      this.$emit("mouseDownEvent", {
        id: this.contentSection.id,
      });
    },
    mouseUpEvent(ev) {
      console.log("Mouse Up", ev);
      this.$emit("mouseUpEvent", {
        id: this.contentSection.id,
      });
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
  }

  .outerBounds {
    display: flex;
    padding: 0;
    background-color: yellow;
    margin: 0.25em;
    border: 1px solid black;
  }

  .container {
    display: grid;
    width: 100%;
    grid-template-columns: [minus-button] 2em [plus-button] 2em [title-bar] auto [close-button] 2em [end];
    grid-template-rows: [top-bar] auto [content] auto [end];
  }

  .growBtn,
  .shrinkBtn,
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
    grid-column-end: plus-button;
  }

  .growBtn {
    grid-column-start: plus-button;
    grid-column-end: title-bar;
  }

  .titleBar {
    width: 100%;
    background-color: red;
    grid-column-start: title-bar;
    grid-column-end: close-button;
  }

  .closeBtn {
    grid-column-start: close-button;
    grid-column-end: end;
  }

  .content {
    grid-column-start: minus-button;
    grid-column-end: end;
    grid-row-start: content;
    grid-row-end: end;
    padding: 0 0.25em 0.25em;
  }

  .ghost {
    opacity: 0.2;
  }

  .width_1_16 { width: calc(100% / 16); }
  .width_1_8 { width: calc(100% / 8); }
  .width_1_6 { width: calc(100% / 6); }
  .width_1_5 { width: calc(100% / 5); }
  .width_1_4 { width: calc(100% / 4); }
  .width_1_3 { width: calc(100% / 3); }
  .width_1_2 { width: calc(100% / 2); }
  .width_1 { width: calc(100%); }

</style>
