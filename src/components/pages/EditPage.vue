<template>
  <div>
    <PageBuilder
      v-if="savedContent"
      :savedContent="savedContent"
      @saveToServer="editPage"/>
  </div>
</template>

<script>
import { isUndefined } from "@/shared/is-data";

import PageBuilder from "@/components/components/page-builder/PageBuilder.vue";

export default {
  components: {
    PageBuilder,
  },
  data() {
    return {
      pageId: "",
      savedContent: null,
    };
  },
  mounted() {
    if (!(this.$route?.params?.pageId)) {
      console.log("Mounted, invalid data");
      this.$router.push('/');
      return;
    }

    console.log("Mounted, OK");

    this.pageId = this.$route.params.pageId;
    this.getPage();
  },
  methods: {
    getPage() {
      const url = `${process.env.VUE_APP_API_URL}api/pages/get-page/${this.pageId}`;
      const requestHeaders = new Headers();
      requestHeaders.append("authorization", `Bearer ${this.userToken}`);
      requestHeaders.append("Content-Type", "application/json");

      return fetch(url, {
        headers: requestHeaders,
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
          this.savedContent = res;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editPage(ev) {
      const url = `${process.env.VUE_APP_API_URL}api/pages/edit-page`;

      const requestHeaders = new Headers();
      requestHeaders.append("authorization", `Bearer ${this.userToken}`);
      requestHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        page: {
          id: ev.id,
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
            throw `Error editing ${ev.pageName} on the server`;
          }

          // Show Success Message
          this.$store.dispatch("addMessage", {
            msg: `${ev.pageName} Has Been Edited`,
            type: "success",
            timeout: 15,
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

</style>
