<template>
  <div>
    <span>id: {{ page.id }}, name: {{ page.name }}, slug: {{ page.slug }}</span>
    <router-link :to="`/edit-page/${page.id}`">Edit</router-link>
    <span @click="deletePage" class="fakeLink">Delete</span>
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
  methods: {
    deletePage() {
      console.log(this.page.id);

      const url = `${process.env.VUE_APP_API_URL}api/pages/delete-page`;
      const headers = new Headers();
      headers.append("authorization", `Bearer ${this.userToken}`);
      headers.append("Content-Type", "application/json");

      const body = JSON.stringify({
        page: {
          id: this.page.id,
        },
      });

      return fetch(url, {
        method: "POST",
        headers,
        body,
      })
        .then((res) => {
          if (res.ok) {
            return this.$store.dispatch("addMessage", {
              msg: `Successfully Deleted ${this.page.name}`,
              type: "success",
              timeout: 15,
            });
          }

          return res.json()
            .then((msg) => {
              throw msg;
            });
        })
        .then(() => {
          return this.$emit("deletePage", {
            id: this.page.id,
          });
        })
        .catch((err) => {
          console.log(err);
          this.$store.dispatch("addMessage", {
            msg: err,
            type: "error",
            timeout: 15,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  span {
    padding: 0 1em;
  }
</style>
