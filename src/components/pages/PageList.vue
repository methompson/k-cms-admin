<template>
  <div>
    <router-link to="/add-page">Add A New Page</router-link>

    <h1>Page List</h1>
    <div v-if="pageList.length === 0">
      <div>No Pages</div>
    </div>

    <div v-for="(page, index) in pageList" :key="page.id+index">
      <PageListItem
        :page="page"/>
    </div>
  </div>
</template>

<script>
import { isArray } from "@/shared/is-data";
import PageListItem from "@/components/components/PageListItem.vue";

export default {
  components: {
    PageListItem,
  },
  data() {
    return {
      pageList: [],
    };
  },
  mounted() {
    if (!this.checkLoginStatusAndRedirectOnFalse()) {
      return;
    }

    this.getPageList();
  },
  methods: {
    getPageList() {
      const url = `${process.env.VUE_APP_API_URL}api/pages/all-pages`;
      const requestHeaders = new Headers();
      requestHeaders.append("authorization", `Bearer ${this.userToken}`);

      fetch(url, {
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
          if (isArray(res)) {
            console.log(res);
            this.pageList = res;
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
