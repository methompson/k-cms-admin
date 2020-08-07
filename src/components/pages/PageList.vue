<template>
  <div>
    <router-link to="/add-page">Add A New Page</router-link>

    <h1>Page List</h1>

    <LoadingContainer
      :visible="finishedLoading">
      <div v-if="pageList.length === 0">
        <div>No Pages</div>
      </div>

      <div v-for="page in pageList" :key="page.id">
        <PageListItem
          :page="page"
          @deletePage="deletePage"/>
      </div>
    </LoadingContainer>

    <div>

    </div>

  </div>
</template>

<script>
import { isArray } from "@/shared/is-data";
import PageListItem from "@/components/components/PageListItem.vue";
import LoadingContainer from "@/components/components/LoadingContainer.vue";

export default {
  components: {
    PageListItem,
    LoadingContainer,
  },
  data() {
    return {
      pageList: [],
      finishedLoading: false,
    };
  },
  mounted() {
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
            // console.log(res);
            this.pageList = res;
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.finishedLoading = true;
        });
    },
    deletePage() {
      this.getPageList();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
