<template>
  <div>
    <router-link to="/add-blog-post">Add A New Blog Post</router-link>

    <h1>Blog List</h1>

    <LoadingContainer :visible="finishedLoading">
      <div v-if="blogList.length === 0">
        <div>No Blog Posts</div>
      </div>

      <div v-else v-for="post in blogList" :key="post.id"></div>
    </LoadingContainer>

  </div>
</template>

<script>
import { isArray } from "@/shared/is-data";

import LoadingContainer from "@/components/components/LoadingContainer.vue";

export default {
  components: {
    LoadingContainer,
  },
  data() {
    return {
      blogList: [],
      finishedLoading: false,
    };
  },
  mounted() {
    this.getBlogList();
  },
  methods: {
    getBlogList() {
      const url = `${process.env.VUE_APP_API_URL}api/blog/all-blog-posts`;
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
          console.log(res);
          if (isArray(res)) {
            this.blogList = res;
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.finishedLoading = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
