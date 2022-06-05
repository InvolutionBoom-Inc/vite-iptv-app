<template>
  <div class="channel-list">
    <a-list
      class="demo-loadmore-list"
      item-layout="horizontal"
      :data-source="iptvListShow"
      @scroll="scrollChannelList"
      ref="channelList"
    >
      <template #loadMore>
        <div
          :style="{
            textAlign: 'center',
            height: '50px',
            lineHeight: '50px',
          }"
          class="loading-button"
        >
          <a-button
            v-if="isCanLoad == true && modelName == 'main'"
            @click="
              () => {
                currentPage++;
              }
            "
            >loading more</a-button
          >
          <a-button disabled v-else>Generate group</a-button>
        </div>
      </template>
      <template #renderItem="{ item }">
        <!-- <swiper
          :slides-per-view="1"
          :space-between="50"
          :initial-slide="0"
          :speed="200"
          @transition-end="transitionEnd"
        >
          <swiper-slide> -->
        <a-list-item>
          <template #actions>
            <a-tooltip
              style="z-index: 0"
              :title="
                item.status === 'ok'
                  ? 'url ok'
                  : item.status === 'not-use'
                  ? 'url do not use'
                  : item.status === 'not-test'
                  ? 'url not tested'
                  : 'url testing'
              "
            >
              <div
                @click="testChannel(item.url)"
                class="url-status"
                :class="
                  item.status === 'ok'
                    ? 'success'
                    : item.status === 'not-use'
                    ? 'error'
                    : item.status === 'not-test'
                    ? 'not-test'
                    : 'testing'
                "
              ></div>
            </a-tooltip>
            <a
              key="list-loadmore-edit"
              @click="toCollect(item.name)"
              v-if="modelName == 'main'"
              >收藏本台</a
            >
            <a
              key="list-loadmore-edit"
              @click="toUnCollect(item.name)"
              v-if="modelName == 'collection'"
              >取消收藏</a
            >
          </template>

          <a-list-item-meta
            @click="toDetails(item.name)"
            :description="item ? 'channel from ' + item.tvg.country : ''"
          >
            <template #title>
              <a>{{ item.name }}</a>
            </template>

            <template #avatar>
              <a-empty :description="null" v-if="!item.tvg.logo" />
              <img :src="item.tvg.logo ? item.tvg.logo : ''" v-else />
            </template>
          </a-list-item-meta>
        </a-list-item>
        <!-- </swiper-slide> -->

        <!-- <swiper-slide class="collection-slide">
            <a key="list-loadmore-edit">收藏本台</a></swiper-slide
          >
        </swiper> -->
      </template>
    </a-list>
  </div>
</template>

