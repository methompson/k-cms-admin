<template>
  <div>
    <span v-html="sectionData.content" />
  </div>
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
};
</script>

<style lang="scss" scoped>

</style>
