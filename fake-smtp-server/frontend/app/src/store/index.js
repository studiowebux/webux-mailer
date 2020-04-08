import Vue from "vue";
import Vuex from "vuex";

import Loading from "@/store/modules/loading";
import Mail from "@/store/modules/mail";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Loading,
    Mail
  }
});
