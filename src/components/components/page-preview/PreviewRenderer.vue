<template>
  <div
    class="pageContainer">
    <div
      v-for="(content, index) in pageData.pageContent"
      :key="index"
      class="pageSection">
      <span
        v-for="(section, sectionIndex) in content.contentSections"
        :key="sectionIndex"
        :class="'contentSection ' + sizeToClass(section.width)">
        <PreviewComponent
          :sectionData="section" />
      </span>
    </div>
  </div>
</template>

<script>
import { sizeToClass } from "@/shared/content-widths";

import PreviewComponent from "./PreviewComponent.vue";

export default {
  components: {
    PreviewComponent,
  },
  props: {
    pageData: {
      type: Object,
      default() {
        return {
          pageContent: [],
        };
      },
    },
  },
  data() {
    return {
      sizeToClass,
    };
  },
  computed: {
    output() {
      return JSON.stringify(this.pageData);
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
  @import "@/common.scss";

  .pageContainer {
    border: 1px solid black;
  }

  .pageSection {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    text-align: center;
  }

  .contentSection {
    display: inline-block;
  }

</style>
