<template>
  <div>
    <component
      :is="renderedComponent"
      :sectionData="sectionData" />
  </div>
</template>

<script>
import { isUndefined } from "@/shared/is-data";

import pageComponents from "./page-components";

export default {
  props: {
    sectionData: {
      type: Object,
      default() {
        return {
          type: "",
        };
      },
    },
  },
  computed: {
    renderedComponent() {
      const component = pageComponents[this.sectionData.type];
      console.log("component", component);
      if (!isUndefined(component)) {
        return component;
      }

      return pageComponents.text;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
