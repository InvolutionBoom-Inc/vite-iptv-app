import { createStore } from "vuex";
import { getTvList, testURL } from "../http/api/user.js";
import parser from "iptv-playlist-parser";
const store = createStore({
  state() {
    return {
      channelURL: [
        {
          url: "https://iptv-org.github.io/iptv/countries/cn.m3u",
          status: true,
        },
      ],
      currentURL: "",
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

    updateChannelURL(state, urlData) {
      if (
        state.channelURL.find((element) => element.url === urlData.url) ===
        void 0
      ) {
        state.channelURL.push(urlData);
      }
    },

    updateCurrentURL(state, url) {
      state.currentURL = url;
    },

    clearIPTVList(state) {
      state.inptList = null;
    },

    initStore(state, videoInfo) {
      for (let key of Object.keys(videoInfo)) {
        state[key] = videoInfo[key];
      }
    },

    deleteURL(state, url) {
      state.channelURL.splice(state.channelURL.indexOf(url), 1);
    },
  },

  actions: {
    async setIPTVlist(context, url) {
      const list = await getTvList(url);

      const result = parser.parse(list);

      context.commit("setIPTVlist", result);
    },
  },
});

export default store;
