<template>
    <div>
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
</template>
<script>
export default {
    props: ["currentPageNumber","pageCount"],
    methods : {
        GetUsers(pageNumber) {
            this.$emit('GetUsers',pageNumber);
        }
    }
}
</script>