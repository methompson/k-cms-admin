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
  data() {
    return {
      backgroundAuthCheckTimeout: null,
    };
  },
  methods: {
    isUserLoggedIn() {
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
        clearTimeout(this.backgroundAuthCheckTimeout);
        return false;
      }

      return true;
    },
    /**
     * We check every 30 seconds whether the user is logged in. We use the
     * checkLoginStatusAndRedirectOnFalse method to make this check and redirec the user to
     * the login screen. This allows us to maintain control of the UI and prevent a stale
     * session from trying to make requests it can't make any longer.
     */
    backgroundAuthCheck() {
      const result = this.checkLoginStatusAndRedirectOnFalse();

      if (result) {
        this.backgroundAuthCheckTimeout = setTimeout(() => {
          this.backgroundAuthCheck();
        }, 30000);
      }
    },
  },
};
