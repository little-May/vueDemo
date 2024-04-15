<template>
  <div id="vmsimulatedDATA" class="productBox">
    <div class="productConten">
      <div
        class="product-delcom"
        v-for="(ProductItem, n) in simulatedDATA.specifications"
        :key="n"
      >
        <p>{{ ProductItem }}</p>
        <p>{{ ProductItem.name }}</p>
        <ul class="product-footerlist clearfix">
          <li
            v-for="(oItem, index) in ProductItem.item"
            :key="index"
            v-on:click="specificationBtn(oItem.name, n, $event, index)"
            v-bind:class="[
              oItem.isShow ? '' : 'noneActive',
              subIndex[n] == index ? 'productActive' : ''
            ]"
          >
            {{ oItem.name }}
            {{ oItem.isShow }}
          </li>
        </ul>
      </div>
      <p>数量：{{ shopStock }}</p>
    </div>
    <div class="product-footer">
      <a href="javascript:">立即购买</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      simulatedDATA: {
        //模拟后台返回的数据 多规格
        difference: [
          {
            //所有的规格可能情况都在这个数组里
            id: "19",
            price: "200.00",
            stock: "19",
            difference: "100,白色"
          },
          {
            id: "20",
            price: "300.00",
            stock: "29",
            difference: "200,白色"
          },
          {
            id: "21",
            price: "300.00",
            stock: "10",
            difference: "100,黑色"
          },
          {
            id: "22",
            price: "300.00",
            stock: "0",
            difference: "200,黑色"
          },
          {
            id: "23",
            price: "500.00",
            stock: "48",
            difference: "100,绿色"
          },
          {
            id: "24",
            price: "500.00",
            stock: "0",
            difference: "200,绿色"
          }
        ],
        specifications: [
          {
            //这里是要被渲染字段
            name: "尺寸",
            item: [
              {
                name: "100"
              },
              {
                name: "200"
              }
            ]
          },
          {
            name: "颜色",
            item: [
              {
                name: "白色"
              },
              {
                name: "黑色"
              },
              {
                name: "绿色"
              }
            ]
          }
        ]
      },
      selectArr: [], //存放被选中的值
      shopItemInfo: {}, //存放要和选中的值进行匹配的数据
      subIndex: [], //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
      shopStock: 0
    };
  },
  created() {
    // var self = this;
    for (let i in this.simulatedDATA.difference) {
      this.shopItemInfo[
        this.simulatedDATA.difference[i].difference
      ] = this.simulatedDATA.difference[i]; //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
    }
    console.log("this.shopItemInfo---", this.shopItemInfo);
    this.checkItem();
  },
  mounted() {},
  methods: {
    specificationBtn(item, n, event, index) {
      /* item: 尺寸/颜色的仔细分类。100,200/白色，黑色，绿色
           n：specifications的数组位置
           index：specifications的item的对象位置
        */
      // var self = this;
      console.log("selectArrClick---", this.selectArr);
      // 点击的值是否是已被选中的值
      if (this.selectArr[n] != item) {
        // 如果不是，把值存放到被选中的值的数组中
        this.selectArr[n] = item;
        // 值的数组下标，存放到已选中的数组中，判断有值，加productActive
        this.subIndex[n] = index;
      } else {
        // 值被选中时清空
        this.selectArr[n] = "";
        this.subIndex[n] = -1; //去掉选中的颜色
      }
      this.checkItem();
    },
    checkItem() {
      // var self = this;
      let option = this.simulatedDATA.specifications;
      let result = []; //定义数组存储被选中的值
      for (let i in option) {
        result[i] = this.selectArr[i] ? this.selectArr[i] : "";
      }
      console.log("result===", result);
      for (let i in option) {
        console.log("i---", i);
        let last = result[i]; //把选中的值存放到字符串last去,如果保存在数组中，会被遍历赋值覆盖
        console.log("last---", last);
        for (let k in option[i].item) {
          result[i] = option[i].item[k].name; //赋值，存在直接覆盖，不存在往里面添加name值
          console.log("result？？？？？？", result);
          option[i].item[k].isShow = this.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
        }
        result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
        // console.log("=======", this.shopItemInfo[result]);
        this.shopStock = this.shopItemInfo[result]
          ? this.shopItemInfo[result].stock
          : 0;

        // console.log(".....", result[i]);
      }
      this.$forceUpdate(); //重绘。强制更新视图
    },

    // 不let result
    /*     checkItem() {
      // var self = this;
      let option = this.simulatedDATA.specifications;
      for (let i in option) {
        // console.log(i);
        let last = this.selectArr[i]; //把选中的值存放到字符串last去
        console.log("-------", this.selectArr);
        for (let k in option[i].item) {
          this.selectArr[i] = option[i].item[k].name; //赋值，存在直接覆盖，不存在往里面添加name值
          option[i].item[k].isShow = this.isMay(this.selectArr); //在数据里面添加字段isShow来判断是否可以选择
        }
        this.selectArr[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
        console.log("=======", this.selectArr);
        this.shopStock = this.shopItemInfo[this.selectArr]
          ? this.shopItemInfo[this.selectArr].stock
          : "未显示";
      }
      this.$forceUpdate(); //重绘。强制更新视图
    }, */
    isMay(result) {
      // 通过判断isShow，true or false。是否加样式 noneActive

      for (let i in result) {
        // console.log("isMay--result", result);
        if (result[i] == "") {
          return true; //如果数组里有为空的值，那直接返回true
        }
      }
      // console.log("this.shopItemInfo", this.shopItemInfo);
      // 没有库存，无法点击，添加样式noneActive
      // checkItem中，不let result
      // return this.shopItemInfo[result]
      //   ? this.shopItemInfo[result].stock == 0
      //     ? false
      //     : true
      //   : true; //匹配选中的数据的库存，若不为空返回true反之返回false
      return this.shopItemInfo[result].stock == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
    }
  }
};
</script>

