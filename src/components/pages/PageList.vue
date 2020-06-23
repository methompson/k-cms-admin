<template>
  <div>
    <div v-for="(page, index) in pageList" :key="page.id+index">
      id: {{ page.id }}, name: {{ page.name }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { isArray } from "@/shared/is-data";

export default {
  computed: {
    ...mapState([
      "userToken",
    ]),
  },
  data() {
    return {
      pageList: [],
    };
  },
  mounted() {
    if (!this.isUserLoggedIn()) {
      console.log("Not Logged In");
      this.$router.push("/login");
      return;
    }

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
      });
  },
};
</script>

<style lang="scss" scoped>

</style>
