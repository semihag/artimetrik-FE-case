<template>
  <div>
    <div class="row">
      <div class="col-9">
        <input
          v-model="searchText"
          type="text"
          class="form-control"
          placeholder="Search User Name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <br />
      </div>
      <div class="col-3">
        <select v-model="status" class="form-select">
          <option selected :value="null">All Status</option>
          <option value="active">Active</option>
          <option value="passive">Passive</option>
        </select>
      </div>
    </div>

    <span v-if="(searchText != null && searchText != '') || status != null"
      >{{ FILTERED_USERS_COUNT }} user(s) found</span
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchText: null,
      status: null,
    };
  },
  watch: {
    searchText(val) {
      this.$store.dispatch("FILTER_USERS", {
        searchText: val,
        status: this.status,
      });
    },
    status(val) {
        debugger;
      this.$store.dispatch("FILTER_USERS", {
        searchText: this.searchText,
        status: val,
      });
    },
  },
  computed: {
    ...mapGetters(["FILTERED_USERS_COUNT"]),
  },
};
</script>
