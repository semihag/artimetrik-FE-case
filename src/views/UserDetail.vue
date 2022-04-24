<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <img
        src="../images/back.svg"
        style="width: 64px; cursor: pointer"
        @click="this.$router.push({ path: '/' })"
      />
      <br />
      <label>USER DETAIL</label>

      <div class="card">
        <div class="card-body">
          <div style="float: right; cursor: pointer">
            <img
              @click="this.$store.commit('SET_EDIT_USER_FORM_OPEN', true)"
              src="../images/edit.svg"
              style="width: 48px"
            />
          </div>
          <div><label>Name : </label> {{ user.name }}</div>
          <div><label>Age : </label> {{ user.userDetail.age }}</div>
          <div><label>Job : </label> {{ user.userDetail.job }}</div>
          <br />
          <div
            style="
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
            "
          >
            <label>Courses</label>
            <div style="float: right; cursor: pointer">
              <img
                @click="this.$store.commit('SET_NEW_COURSE_FORM_OPEN', true)"
                src="../images/add.svg"
                style="width: 48px"
              />
            </div>
          </div>
          <div v-if="user.courses != null && user.courses.length > 0">
            <Course
              v-for="course in user.courses"
              :key="course.user_id"
              :courseName="course.course_name"
              :measuredAt="course.measured_at"
              :completedAt="course.completed_at"
            />
          </div>
          <div v-else>
            <p>Course Not Found</p>
          </div>
        </div>
      </div>
    </div>

    <Modal>
      <template v-slot:content>
        <UserForm
          :editUser="user"
          v-if="this.$store.getters.IS_EDIT_USER_FORM_OPEN"
        />
        <CourseForm
          :userId="user.id"
          v-if="this.$store.getters.IS_NEW_COURSE_FORM_OPEN"
        />
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Course from "../components/Course.vue";
import Modal from "../components/Modal.vue";
import UserForm from "../forms/UserForm.vue";
import CourseForm from "../forms/CourseForm.vue";
export default {
  components: {
    Course,
    Modal,
    UserForm,
    CourseForm,
  },

  data() {
    return {
      user: null,
    };
  },
  computed: {
    ...mapGetters(["USERS", "USER_DETAILS", "COURSES"]),
  },

  methods: {
    GetUserId(id) {
      this.user = { ...this.USERS.find((u) => u.id == id) };

      this.user.userDetail = {
        ...this.USER_DETAILS.find((ud) => ud.user_id == id),
      };
      let courseObj = this.COURSES.find((c) => c.user_id == id);
      if (courseObj != null) {
        this.user.courses = [...courseObj.courses];
      }
    },
  },
  created() {
    this.GetUserId(this.$route.params.id);
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>
