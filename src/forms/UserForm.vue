<template>
 <h5>{{editUser == null ? "New User"  : "Edit User"}}</h5>
  <form @submit.prevent="SaveForm">
    <div class="form-group">
      <label>User Name</label>
      <input
        v-model="user.userName"
        type="text"
        class="form-control"
        id="userName"
        placeholder="Enter User Name"
      />
    </div>
    <div class="form-group">
      <label>User Age</label>
      <input
        v-model="user.userAge"
        type="number"
        class="form-control"
        id="userAge"
        min="0"
      />
    </div>
    <div class="form-group">
      <label>User Job</label>
      <input
        v-model="user.userJob"
        type="text"
        class="form-control"
        id="userjob"
        placeholder="Enter User Job"
      />
    </div>
    <br />
    <button :disabled="validate" type="submit" class="btn btn-primary">SAVE</button>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["editUser"],
  data() {
    return {
      user: {
        userId: null,
        userName: null,
        userAge: null,
        userJob: null,
      },
    };
  },
  computed: {
    ...mapGetters(["USERS"]),
    validate() {
      if (
        this.user.userName == null ||
        this.user.userAge == null ||
        this.user.userJob == null ||
        this.user.userName == "" ||
        this.user.userAge == "" ||
        this.user.userJob == ""
      )
        return true;

      return false;
    },
  },
  methods: {
    SaveForm() {
      debugger;
      this.$store.commit('SET_MODAL_OPEN',false);
      if (this.editUser == null) {
        this.user.userId = this.GenerateNewUserId();
        this.CreateUser();
      } else {
        this.UpdateUser();
      }
    },

    CreateUser() {
      let newUser = {
        id: this.user.userId,
        name: this.user.userName,
        status: "active",
      };
      this.$store.commit("INSERT_USER", newUser);
      this.CreateUserDetail();
      this.CreateCourse();
      this.$router.push("/" + newUser.id);
    },
    UpdateUser() {
      let editedUser = {
        id: this.user.userId,
        name: this.user.userName,
        status: "active",
      };
      this.$store.commit("UPDATE_USER", editedUser);
      this.UpdateUserDetail();
    },
    CreateUserDetail() {
      let newUserDetail = {
        user_id: this.user.userId,
        age: this.user.userAge,
        job: this.user.userJob,
      };
      this.$store.commit("INSERT_USER_DETAIL", newUserDetail);
    },
    UpdateUserDetail() {
      let editedUserDetail = {
        user_id: this.user.userId,
        age: this.user.userAge,
        job: this.user.userJob,
      };
      this.$store.commit("UPDATE_USER_DETAIL", editedUserDetail);
      this.$router.go();
    },
    CreateCourse() {
      let newCourse = { user_id: this.user.userId, courses: [] };
      this.$store.commit("INSERT_COURSE", newCourse);
    },
    GenerateNewUserId() {
      return (
        Math.max(
          ...this.USERS.map((u) => {
            return u.id;
          })
        ) + 1
      );
    },
  },
  created() {
    if (this.editUser != null) {
      this.user.userId = this.editUser.id;
      this.user.userName = this.editUser.name;
      this.user.userAge = this.editUser.userDetail.age;
      this.user.userJob = this.editUser.userDetail.job;
    }
  },
};
</script>
