const state = {
  mails: [],
  mailInit: false,
};

const mutations = {
  INIT_MAIL(state, mail) {
    state.mails.push(mail);
    state.mailInit = true;
  },
};

const actions = {
  socket_mailRetrieved({ commit, dispatch }, data) {
    commit("INIT_MAIL", data);
    dispatch("doneLoading");
  },
  socket_emailSent({ dispatch }) {
    dispatch("setSuccess", "Email will be retrieved soon");
    dispatch("doneLoading");
  },
};

const getters = {
  mails: (state) => {
    return state.mails;
  },
};

export default {
  actions,
  mutations,
  state,
  getters,
};
