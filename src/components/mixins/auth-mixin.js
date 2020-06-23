import { mapState } from 'vuex';

import { isString, isObject } from "@/shared/is-data";
import { isTokenValid } from "@/shared/auth-utils";

export default {
  computed: {
    ...mapState([
      "userToken",
      "decodedUserToken",
    ]),
  },
  methods: {
    isUserLoggedIn() {
      // console.log(this.userToken);
      // console.log(this.decodedUserToken);

      if (!this.userToken
        || !this.decodedUserToken
        || !isString(this.userToken)
        || !isObject(this.decodedUserToken)
      ) {
        return false;
      }

      if (!isTokenValid(this.decodedUserToken)) {
        this.$store.dispatch("logout");
        return false;
      }

      return true;
    },
    /**
     * Checks if the user is logged in. If they are not logged in, the function
     * redirects to the login page. If they are logged in, the function does nothing.
     *
     * @returns {Boolean} Value tells the function whether the user is logged in or not.
     */
    checkLoginStatusAndRedirectOnFalse() {
      if (!this.isUserLoggedIn()) {
        console.log("Not Logged In");
        this.$router.push("/login");
        return false;
      }

      return true;
    },
  },
};
