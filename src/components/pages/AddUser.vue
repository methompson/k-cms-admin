<template>
  <div>
    <h1>Add a New User</h1>

    <div>Email Address <input type="text" v-model="newUserEmail" /></div>
    <div>Username <input type="text" v-model="newUserUsername" /></div>
    <div>Password <input type="password" v-model="newUserPassword" /></div>
    <div>First Name <input type="text" v-model="newUserFirstName" /></div>
    <div>Last Name <input type="text" v-model="newUserLastName"/></div>

    <div>
      User Type
      <select v-model="newUserType">
        <option disabled value="">Please select one</option>
        <option v-for="(type, index) in selectableUserTypes" :key="`${index}_${type}`">
          {{ type }}
        </option>
      </select>
    </div>

    <div><input type="checkbox" v-model="newUserEnabled" /> User Enabled</div>

    <button type="button" :disabled="!canAddUser" @click="addNewUser">Add New User</button>

    <div class="loginErrors">
      <div v-for="(err, index) in submitUserError" :key="`errors_${index}`">
        {{ err }}
      </div>
    </div>
  </div>
</template>

<script>
import { isArray, isObject, isString } from "@/shared/is-data";

export default {
  mounted() {
    if (!this.canAddUser) {
      this.$router.push('/');
      return;
    }

    this.getUserTypes();
  },
  data() {
    return {
      userTypeOptions: ['admin', 'superAdmin', 'editor'],
      newUserEmail: "",
      newUserUsername: "",
      newUserPassword: "",
      newUserFirstName: "",
      newUserLastName: "",
      newUserType: "",
      newUserEnabled: true,
      submitUserError: [],
    };
  },
  computed: {
    canAddUser() {
      return this.decodedUserToken.userType === "superAdmin" || this.decodedUserToken.userType === "admin";
    },
    selectableUserTypes() {
      if (this.decodedUserToken.userType === "superAdmin") {
        return this.userTypeOptions;
      }

      const types = this.userTypeOptions.filter((el) => {
        return el !== "superAdmin";
      });

      return types;
    },
    checkUserFields() {
      const err = [];

      console.log(this.newUserPassword.length);

      if (this.newUserEmail.length === 0) {
        err.push("The Email field is required");
      }

      if (this.newUserUsername.length === 0) {
        err.push("The Username field is required");
      }

      if (this.newUserPassword.length === 0) {
        err.push("The Password field is required");
      } else if (this.newUserPassword.length < 8) {
        err.push("Your Password must be 8 characters or more");
      }

      if (this.newUserType.length === 0) {
        err.push("You must select a 'User Type'");
      }

      return err;
    },
  },
  methods: {
    addNewUser() {
      if (this.checkUserFields.length > 0) {
        this.submitUserError = this.checkUserFields;
        return Promise.resolve();
      }

      this.submitUserError = [];
      const url = `${process.env.VUE_APP_API_URL}api/user/add-user`;

      const requestHeaders = new Headers();
      requestHeaders.append("authorization", `Bearer ${this.userToken}`);
      requestHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        newUser: {
          username: this.newUserUsername,
          password: this.newUserPassword,
          email: this.newUserEmail,
          userType: this.newUserType,
          enabled: this.newUserEnabled,
          firstName: this.newUserFirstName,
          lastName: this.newUserLastName,
          userMeta: {},
        },
      });

      return fetch(url, {
        method: "POST",
        headers: requestHeaders,
        body,
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

          if (isObject(res)
            && "id" in res
            && "message" in res
          ) {
            // Do Something to say this was successful
            console.log("User Added Successfully");
          } else {
            throw "Invalid Data From Server";
          }
        })
        .catch((err) => {
          if (isObject(err)
            && "error" in err
          ) {
            // Do Something to indicate that this was unsuccessful
            console.log("User not added with error", err.error);
            this.submitUserError = [
              err.error,
            ];
          } else if (isString(err)) {
            this.submitUserError = [
              err,
            ];
          } else {
            this.submitUserError = [
              "Invalid Data From Server",
            ];
          }
          console.log(err);
        });
    },
    getUserTypes() {
      const url = `${process.env.VUE_APP_API_URL}api/user/get-user-types`;
      const requestHeaders = new Headers();
      requestHeaders.append("authorization", `Bearer ${this.userToken}`);

      return fetch(url, {
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
            this.userTypeOptions = res;
          } else {
            throw "Invalid Data From Server";
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
  .loginErrors {
    color: red;
    font-weight: 700;
  }
</style>
