import { createStore } from "vuex";

const store = createStore({
  state: {
    showSidebar: false,
    userData: {},
    notification: {
      show: false,
      msg: "",
      body: "",
      status: "",
    },
    showLoading: false,
  },
  mutations: {
    changeSidebarState(state) {
      state.showSidebar = !state.showSidebar;
    },
    login(state, payload) {
      state.userData = payload.data.user;
    },
    changeNotificationState(state, payload) {
      state.notification = payload;
    },
    changeLoadingState(state) {
      state.showLoading = !state.showLoading;
    },
  },
  actions: {},
  modules: {},
});

export default store;
