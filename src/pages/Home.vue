<template>
  <div id="app-home">
    <!-- 页头 -->
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="Home"
      sub-title="Welcome to IPTV"
    >
      <template #extra>
        <!-- 搜索模块 -->
        <div class="search-box">
          <a-row class="global-search-wrapper" style="width: 300px">
            <a-col :span="24">
              <a-auto-complete
                v-model:value="inputValue"
                :dropdown-match-select-width="252"
                style="width: 300px"
                :options="dataSource"
                @select="onSelect"
                @search="handleSearch"
                :disabled="false"
              >
                <template #option="item">
                  <div style="display: flex; justify-content: space-between">
                    <span>
                      <a target="_blank" rel="noopener noreferrer">
                        {{ item.value }}
                      </a>
                    </span>
                    <span v-if="item.count == 0">{{ item.count }} results</span>
                  </div>
                </template>

                <a-input-search
                  size="large"
                  placeholder="功能模块更新中~"
                  enter-button
                ></a-input-search> </a-auto-complete
            ></a-col>
          </a-row>

          <!-- 频道数量显示 -->
          <a-row>
            <a-col :span="24">
              <a-statistic
                title="中国源频道数量"
                :value="iptvListAll ? iptvListAll.length : 0"
              />
            </a-col>
          </a-row>
        </div>
      </template>
    </a-page-header>

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
        @click="toDetails(item.name)"
        :style="iptvListTotal < 10 ? 'flex:0.5 0 0;margin-top:50px;' : ''"
      >
        <template #cover>
          <a-empty :description="null" v-if="!item.tvg.logo" />
          <img
            v-else
            style="max-width: 150px; max-height: 200px"
            alt="example"
            :src="item.tvg.logo ? item.tvg.logo : ''"
          />
        </template>
        <a-card-meta :title="null">
          <template #description>{{ item.name }}</template>
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
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { symbol } from "vue-types";

// 搜索模块 还未实现功能：onSelect后将查询出来的数据分页展示在页面上
const inputModel = () => {
  const store = useStore();
  const router = useRouter();

  const inputValue = ref("");
  const dataSource = ref([]);

  const searchResultInfo = computed({
    get() {
      return store.state.searchResultInfo;
    },
    set(value) {
      store.commit("addSearchResultInfo", value);
    },
  });

  const onSelect = (value) => {
    searchResultInfo.value = iptvListAll.value.filter(
      (element) => element.name.toLowerCase() === value.toLowerCase()
    );
  };

  // 搜索用户输入数据
  const queryInfo = (query) => {
    return iptvListAll.value.filter((element) =>
      element.name.toLowerCase().startsWith(query.toLowerCase())
    );
  };

  // 对搜索的结果做二次处理
  const searchResult = (query) => {
    const result = queryInfo(query.trim());

    let resultArrLen;
    if (result.length > 10) {
      resultArrLen = 10;
    } else {
      resultArrLen = result.length;
    }

    return new Array(resultArrLen)
      .join(".")
      .split(".")
      .map((_item, idx) => ({
        id: symbol(idx),
        value: `${result[idx] ? result[idx].name : "精确匹配找不到噢~"}`,
        count: result.length,
      }));
  };

  const handleSearch = (val) => {
    if (val == "") {
      store.commit("deleteSearchResultInfo");
    }

    dataSource.value = val ? searchResult(val) : [];
  };

  return { inputValue, dataSource, onSelect, handleSearch };
};
// 搜索模块的使用
const { inputValue, dataSource, onSelect, handleSearch } = inputModel();

// iptv列表展示模块
const iptvListModel = () => {
  const store = useStore();
  const router = useRouter();

  const iptvListAll = computed(() => store.state.inptList.items);

  // 去详情页
  const toDetails = (name) => {
    store.commit(
      "addWatching",
      iptvListAll.value.find((item) => item.name === name)
    );

    router.push("/TvPlayPage");
  };

  //分页展示iptv列表
  const currentPage = computed({
    get() {
      return store.state.currentPage;
    },
    set(value) {
      store.commit("updateCurrentPage", value);
    },
  });
  const pageSize = ref(10);
  const iptvListShow = computed(() => {
    if (store.state.searchResultInfo.length > 0) {
      return store.state.searchResultInfo;
    }

    if (iptvListAll.value) {
      return iptvListAll.value.slice(
        (currentPage.value - 1) * 10,
        currentPage.value * pageSize.value
      );
    }
  });
  const iptvListTotal = computed(() => {
    if (store.state.searchResultInfo.length > 0) {
      return iptvListShow.value ? iptvListShow.value.length : 1;
    } else {
      return iptvListAll.value ? iptvListAll.value.length : 1;
    }
  });

  onMounted(() => {
    store.dispatch("setIPTVlist");
  });

  return {
    iptvListAll,
    toDetails,
    currentPage,
    pageSize,
    iptvListShow,
    iptvListTotal,
  };
};
// iptv列表展示模块的使用
const {
  iptvListAll,
  toDetails,
  currentPage,
  pageSize,
  iptvListShow,
  iptvListTotal,
} = iptvListModel();
</script>

<style lang="scss">
#app-home {
  @media screen and (max-width: 500px) {
    .iptv-list {
      flex: 1 0 100%;
      width: 100%;
    }
    .ant-page-header-heading {
      display: flex;
      flex-direction: column;
      .ant-page-header-heading-left {
        display: flex;
        justify-content: center;
        > span {
          font-size: 28px;
        }
        > .ant-page-header-heading-sub-title {
          margin-right: 0;
        }
      }
    }
    .search-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 120px;
      justify-content: space-between;
    }
  }

  @media screen and (min-width: 500px) and (max-width: 768px) {
    .iptv-list {
      flex: 1 0 100%;
      width: 100%;
    }
    .ant-page-header-heading {
      display: flex;
      flex-direction: column;
      .ant-page-header-heading-left {
        display: flex;
        justify-content: center;
        > span {
          font-size: 28px;
        }
        > .ant-page-header-heading-sub-title {
          margin-right: 0;
        }
      }
    }
    .search-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 120px;
      justify-content: space-between;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1366px) {
    .iptv-list {
      flex: 1 0 20%;
    }
    .search-box {
      display: flex;
      align-items: center;
      min-width: 450px;
      justify-content: space-around;
    }
  }

  @media screen and (min-width: 1366px) {
    .iptv-list {
      flex: 1 0 10%;
    }
    .search-box {
      display: flex;
      align-items: center;
      min-width: 450px;
      justify-content: space-around;
    }
    .iptv-list-box-active {
      display: block;
    }
  }

  .iptv-list-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-height: 300px;
    .iptv-list {
      // max-height: 75vh;
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
</style>
