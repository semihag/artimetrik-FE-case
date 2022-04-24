<template>
  <div>
    <h1>Users Page</h1>
    <div class="row justify-content-center">
      <div class="col-8">
        <!-- serch and status filter -->
        <Filter />
        <!-- excel and modal -->
        <div style="float: right; display: flex">
          <div>
            <img
              @click="CreateExcelData"
              src="../images/excel.svg"
              style="width: 48px; cursor: pointer"
            />
          </div>
          <div>
            <img
              @click="this.$store.commit('SET_NEW_USER_FORM_OPEN', true)"
              src="../images/add.svg"
              style="width: 48px; cursor: pointer"
            />
          </div>
        </div>
       
        <Modal v-if="this.$store.getters.IS_NEW_USER_FORM_OPEN">
          <template v-slot:content>
            <UserForm />
          </template>
        </Modal>

        <!-- users table -->
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="user-row"
              v-for="user in this.usersOnPage"
              :key="user.id"
              @click="this.$router.push({ path: '/' + user.id })"
            >
              <td>{{ user.id }}</td>
              <td>
                {{ user.name }}
              </td>
              <td>
                <span
                  class="badge"
                  :class="
                    user.status == 'active' ? 'alert-success' : 'alert-danger'
                  "
                  >{{ user.status }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
        <!-- total users count -->
        <h6>Total Users : {{ TOTAL_USERS_COUNT() }}</h6>
        <!-- pagination -->
        <Pagination
          style="float: right"
          @GetUsers="GetUsers"
          :currentPageNumber="currentPageNumber"
          :pageCount="pageCount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Filter from "../components/Filter.vue";
import Pagination from "../components/Pagination.vue";
import Modal from "../components/Modal.vue";
import UserForm from "../forms/UserForm.vue";

export default {
  components: {
    Filter,
    Pagination,
    Modal,
    UserForm,
  },
  data() {
    return {
      usersOnPage: [],
      currentPageNumber: 1,
      perPage: 5,
      excelDataList: [],
      showModal: false,
    };
  },
  watch: {
    USERS: {
      handler() {
        this.currentPageNumber = 1;
        this.GetUsers(this.currentPageNumber);
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters([
      "FILTERED_USERS_COUNT",
      "USERS",
      "USER_DETAILS",
      "COURSES",
    ]),
    pageCount() {
      return Math.ceil(this.FILTERED_USERS_COUNT / this.perPage);
    },
  },
  methods: {
    TOTAL_USERS_COUNT() {
      return this.$store.getters.ALL_USERS_COUNT;
    },
    GetUsers(pageNumber) {
      this.currentPageNumber = pageNumber;
      this.usersOnPage = this.USERS.slice(
        (pageNumber - 1) * this.perPage,
        this.perPage * pageNumber
      );
    },
    CreateExcelData() {
      this.excelDataList = [];

      for (var user of this.USERS) {
        let courseData = this.COURSES.find((c) => c.user_id == user.id);
        let userDetailData = this.USER_DETAILS.find(
          (ud) => ud.user_id == user.id
        );
        if (courseData != null) {
          courseData.courses.forEach((c) => {
            let excelData = {};
            excelData.COURSE_NAME = c.course_name;
            excelData.USER_NAME = user.name;
            excelData.USER_STATUS = user.status;
            excelData.AGE = userDetailData.age;
            excelData.JOB = userDetailData.job;
            excelData.MEASURED_AT = this.MeasuredAt(c.measured_at);
            excelData.COMPLETED_AT = c.completed_at;
            this.excelDataList.push(excelData);
          });
        }
      }
      this.Download();
    },
    Download() {
      var filename = "User_Courses.xlsx";
      var ws = XLSX.utils.json_to_sheet(this.excelDataList);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Courses");
      XLSX.writeFile(wb, filename);
    },
  },
  created() {
    this.GetUsers(this.currentPageNumber);
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 50px;
}
.user-row {
  cursor: pointer;
}
</style>
