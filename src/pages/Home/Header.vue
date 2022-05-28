<template>
  <!-- 页头 -->
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="Home"
    sub-title="Welcome to IPTV"
    id="app-header"
  >
    <template #extra>
      <!-- 搜索 -->
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
                :placeholder="
                  iptvListAll
                    ? '中国源频道数量  ' + iptvListAll.length
                    : '频道数量  ' + 0
                "
                enter-button
              ></a-input-search> </a-auto-complete
          ></a-col>
        </a-row>
      </div>
    </template>
  </a-page-header>
</template>

<script setup>
// 搜索模块
import { ref, computed, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const props = defineProps({
  iptvListAll: {
    type: Array,
    required: true,
  },
});

const { iptvListAll } = toRefs(props);

const store = useStore();
const inputValue = ref("");
const dataSource = ref([]);

// 搜索结果
const searchResultInfo = ref(store.state.searchResultInfo);
watch(searchResultInfo, (val) => store.commit("addSearchResultInfo", val));

// 用户选中匹配数据
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
      id: idx,
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
</script>

<style lang="scss">
#app-header {
  position: sticky;
  top: -1px;
  background-color: white;
  z-index: 15;

  @media screen and (min-width: 0px) and (max-width: 540px) {
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
  }

  @media screen and (max-width: 600px) {
    .search-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  }

  @media screen and (min-width: 600px) and (max-width: 1366px) {
    .search-box {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }

  @media screen and (min-width: 1366px) {
    .search-box {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
}
</style>
