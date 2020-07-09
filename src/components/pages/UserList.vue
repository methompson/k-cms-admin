<template>
  <div>
    <router-link v-if="canAddUsers" to="/add-user">Add A New User</router-link>

    <h1>User List</h1>

    <LoadingContainer
      :visible="finishedLoading">
      <div v-if="userList.length === 0">
        <div>No Users</div>
      </div>

      <div v-for="user in userList" :key="user.id">
        {{ user.id }} {{ user.username }} {{ user.email }} {{ user.userType }} <router-link :to="`/edit-user/${user.id}`">Edit</router-link>
      </div>
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
      userList: [],
      finishedLoading: false,
    };
  },
  computed: {
    canAddUsers() {
      return this.decodedUserToken.userType === "superAdmin" || this.decodedUserToken.userType === "admin";
    },
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      const url = `${process.env.VUE_APP_API_URL}api/user/all-users`;
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
            this.userList = res;
          } else {
            throw "Invalid Data From Server";
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
