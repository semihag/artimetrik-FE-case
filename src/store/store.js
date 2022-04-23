import { createStore } from "vuex";
import usersData from "../data/users.json";
import usersDetailData from "../data/users_detail.json";
import coursesData from "../data/courses.json";

export default createStore({
  state: {
    users: usersData,
    userDetails: usersDetailData,
    courses: coursesData,
  },
  getters: {
    ALL_USERS_COUNT() {
      return usersData.length;
    },
    FILTERED_USERS_COUNT(state) {
      return state.users.length;
    },
    USERS(state) {
      return state.users;
    },
    USER_DETAILS(state) {
      return state.userDetails;
    },
    COURSES(state) {
      return state.courses;
    },
  },
  mutations: {
    UPDATE_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    FILTER_USERS(context, payLoad) {
      var filteredUsers = usersData;
      if (payLoad.searchText != null) {
        filteredUsers = filteredUsers.filter((user) =>
          user.name.toUpperCase().includes(payLoad.searchText.toUpperCase())
        );
      }

      if (payLoad.status != null) {
        filteredUsers = filteredUsers.filter(
          (user) => user.status == payLoad.status
        );
      }

      context.commit("UPDATE_USERS", filteredUsers);
    },
  },
});
