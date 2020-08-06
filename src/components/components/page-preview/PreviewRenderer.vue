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
  computed: {
    output() {
      return JSON.stringify(this.pageData);
    },
  },
  methods: {
    sizeToClass(size) {
      const converter = {
        "1/16": "width_1_16",
        "1/8": "width_1_8",
        "1/6": "width_1_6",
        "1/5": "width_1_5",
        "1/4": "width_1_4",
        "1/3": "width_1_3",
        "1/2": "width_1_2",
        "2/3": "width_2_3",
        "3/5": "width_3_5",
        "3/4": "width_3_4",
        "5/6": "width_5_6",
        "1/1": "width_1_1",
      };

      return size in converter
        ? converter[size]
        : "";
    },
  },
};
</script>

<style lang="scss" scoped>
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

  .width_1_16 { width: calc(100% / 16); }
  .width_1_8 { width: calc(100% / 8); }
  .width_1_6 { width: calc(100% / 6); }
  .width_1_5 { width: calc(100% / 5); }
  .width_1_4 { width: calc(100% / 4); }
  .width_1_3 { width: calc(100% / 3); }
  .width_1_2 { width: calc(100% / 2); }
  .width_2_3 { width: calc(100% * (2 / 3)); }
  .width_3_5 { width: calc(100% * (3 / 5)); }
  .width_3_4 { width: calc(100% * (3 / 4)); }
  .width_5_6 { width: calc(100% * (5 / 6)); }
  .width_1_1 { width: calc(100%); }
</style>
