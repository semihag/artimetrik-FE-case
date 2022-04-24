<template>
 <h5>New Course</h5>
  <form>
    <div class="form-group">
      <label>Course Name</label>
      <input
        v-model="course.courseName"
        type="text"
        class="form-control"
        id="courseName"
        placeholder="Enter Course Name"
      />
    </div>
    <div class="form-group">
      <label>Measured At</label>
      <div class="row">
        <div class="col-3">
          <input
            v-model="course.hours"
            type="number"
            class="form-control"
            min="0"
          />
        </div>
        <div class="col-3">
          <input
            v-model="course.minutes"
            type="number"
            class="form-control"
            min="0"
            max="59"
          />
        </div>
        <div class="col-3 offset-right-3">
          <input
            v-model="course.seconds"
            type="number"
            class="form-control"
            min="0"
            max="59"
          />
        </div>
      </div>
    </div>
    <div class="form-group">
      <label>Completed At</label>
      <div class="row">
        <div class="col-6">
          <input
            v-model="course.completedAtDate"
            type="date"
            class="form-control"
          />
        </div>
        <div class="col-6">
          <input
            v-model="course.completedAtTime"
            type="time"
            class="form-control"
          />
        </div>
      </div>
    </div>
    <br />
    <button :disabled="!validate" @click="SaveForm" class="btn btn-primary">
      SAVE
    </button>
  </form>
</template>

<script>
export default {
  props: ["userId"],
  data() {
    return {
      course: {
        courseName: null,
        hours: 0,
        minutes: 0,
        seconds: 0,
        completedAtDate: null,
        completedAtTime: "00:00",
      },
    };
  },
  watch: {
    course: {
      handler(val) {
        if (val.hours < 0) val.hours = 0;
        if (val.minutes < 0) val.minutes = 0;
        if (val.seconds < 0) val.seconds = 0;
        if (val.minutes > 59) val.minutes = 59;
        if (val.seconds > 59) val.seconds = 59;
      },
      deep: true,
    },
  },
  computed: {
    validate() {
      if (this.course.courseName == null || this.course.completedAtDate == null)
        return false;
      return true;
    },
  },
  methods: {
    SaveForm() {
      let newCourse = {
        userId: this.userId,
        course: {
          course_name: this.course.courseName,
          measured_at: this.CalculateMeasuredAt(),
          completed_at:
            this.course.completedAtDate +
            " " +
            this.course.completedAtTime +
            ":00",
        },
      };
      this.$store.commit("INSERT_INNER_COURSE", newCourse);
    },
    CalculateMeasuredAt() {
      return (
        this.course.hours * 3600 +
        this.course.minutes * 60 +
        this.course.seconds
      );
    },
  },
};
</script>
