<template>
  <div>
    <PageOrganizer
      v-if="savedContent"
      :savedContent="savedContent"
      @saveToServer="editPage"/>
  </div>
</template>

<script>
import PageOrganizer from "@/components/components/page-builder/PageOrganizer.vue";

export default {
  components: {
    PageOrganizer,
  },
  data() {
    return {
      pageId: "",
      savedContent: null,
    };
  },
  mounted() {
    if (!("params" in this.$route)
      || !("pageId" in this.$route.params)
    ) {
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
    editPage() {
      console.log("Editing the page!");
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
