<template>
  <div class="channel-card">
    <!-- 加载中 -->
    <div class="example" v-if="!iptvListAll">
      <a-spin />
    </div>

    <!-- iptv频道列表 -->
    <div class="iptv-list-box" v-else>
      <a-card
        hoverable
        style="width: 240px"
        v-for="(item, index) in iptvListShow"
        :key="index"
        class="iptv-list"
        v-on:click="toDetails(item.name)"
        @mouseenter="testChannel(item.url)"
        :style="iptvListTotal < 10 ? 'flex:0.5 0 0;margin-top:50px;' : ''"
      >
        <template #cover>
          <a-empty :description="null" v-if="!item.tvg.logo" />

          <img
            v-else
            style="max-width: 100px; max-height: 100px"
            alt="example"
            :src="item.tvg.logo ? item.tvg.logo : ''"
          />
        </template>
        <a-card-meta :title="null">
          <template #description>
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

            <div class="description">{{ item.name }}</div>
          </template>
        </a-card-meta>
      </a-card>
    </div>

    <!-- iptv列表分页 -->
    <a-pagination
      v-model:current="currentPage"
      v-model:pageSize="pageSize"
      :total="iptvListTotal"
      show-less-items
      hideOnSinglePage
    />
  </div>
</template>

<script setup>
// iptv列表展示模块 screen web端
import { useStore } from "vuex";
import { computed, onMounted, ref, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import { testURL } from "../../http/api/user.js";

const props = defineProps({
  iptvListAll: {
    type: Array,
    required: true,
  },
  modelName: String,
});

const { iptvListAll } = toRefs(props);
watch(iptvListAll, (item) => {
  console.log(item);
});

const store = useStore();
const router = useRouter();

// 去详情页
const toDetails = (name) => {
  store.commit(
    "addWatching",
    iptvListAll.value.find((item) => item.name === name)
  );

  router.push("/TvPlayPage");
};

//分页展示iptv列表
const currentPage = ref(store.state.currentPage);
watch(currentPage, (val) => store.commit("updateCurrentPage", val));

const pageSize = ref(10);
const iptvListShow = computed(() => {
  if (store.state.searchResultInfo.length > 0) {
    return store.state.searchResultInfo;
  }

  if (iptvListAll.value != null && props.modelName == "main") {
    return iptvListAll.value.slice(
      (currentPage.value - 1) * 10,
      currentPage.value * pageSize.value
    );
  }
  if (iptvListAll.value != null && props.modelName == "collection") {
    return iptvListAll.value;
  }
});

const iptvListTotal = computed(() => {
  if (store.state.searchResultInfo.length > 0) {
    return iptvListShow.value ? iptvListShow.value.length : 1;
  } else {
    return iptvListAll.value ? iptvListAll.value.length : 1;
  }
});

const isTest = ref(false);
const testChannel = async (url) => {
  if (isTest.value) {
    return;
  }

  isTest.value = true;

  iptvListShow.value.find((channel) => channel.url === url).status = "testing";
  try {
    const res = await testURL(url);

    iptvListShow.value.find((channel) => channel.url === url).status = "ok";

    isTest.value = false;
  } catch (error) {
    iptvListShow.value.find((channel) => channel.url === url).status =
      "not-use";

    isTest.value = false;
  }
};
</script>

<style lang="scss">
@media screen and (max-width: 1024px) {
  .channel-card {
    display: none;
  }
}

@media screen and (min-width: 1024px) {
  .channel-card {
    padding-bottom: 60px;

    @media screen and (max-width: 500px) {
      .iptv-list {
        flex: 1 0 100%;
        width: 100%;
      }
    }
    @media screen and (min-width: 500px) and (max-width: 768px) {
      .iptv-list {
        flex: 1 0 100%;
        width: 100%;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1980px) {
      .iptv-list {
        flex: 1 0 20%;
      }
    }
    @media screen and (min-width: 1980px) {
      .iptv-list {
        flex: 1 0 10%;
      }

      .iptv-list-box-active {
        display: block;
      }
    }
    .iptv-list-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .iptv-list {
        cursor: pointer;
        overflow: hidden;
        max-height: 300px;
        .ant-empty-image {
          display: flex;
        }

        .ant-card-cover {
          display: flex;
          justify-content: center;
          min-height: 200px;
          align-items: center;
        }

        .ant-card-meta-description {
          display: flex;
          justify-content: center;
          align-items: center;
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
        }
      }
    }

    .ant-pagination {
      margin-top: 50px;
    }

    .example {
      width: 100%;
      height: 50vh;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      margin-bottom: 20px;
      padding: 30px 50px;
      margin: 20px 0;
    }
  }
}
</style>
