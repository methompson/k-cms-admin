<template>
  <div>
    <h1>Login</h1>
    <div>
      <span>UserName</span>
      <input type="text" v-model="username" />
    </div>

    <div>
      <span>Password</span>
      <input type="password" v-model="password" />
    </div>

    <div>
      <button type="button" @click="login">Log In</button>
    </div>
  </div>
</template>

<script>
import { isObject } from "@/shared/is-data";

export default {
  mounted() {
    if (this.isUserLoggedIn()) {
      console.log("Logged In");
      this.$router.push("/home");
    }
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      return this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      })
        .then(() => {
          this.$router.push('/');
          this.backgroundAuthCheck();
        })
        .catch((err) => {
          let errorMsg = "Error Logging In";

          if (isObject(err) && 'error' in err) {
            errorMsg = `${errorMsg}: ${err.error}`;
          }

          this.$store.dispatch("addMessage", {
            msg: errorMsg,
            type: "error",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
