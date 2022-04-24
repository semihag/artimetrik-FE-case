import { createStore } from "vuex";

export default createStore({
  state: {
    users: JSON.parse(localStorage.getItem("usersData")),
    userDetails: JSON.parse(localStorage.getItem("userDetailsData")),
    courses: JSON.parse(localStorage.getItem("coursesData")),
    isModalOpen: false,
    isNewUserFormOpen: false,
    isEditUserFormOpen: false,
    isNewCourseFormOpen: false,
  },
  getters: {
    ALL_USERS_COUNT: (_) => {
      let allUsersData = JSON.parse(localStorage.getItem("usersData"));
      return allUsersData.length;
    },
    FILTERED_USERS_COUNT: (state) => state.users.length,
    USERS: (state) => state.users,
    USER_DETAILS: (state) => state.userDetails,
    COURSES: (state) => state.courses,
    IS_MODAL_OPEN: (state) => state.isModalOpen,
    IS_NEW_USER_FORM_OPEN: (state) => state.isNewUserFormOpen,
    IS_EDIT_USER_FORM_OPEN: (state) => state.isEditUserFormOpen,
    IS_NEW_COURSE_FORM_OPEN: (state) => state.isNewCourseFormOpen
  },
  mutations: {
    SET_MODAL_OPEN(state, value) {
      state.isModalOpen = value;
    },
    SET_NEW_USER_FORM_OPEN(state, value) {
      state.isNewUserFormOpen = value;

      if (value) {
        state.isModalOpen = value;
        state.isEditUserFormOpen = false;
        state.isNewCourseFormOpen = false;
      }
    },
    SET_EDIT_USER_FORM_OPEN(state, value) {
      state.isEditUserFormOpen = value;
      if (value) {
        state.isModalOpen = value;
        state.isNewUserFormOpen = false;
        state.isNewCourseFormOpen = false;
      }
    },
    SET_NEW_COURSE_FORM_OPEN(state, value) {
      state.isNewCourseFormOpen = value;
      if (value) {
        state.isModalOpen = value;
        state.isNewUserFormOpen = false;
        state.isEditUserFormOpen = false;
      }
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_USER_DETAIL(state, userDetails) {
      state.userDetails = userDetails;
    },
    SET_COURSES(state, courses) {
      state.courses = courses;
    },
    INSERT_USER(state, user) {
      let users = JSON.parse(localStorage.getItem("usersData"));
      users.push(user);
      state.users.push(user);
      localStorage.setItem("usersData", JSON.stringify(users));
    },
    UPDATE_USER(_, user) {
      let users = JSON.parse(localStorage.getItem("usersData"));
      let index = users.findIndex((x) => x.id == user.id);
      users[index] = user;
      localStorage.setItem("usersData", JSON.stringify(users));
    },
    INSERT_USER_DETAIL(state, userDetail) {
      let userDetails = JSON.parse(localStorage.getItem("userDetailsData"));
      userDetails.push(userDetail);
      state.userDetails.push(userDetail);
      localStorage.setItem("userDetailsData", JSON.stringify(userDetails));
    },
    UPDATE_USER_DETAIL(state, userDetail) {
      let userDetails = JSON.parse(localStorage.getItem("userDetailsData"));
      let index = userDetails.findIndex((x) => x.user_id == userDetail.user_id);
      userDetails[index] = userDetail;
      localStorage.setItem("userDetailsData", JSON.stringify(userDetails));
    },
    INSERT_COURSE(_, course) {
      let courses = JSON.parse(localStorage.getItem("coursesData"));
      courses.push(course);
      localStorage.setItem("coursesData", JSON.stringify(courses));
    },
    INSERT_INNER_COURSE(_, payLoad) {
      let courses = JSON.parse(localStorage.getItem("coursesData"));
      let course = courses.find((c) => c.user_id == payLoad.userId);
      course.courses.push(payLoad.course);
      localStorage.setItem("coursesData", JSON.stringify(courses));
    },
  },
  actions: {
    FILTER_USERS(context, payLoad) {
      var filteredUsers = JSON.parse(localStorage.getItem("usersData"));
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

      context.commit("SET_USERS", filteredUsers);
    },
  },
});
