<template>
  <div>
    <PreviewRenderer
      :pageData="pageData" />
  </div>
</template>

<script>
import PreviewRenderer from "@/components/components/page-preview/PreviewRenderer.vue";

export default {
  components: {
    PreviewRenderer,
  },
  data() {
    const { pageId } = this.$route.params;
    const localStoreName = `preview_${pageId}`;
    return {
      pageId,
      localStoreName,
      storageData: "{}",
    };
  },
  computed: {
    pageData() {
      let output;
      try {
        output = JSON.parse(this.storageData);
      } catch (e) {
        output = {};
      }

      console.log("output", output);

      return output;
    },
  },
  mounted() {
    console.log(this.pageData);
    window.addEventListener("storage", this.getData);
    this.getData();
  },
  beforeDestroy() {
  },
  methods: {
    getData() {
      this.storageData = localStorage.getItem(this.localStoreName);
    },
  },
};
</script>
