<template>
  <div id="app-tv-play-page">
    <!-- 页头 -->
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="IPTV Details"
      :sub-title="playerInfo.length ? playerInfo[0].name : 'random'"
      @back="returnHome"
    />

    <!-- 播放器 -->
    <video-js id="videoPlayer" class="vjs-default-skin">
      <source
        :src="
          playerInfo.length > 0
            ? playerInfo[0].url
            : 'http://210.210.155.35/dr9445/h/h16/02.m3u8'
        "
        type="application/x-mpegURL"
      />
    </video-js>
  </div>
</template>

<script setup>
import "video.js/dist/video-js.css";
import { useRouter } from "vue-router";
import Videojs from "video.js/dist/video.min.js";
import { computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

// tv详情模块
const router = useRouter();
const store = useStore();

// 回到主页
const returnHome = () => {
  router.push({
    name: "Home",
    params: {
      url: store.state.currentURL,
    },
  });
};

//播放器与播放状态初始化
let myPlyer = null;

// 播放频道信息
const playerInfo = computed(() => store.state.watching);

onMounted(() => {
  store.commit("deleteSearchResultInfo");
  // videojs的第一个参数表示的是，文档中video的id
  myPlyer = Videojs("videoPlayer", {
    controls: true,
    withCredentials: true,
    playbackRates: [0.5, 1, 1.25, 1.5, 2, 3], // 倍速播放
    muted: true, //静音模式 解决首次页面加载播放。
  });

  // 检测播放成功/失败
  myPlyer.ready(async function () {
    try {
      var promise = await myPlyer.play();
    } catch (error) {
      message.error("播放失败，源加载出错啦！换一个看吧~");
    }
  });
});

onUnmounted(() => {
  // 离开时将播放器销毁
  if (myPlyer) {
    myPlyer.dispose();
  }
});
</script>

<style lang="scss">
#app-tv-play-page {
  display: flex;
  flex-direction: column;
  align-items: center;

  .ant-page-header {
    width: 100%;
  }

  .btn-return-home {
    width: 100px;
    height: 40px;
  }

  @media screen and (max-width: 1024px) {
    .vjs-default-skin {
      margin-top: 50px;
      width: 100%;
      min-height: 300px;
    }
  }

  @media screen and (min-width: 1024px) {
    .vjs-default-skin {
      margin-top: 50px;
      width: 60%;
      min-height: 500px;
    }
  }
}
</style>
