import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store.js";

const measuredAtMixin = {
  methods: {
    MeasuredAt(measuredAt) {
      var seconds = Math.floor(measuredAt % 60),
        minutes = Math.floor((measuredAt / 60) % 60),
        hours = Math.floor(measuredAt / 3600);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds;
    }
  },
};

const app = createApp(App);
app.mixin(measuredAtMixin);
app.use(store);
app.use(router);

app.mount("#app");
