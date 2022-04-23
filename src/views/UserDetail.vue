<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <img
        src="../images/back.svg"
        style="width: 64px; cursor: pointer"
        @click="this.$router.go(-1)"
      />
      <br />
      <label>USER DETAIL</label>

      <div class="card">
        <div class="card-body">
          <div
            style="float: right; cursor: pointer"
            data-bs-toggle="modal"
            data-bs-target="#edit-user"
          >
            <img src="../images/edit.svg" style="width: 48px" />
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
            <div
              style="float: right; cursor: pointer"
              data-bs-toggle="modal"
              data-bs-target="#add-course"
            >
              <img src="../images/add.svg" style="width: 48px" />
            </div>
          </div>
          <div v-for="course in user.courses" :key="course.user_id">
            <Course
              :courseName="course.course_name"
              :measuredAt="course.measured_at"
              :completedAt="course.completed_at"
            />
          </div>
        </div>
      </div>
    </div>
    <Modal :modalId="'edit-user'" :title="'Edit User'" :buttonText="'Save'">
      <template v-slot:content>
        <!-- edit user  -->
      </template>
    </Modal>
    <Modal :modalId="'add-course'" :title="'New Course'" :buttonText="'Save'">
      <template v-slot:content>
        <!-- add course  -->
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Course from "../components/Course.vue";
import Modal from "../components/Modal.vue";
export default {
  components: {
    Course,
    Modal,
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
      this.user.courses = [
        ...this.COURSES.find((c) => c.user_id == id).courses,
      ];
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