<style>
/* body {
    font-family: "Microsoft YaHei", "arial";
    background-color: #f2f2f2;
    background-color: rgba(0, 0, 0, 0.6);
  }
  ol,
  ul {
    list-style: none;
  }
  
  li {
    list-style-type: none;
  }
  .clearfix:after {
    display: block;
    overflow: hidden;
    clear: both;
    height: 0;
    visibility: hidden;
    content: "";
  }
  
  * {
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  } */

/* @media screen and (max-width: 319px) {
    html {
      font-size: 42.666665px;
    }
  }
  @media screen and (min-width: 320px) and (max-width: 359px) {
    html {
      font-size: 42.66666px;
    }
  }
  @media screen and (min-width: 360px) and (max-width: 374px) {
    html {
      font-size: 48px;
    }
  }
  @media screen and (min-width: 375px) and (max-width: 383px) {
    html {
      font-size: 50px;
    }
  }
  @media screen and (min-width: 384px) and (max-width: 399px) {
    html {
      font-size: 51.2px;
    }
  }
  @media screen and (min-width: 400px) and (max-width: 413px) {
    html {
      font-size: 53.333335px;
    }
  }
  @media screen and (min-width: 414px) {
    html {
      font-size: 55.2px;
    }
  } */
.productBox {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
}
.productConten {
  margin-bottom: 1rem;
}
.product-delcom {
  padding: 0.24rem 7%;
  color: #323232;
  font-size: 0.26rem;
  border-bottom: 1px solid #eeeeee;
}
.product-footerlist {
  margin-top: 0.1rem;
}
.product-footerlist li {
  border: 1px solid #606060;
  border-radius: 0.08rem;
  color: #606060;
  text-align: center;
  padding: 0.04rem 0.16rem;
  float: left;
  margin-right: 0.16rem;
  min-width: 0.96rem;
  margin-bottom: 0.16rem;
}
.product-footerlist li.productActive {
  background-color: #1a1a29;
  color: #fff;
  border: 1px solid #1a1a29;
}
.product-footerlist li.noneActive {
  background-color: #ccc;
  opacity: 0.4;
  color: #000;
  pointer-events: none;
}
.product-footer {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex: 1;
  -webkit-box-flex: 1;
  flex: 1;
  background-color: #1a1a29;
  line-height: 1rem;
  text-align: center;
}
.product-footer a {
  -webkit-flex: 1;
  -webkit-box-flex: 1;
  flex: 1;
  color: #fff;
  font-size: 0.3rem;
  text-decoration: none;
}
</style>
