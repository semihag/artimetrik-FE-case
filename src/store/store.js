import { createStore } from "vuex";
import usersData from "../data/users.json";
import usersDetailData from "../data/users_detail.json";
import coursesData from "../data/courses.json";

export default createStore({
  state: {},
  getters: {
      GET_USERS() {
          return usersData;
      }
  },
  mutations: {},
  actions: {},
});
