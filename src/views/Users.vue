<template>
  <div>
    <h1>users page</h1>
    <div class="row justify-content-center">
      <div class="col-8">
        <Filter />
        <div style="float: right; display: flex">
          <div>
            <img
              @click="CreateExcelData"
              src="../images/excel.svg"
              style="width: 48px; cursor: pointer"
            />
          </div>
          <div data-bs-toggle="modal" data-bs-target="#new-user">
            <img src="../images/add.svg" style="width: 48px; cursor: pointer" />
          </div>
        </div>

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
        <h6>Total Users : {{ ALL_USERS_COUNT }}</h6>
        <Pagination
          style="float: right"
          @GetUsers="GetUsers"
          :currentPageNumber="currentPageNumber"
          :pageCount="pageCount"
        />
      </div>
    </div>
    <Modal :modalId="'new-user'" :title="'New User'" :buttonText="'Save'">
      <template v-slot:content>
        <!-- add form  -->
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Filter from "../components/Filter.vue";
import Pagination from "../components/Pagination.vue";
import Add from "../components/Add.vue";
import Modal from "../components/Modal.vue";
export default {
  components: {
    Filter,
    Pagination,
    Add,
    Modal,
  },
  data() {
    return {
      usersOnPage: [],
      currentPageNumber: 1,
      perPage: 5,
      openModal: false,
      excelDataList: [],
    };
  },
  watch: {
    USERS() {
      this.currentPageNumber = 1;
      this.GetUsers(this.currentPageNumber);
    },
  },
  computed: {
    ...mapGetters([
      "ALL_USERS_COUNT",
      "FILTERED_USERS_COUNT",
      "USERS",
      "USER_DETAILS",
      "COURSES",
    ]),
    pageCount() {
      return Math.floor(this.FILTERED_USERS_COUNT / this.perPage) + 1;
    },
  },
  methods: {
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
      this.Download();
    },
    Download() {
      var filename = "User_Courses.xlsx";
      var ws = XLSX.utils.json_to_sheet(this.excelDataList);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Courses");
      XLSX.writeFile(wb, filename);
    },
    MeasuredAt(measuredAt) {
      var seconds = Math.floor((measuredAt / 1000) % 60),
        minutes = Math.floor((measuredAt / (1000 * 60)) % 60),
        hours = Math.floor((measuredAt / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds;
    }
  },
  created() {
    this.GetUsers(this.currentPageNumber);
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.user-row {
  cursor: pointer;
}
</style>
