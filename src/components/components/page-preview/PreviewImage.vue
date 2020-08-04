<template>
  <span>
    <img :src="sectionData.content" />
  </span>
</template>

<script>
export default {
  props: {
    sectionData: {
      type: Object,
      default() {
        return {
          content: "",
        };
      },
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
  img {
    width: 100%;
  }
</style>
