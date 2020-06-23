<template>
  <div>
    <h1>Home</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      "userToken",
    ]),
  },
  mounted() {
    if (!this.isUserLoggedIn()) {
      this.$router.push('login');
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
