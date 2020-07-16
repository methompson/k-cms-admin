<template>
  <div>
    id: {{ page.id }}, name: {{ page.name }}, slug: {{ page.slug }} <router-link :to="`/edit-page/${page.id}`">Edit</router-link>
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
          dateModified: d,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
