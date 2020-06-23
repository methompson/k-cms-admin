import { mapState } from 'vuex';

import { isString, isObject } from "@/shared/is-data";

export default {
  computed: {
    ...mapState([
      "userToken",
      "decodedUserToken",
    ]),
  },
  methods: {
    isUserLoggedIn() {
      console.log(this.userToken);
      console.log(this.decodedUserToken);
      if (!this.userToken
        || !this.decodedUserToken
        || !isString(this.userToken)
        || !isObject(this.decodedUserToken)
      ) {
        return false;
      }

      return true;
    },
  },
};
