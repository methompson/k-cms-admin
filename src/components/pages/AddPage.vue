<template>
  <div>
    <h1>Add a New Page</h1>

    <PageBuilder
      @saveToServer="saveToServer"/>
  </div>
</template>

<script>
import { isUndefined } from "@/shared/is-data";

import PageBuilder from "@/components/components/page-builder/PageBuilder.vue";

export default {
  components: {
    PageBuilder,
  },
  methods: {
    saveToServer(ev) {
      console.log("Saving");

      const url = `${process.env.VUE_APP_API_URL}api/pages/add-page`;

      const requestHeaders = new Headers();
      requestHeaders.append("authorization", `Bearer ${this.userToken}`);
      requestHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        page: {
          slug: ev.pageSlug,
          name: ev.pageName,
          enabled: ev.enabled,
          content: ev.pageContent,
          meta: {
            title: ev.pageTitle,
            containerClasses: ev.containerClasses,
          },
        },
      });

      return fetch(url, {
        method: "POST",
        headers: requestHeaders,
        body,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return res.json()
            .then((msg) => {
              throw msg;
            });
        })
        .then((res) => {
          console.log(res);
          if (isUndefined(res?.id)) {
            throw "Error adding new page to the server";
          }

          // Show Success Message
          this.$store.dispatch("addMessage", {
            msg: "Successfully Added New Page",
            type: "success",
            timeout: 15,
          });

          // route to editPage
          this.$router.push(`/edit-page/${res.id}`);
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

</style>
