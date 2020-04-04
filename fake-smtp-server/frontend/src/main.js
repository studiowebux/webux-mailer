import Vue from "vue";

import "@/plugins/socket"; // the socket implementation must be loaded first.

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "bootstrap";
import "jquery";
import "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
