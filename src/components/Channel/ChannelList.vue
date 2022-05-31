<template>
  <div class="channel-list">
    <a-list
      class="demo-loadmore-list"
      item-layout="horizontal"
      :data-source="iptvListShow"
    >
      <template #loadMore>
        <div
          v-if="!initLoading && !loading"
          :style="{
            textAlign: 'center',
            marginTop: '12px',
            height: '32px',
            lineHeight: '32px',
          }"
          class="loading-button"
        >
          <a-button
            @click="
              () => {
                currentPage++;
              }
            "
            >loading more</a-button
          >
        </div>
      </template>
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a-tooltip
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

            <a key="list-loadmore-edit">收藏本台</a>
          </template>

          <a-skeleton avatar :title="false" :loading="!!item.loading" active>
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
          </a-skeleton>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup>
// iptv虚拟列表 screen 手机端
import { computed, ref, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { testURL } from "../../http/api/user.js";
const props = defineProps({
  iptvListAll: {
    type: Array,
    required: true,
  },
});

const { iptvListAll } = toRefs(props);

const store = useStore();
const router = useRouter();

const initLoading = ref(false);
const loading = ref(false);

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
</script>

<style lang="scss">
@media screen and (max-width: 1024px) {
  .demo-loadmore-list {
    .loading-button {
      position: fixed;
      bottom: 0;
      min-height: 50px;
      margin-top: 0px;
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

    .ant-spin-container {
      padding-bottom: 50px;
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
