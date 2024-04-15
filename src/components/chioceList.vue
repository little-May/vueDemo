<template>
  <div class="specList">
    <div v-for="(goodsValue, i) of valueMap" :key="i">
      <p>{{ i }}</p>
      <ul class="clearfix">
        <li
          :class="goodsSpec.id == index ? 'active' : ''"
          v-for="goodsSpec of goodsValue"
          :key="goodsSpec.id"
          @click="getSpec(goodsSpec.id)"
        >
          {{ goodsSpec.value }}
        </li>
      </ul>
    </div>
    <!-- <div v-for="items in lists" :key="items.id">
      {{ items[0] }}
      <compon :lists="items[1]" @specValue="getValue"></compon>
    </div> -->
  </div>
</template>

<script>
import compon from "./compon";
export default {
  components: {
    compon
  },
  data() {
    return {
      valueMap: {
        大小: [
          { id: 9, specId: 3, value: "小果" },
          { id: 7, specId: 3, value: "大果" }
        ],
        重量: [
          { id: 10, specId: 1, value: "500g" },
          { id: 8, specId: 1, value: "1000g" }
        ]
      },
      index: -1,
      specId: "",
      sizeValue: "",
      kgValue: "",
      lists: [],
      specKg: "",
      specSize: ""
    };
  },
  methods: {
    // 选择规格
    getSpec(idx) {
      this.index = idx;
      console.log(this.index);
    },
    getValue(item) {
      console.log(item);
    }
  },
  mounted() {
    console.log(111);
    this.lists = Object.entries(this.valueMap);
    console.log(this.lists);
  }
};
</script>

<style lang="scss">
.specList {
  padding: 0 10px;
  margin-top: 30px;
  span {
    font-size: 0.3rem;
  }
  ul li {
    display: block;
    float: left;
    font-size: 0.4rem;
    padding: 0.2rem 0.3rem;
    background: #eaee0e;
    margin-right: 0.28rem;
    &.active {
      color: #fff;
      background: #eb1010;
    }
  }
  p {
    color: #333;
    font-size: 0.5rem;
    margin: 0.25rem 0;
    width: 100%;
  }
  // .clearfix {
  //   zoom: 1;
  // }
  // .clearfix:before,
  // .clearfix:after {
  //   display: table;
  //   content: "";
  // }
  // .clearfix:after {
  //   clear: both;
  // }
}
</style>
