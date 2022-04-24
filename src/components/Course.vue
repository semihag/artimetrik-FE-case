<template>
  <div id="course" class="card">
    <div class="card-body">
       <div><label>Name :</label> {{ courseName }}</div>
      <div><label>Measured At :</label> {{ MeasuredAt(measuredAt) }}</div>
      <div><label>Completed At :</label> {{ completedAt }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["courseName", "measuredAt", "completedAt"],
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
