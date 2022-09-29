export default {
  namespaced: true,
  state: () => {
    return {
      userInfo: {
        token: "12345678990",
        username: "问题不大",
      },
    };
  },
  mutations: {
    updateName(state, payload) {
      state.userInfo.username = payload;
    },
  },
  action: {
    updateNameAsync({ commit }, payload) {
      setTimeout(() => {
        commit("updateName", payload);
      }, 2000);
    },
  },
};
