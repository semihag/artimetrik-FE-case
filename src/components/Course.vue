<template>
  <div id="course" class="card">
    <div class="card-body">
      <h5 class="card-title">Name : {{ courseName }}</h5>
      <div><label>Measured At :</label> {{ MeasuredAt() }}</div>
      <div><label>Completed At :</label> {{ completedAt }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["courseName", "measuredAt", "completedAt"],
  methods: {
    MeasuredAt() {
      var seconds = Math.floor((this.measuredAt / 1000) % 60),
        minutes = Math.floor((this.measuredAt / (1000 * 60)) % 60),
        hours = Math.floor((this.measuredAt / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds;
    },
  },
  created() {
    this.MeasuredAt();
  },
};
</script>
<style scoped>
label {
  font-weight: bold;
}
#course {
  margin-top: 15px;
}
</style>
