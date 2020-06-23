<template>
  <div>
    id: {{ page.id }}, name: {{ page.name }}, slug: {{ page.slug }}
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      default() {
        const d = new Date(0).toISOString();
        return {
          id: 0,
          name: "",
          meta: {},
          slug: "",
          enabled: "false",
          dateAdded: d,
          datedModified: d,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
