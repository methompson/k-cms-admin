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
    if (!this.userToken) {
      this.$router.push('Login');
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
