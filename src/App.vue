<template>
  <RouterView />
</template>

<script>
import usersJson from "./data/users.json";
import usersDetailJson from "./data/users_detail.json";
import coursesJson from "./data/courses.json";
export default {
  data() {
    return {
      open: false,
    };
  },
  created() {
    if (localStorage.getItem("usersData") == null) {
      localStorage.setItem("usersData", JSON.stringify(usersJson));
    }
    if (localStorage.getItem("userDetailsData") == null) {
      localStorage.setItem("userDetailsData", JSON.stringify(usersDetailJson));
    }
    if (localStorage.getItem("coursesData") == null) {
      localStorage.setItem("coursesData", JSON.stringify(coursesJson));
    }
  },
};
</script>

