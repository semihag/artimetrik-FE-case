<template>
  <div>
    <h1>users page</h1>

    <div class="row justify-content-center">
      <div class="col-8">
        <Filter />
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in this.usersOnPage" :key="user.id">
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
        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li v-if="currentPageNumber > 1" class="page-item">
              <a
                @click="GetUsers(currentPageNumber - 1)"
                class="page-link"
                href="#"
                >Previous</a
              >
            </li>
            <li
              class="page-item"
              :class="{ active: currentPageNumber == pn }"
              v-for="pn in pageCount"
              :key="pn.id"
            >
              <a @click="GetUsers(pn)" href="#" class="page-link"> {{ pn }}</a>
            </li>
            <li v-if="currentPageNumber < pageCount" class="page-item">
              <a
                @click="GetUsers(currentPageNumber + 1)"
                class="page-link"
                href="#"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Filter from "../components/Filter.vue";
export default {
  components: {
    Filter,
  },
  data() {
    return {
      usersOnPage: [],
      currentPageNumber: 1,
      perPage: 5,
    };
  },
watch : {
USERS() {
  this.currentPageNumber = 1;
  this.GetUsers(this.currentPageNumber);
}
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
}
</style>