<script setup>
// iptv虚拟列表 screen 手机端
import "swiper/css";
import { computed, onUpdated, ref, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { testURL } from "../../http/api/user.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { message } from "ant-design-vue";

const props = defineProps({
  iptvListAll: {
    type: Array,
    required: true,
  },
  modelName: String,
});

const { iptvListAll } = toRefs(props);

const store = useStore();
const router = useRouter();

//分页展示iptv列表
const currentPage = ref(store.state.currentPage);
watch(currentPage, (val) => store.commit("updateCurrentPage", val));

const pageSize = ref(10);

const iptvListShow = computed(() => {
  if (store.state.searchResultInfo.length > 0) {
    return store.state.searchResultInfo;
  }

  if (iptvListAll.value) {
    return iptvListAll.value.slice(0, currentPage.value * pageSize.value);
  }
});
watch(iptvListAll, (item) => {
  console.log(item);
});
console.log(iptvListAll.value);
const handlerScroll = (val) => {
  console.log(val);
};

const rateValue = ref(2);

// 去详情页
const toDetails = (name) => {
  store.commit(
    "addWatching",
    iptvListAll.value.find((item) => item.name === name)
  );

  router.push("/TvPlayPage");
};

// 测试频道是否可用
const testChannel = async (url) => {
  iptvListShow.value.find((channel) => channel.url === url).status = "testing";
  try {
    const res = await testURL(url);

    iptvListShow.value.find((channel) => channel.url === url).status = "ok";
  } catch (error) {
    console.log(error);
    iptvListShow.value.find((channel) => channel.url === url).status =
      "not-use";
  }
};

// const transitionEnd = (item) => {
//   console.log(item);
// };

// 滑动到底部显示loading按钮
const isCanLoad = ref(false);
const scrollChannelList = (e) => {
  store.commit("updateChannelListScrollTop", e.srcElement.scrollTop);

  if (
    Math.ceil(e.srcElement.scrollTop + e.srcElement.clientHeight) >=
    e.srcElement.scrollHeight
  ) {
    isCanLoad.value = true;
  } else {
    isCanLoad.value = false;
  }
};

const channelList = ref(null);
onUpdated(() => {
  channelList.value.$el.scrollTo(0, store.state.channelListScrollTop);
});

const toCollect = (channelName) => {
  if (store.state.collectionChannel.find((item) => item.name === channelName)) {
    message.info(channelName + " have been collected", 0.5);
    return;
  }

  message.success(channelName + " was successfully collected", 0.5);

  store.commit(
    "addCollection",
    iptvListAll.value.find((item) => item.name === channelName)
  );
};

const toUnCollect = (channelName) => {
  if (store.state.collectionChannel.find((item) => item.name === channelName)) {
    store.commit(
      "deleteCollection",
      store.state.collectionChannel.findIndex(
        (item) => item.name === channelName
      )
    );

    return;
  }
};
</script>

<style lang="scss">
.ant-tooltip {
  z-index: 0;
}

@media screen and (max-width: 1024px) {
  .demo-loadmore-list {
    overflow-y: scroll;
    height: 100vh;
    .loading-button {
      // position: fixed;
      position: relative;
      bottom: 0;
      width: 100%;
      z-index: 15;
      button {
        width: 100%;
        height: 100%;
        color: white;
        background: #418dd3;
      }
    }

    .url-status {
      content: "";
      width: 12px;
      height: 12px;
      border-radius: 50%;
      position: relative;
    }
    .success {
      background: rgb(66, 133, 244);
    }
    .error {
      background: red;
    }
    .not-test {
      background: rgb(128, 124, 124);
    }
    .testing {
      background: rgb(250, 175, 0);
    }

    .collection-slide {
      height: 100%;
      width: 100%;
      text-align: left;
      padding-left: 40px;
      align-self: center;
    }

    .ant-list-items {
    }

    .ant-list-item {
      cursor: pointer;
      transition: all 0.5s ease;

      &:hover {
        border-color: transparent;
        box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%),
          0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%);
      }

      @media screen and (max-width: 475px) {
        .ant-list-item-meta-avatar {
          img {
            max-width: 50px;
            max-height: 50px;
            margin-left: 20px;
          }
        }
        .ant-empty {
          .ant-empty-img-default {
            max-width: 50px;
            max-height: 50px;
            margin-left: 20px;
          }
        }
      }

      @media screen and (min-width: 475px) {
        .ant-list-item-meta-avatar {
          img {
            max-width: 100px;
            max-height: 100px;
            margin-left: 20px;
          }
        }
        .ant-empty {
          margin: 0;

          .ant-empty-img-default {
            max-width: 100px;
            max-height: 100px;
            margin-left: 20px;
          }
        }
      }

      .ant-list-item-meta {
        align-items: center;

        .ant-list-item-meta-avatar {
          display: flex;
          justify-content: center;
        }

        .ant-empty {
          margin: 0;
          .ant-empty-image {
            height: auto;
          }
        }
      }
      .ant-list-item-action {
        margin-right: 20px;
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .demo-loadmore-list {
    display: none;
  }
}
</style>
