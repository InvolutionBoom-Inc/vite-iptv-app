import { createStore } from "vuex";
import { getTvList } from "../http/api/user.js";
import parser from "iptv-playlist-parser";
const store = createStore({
  state() {
    return {
      inptList: [],
      watching: [],
      searchResultInfo: [],
      currentPage: 1,
    };
  },

  getters: {},

  mutations: {
    setIPTVlist(state, data) {
      state.inptList = data;
    },

    addWatching(state, data) {
      state.watching = [];
      state.watching.push(data);
    },

    addSearchResultInfo(state, data) {
      state.searchResultInfo = [];
      state.searchResultInfo = data;
    },

    deleteSearchResultInfo(state) {
      state.searchResultInfo = [];
    },

    updateCurrentPage(state, pageNum) {
      state.currentPage = pageNum;
    },
  },

  actions: {
    async setIPTVlist(context) {
      const list = await getTvList();
      const result = parser.parse(list);

      context.commit("setIPTVlist", result);
    },
  },
});
export default store;
