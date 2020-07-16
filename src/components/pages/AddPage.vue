<template>
  <div>
    <h1>Add a New Page</h1>

    <PageOrganizer
      @saveToServer="saveToServer"/>
  </div>
</template>

<script>
import { isObject, isUndefined } from "@/shared/is-data";

import PageOrganizer from "@/components/components/page-builder/PageOrganizer.vue";

export default {
  components: {
    PageOrganizer,
  },
  methods: {
    saveToServer(ev) {
      console.log("Saving", ev);

      const url = `${process.env.VUE_APP_API_URL}api/pages/add-page`;

      const requestHeaders = new Headers();
      requestHeaders.append("authorization", `Bearer ${this.userToken}`);
      requestHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        page: {
          slug: ev.pageSlug,
          name: ev.pageName,
          enabled: true,
          content: ev.pageContent,
          meta: {
            title: ev.pageTitle,
            containerClasses: ev.containerClasses,
          },
        },
      });

      console.log(url, body);

      return fetch(url, {
        method: "POST",
        headers: requestHeaders,
        body,
      })
        .then((res) => {
          if (!res.ok) {
            return res.json()
              .then((msg) => {
                throw msg;
              });
          }

          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (isObject(res)
            && !isUndefined(res.id)
          ) {
            // route to editPage
            this.$router.push(`/edit-page/${res.id}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
