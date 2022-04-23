<template>
  <div>
    <h1>users page</h1>
    <div class="row justify-content-center">
      <div class="col-8">
        <Filter />
        <div
          style="float: right;cursor:pointer;"
          data-bs-toggle="modal"
          data-bs-target="#new-user"
        >
          <img src="../images/add.svg" style="width: 48px" />
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
    };
  },
  watch: {
    USERS() {
      this.currentPageNumber = 1;
      this.GetUsers(this.currentPageNumber);
    },
  },
  computed: {
    ...mapGetters(["ALL_USERS_COUNT", "FILTERED_USERS_COUNT", "USERS"]),
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
