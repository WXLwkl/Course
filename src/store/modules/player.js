const state = {
  playList: [
    {
      albumId: "11",
      albumName: "精读《道德经》",
      audioUrl:
        "https://cdn-ali-dest.dushu365.com/media/audio/1626845926f68b8a8afa80f2fb468259b038309274mkng3o.mp3",
      duration: 1347,
      fragmentId: 5251,
      title: "大象无形：此处无声胜有声",
      titleImageUrl:
        "https://cdn-upyun-images.dushu365.com/15762526426f82b4ec8e1057b415843085815d21bdye03uf",
      videoFragmentId: 400011756,
    },
    {
      albumId: "11",
      albumName: "精读《道德经》",
      audioUrl:
        "https://cdn-upyun-dest.dushu365.com/media/audio/16191692352e29f36a55772664feaf203745483d01algffi.mp3",
      duration: 1934,
      fragmentId: 5254,
      title: "【总纲】有无相生：相比较而存在，相对立而发展",
      titleImageUrl:
        "https://cdn-upyun-images.dushu365.com/15762526426f82b4ec8e1057b415843085815d21bdye03uf",
      videoFragmentId: 400011757,
    },
  ],
  playListIndex: 0,
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  isShowMusicItem: true
};

const mutations = {
  updatePlayList(state, paramObj) {
    state.playList = paramObj.songs;
    state.playListIndex = paramObj.index;
    localStorage.setItem("playListIndex", state.playListIndex);
    localStorage.setItem("playList", JSON.stringify(state.playList));
    state.isPlaying = true;
  },
  // 播放状态
  updatePlayStatus(state, value) {
    state.isPlaying = value;
  },
  updatePlayListIndex(state, value) {
    if (value >= 0 || value <= state.playList.length - 1) {
      state.playListIndex = value;
      localStorage.setItem("playListIndex", state.playListIndex);
    }
    state.isPlaying = true;
  },
  updateLocalPlayList(state, paramObj) {
    state.playList = paramObj.playList;
    state.playListIndex = paramObj.playListIndex;
  },
  updateDuration(state, value) {
    if (value) {
      state.duration = value;
    }
  },

  playNext(state, value) {
    let index = parseInt(state.playListIndex) + value
    let param = state.playList[index]
    if (index < 0) {
      index = state.playList.length - 1
    } else if (index == state.playList.length) {
      index = 0
    }
    state.playListIndex = index
  },

  updateCurrentTime(state, value) {
    if (value) {
      state.currentTime = value;
    }
  },
};

const actions = {
  getLocalPlayList({ commit }) {
    let playList = localStorage.getItem("playList");
    let playListIndex = localStorage.getItem("playListIndex");
    if (playList && playListIndex) {
      if (playListIndex != "undefined" && playList != "undefined") {
        let obj = {
          playList: JSON.parse(playList),
          playListIndex: playListIndex,
        };
        commit("updateLocalPlayList", obj);
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
