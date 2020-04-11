import Vue from "vue";
import Vuex from "vuex";

import Loading from "@/store/modules/loading";
import Mail from "@/store/modules/mail";
import Handler from "@/store/modules/handler";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Loading,
    Mail,
    Handler
  }
});
