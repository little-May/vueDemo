<template>
  <div class="goodsSpec">
    <div class="goodsSpec_top">
      <h2>规格(可选)</h2>
      <ul :class="boxShow ? 'draw-active clearfix' : 'clearfix'">
        <li
          v-for="item in GoodsSpecList"
          :key="item.id"
          @click="choseSku(item.id, item.name)"
          :class="classValue.indexOf(item.id) > -1 ? 'active' : ''"
        >
          {{ item.name }}
        </li>
        <span @click="addSpec()">自定义</span>
      </ul>
      <div class="btn">
        <p @click="openSpec" v-if="!boxShow">
          <img src="../../../assets/img/wap/goodsSpec_img1.png" />
        </p>
        <p @click="closeSpec" v-else>
          <img src="../../../assets/img/wap/goodsSpec_img2.png" />
        </p>
      </div>
    </div>
    <div class="goodsSpec_bot">
      <h2>规格/价格/库存</h2>
      <div class="div1" v-if="classValue.length == 0">
        <p>你需要选择相应的规格类型，才能组合成完成的规格信息</p>
      </div>
      <div class="div2" v-else>
        <ul v-for="(list, index) in goodsSkuModels" :key="index">
          <li>
            <p
              class="clearfix"
              v-for="(sku, vindex) in choseSkuValue"
              :key="vindex"
            >
              <span>{{ sku.name }}</span>
              <input
                type="text"
                :placeholder="'请输入' + sku.name"
                v-model="
                  goodsSkuModels[index].goodsSkuSpecValueModels[vindex]
                    .goodsSpecValueName
                "
              />
            </p>
            <p class="clearfix">
              <span>价格</span>
              <input
                type="text"
                placeholder="￥0.00"
                v-model="goodsSkuModels[index].prince"
              />
            </p>
            <p class="clearfix">
              <span>库存</span>
              <input
                type="text"
                placeholder="不填默认无限库存"
                v-model="goodsSkuModels[index].stock"
              />
            </p>
          </li>
        </ul>
        <div class="add clearfix">
          <img src="../../../assets/img/wap/spec_add.png" />
          <p @click="addSkuList">添加规格</p>
        </div>
      </div>
    </div>
    <div class="goodsSpec_btn">
      <button :style="{ background: color }" @click="skuListSure">确定</button>
    </div>
    <!--新增规格-->
    <van-popup v-model="isSpecGoods" class="namePop">
      <img
        src="../../../assets/img/wap/popClose.png"
        @click="isSpecGoods = false"
      />
      <p>新增规格</p>
      <el-input v-model="specName" placeholder="请输入规格名称"></el-input>
      <a :style="{ background: color }" @click="saveSpecName()">确定</a>
    </van-popup>
  </div>
</template>
<style lang="scss"></style>

<script>
/* eslint-disable no-sequences */

export default {
  data() {
    return {
      boxShow: false,
      isSpecGoods: false,
      specName: "",
      GoodsSpecList: [],
      choseSkuValue: [], // 规格id,name
      classValue: [], // id
      goodsSkuModels: [
        {
          prince: "",
          stock: "", // 库存
          goodsSkuSpecValueModels: [
            {
              goodsSpecValueName: "",
              goodsSpecId: ""
            },
            {
              goodsSpecValueName: "",
              goodsSpecId: ""
            }
          ]
        }
      ]
    };
  },
  created() {
    this.getGoodsSpecList();
    var goodsSkuModels = [
      {
        prince: "",
        stock: "",
        goodsSkuSpecValueModels: [
          {
            goodsSpecValueName: "",
            goodsSpecId: ""
          },
          {
            goodsSpecValueName: "",
            goodsSpecId: ""
          }
        ]
      }
    ];
    this.goodsSkuModels = JSON.parse(sessionStorage.getItem("goodsSkuModels"))
      ? JSON.parse(sessionStorage.getItem("goodsSkuModels"))
      : goodsSkuModels;
    this.classValue = JSON.parse(sessionStorage.getItem("classValue"))
      ? JSON.parse(sessionStorage.getItem("classValue"))
      : [];
    this.choseSkuValue = JSON.parse(sessionStorage.getItem("choseSkuValue"))
      ? JSON.parse(sessionStorage.getItem("choseSkuValue"))
      : [];
    console.log("=========");
    console.log(JSON.parse(sessionStorage.getItem("choseSkuValue")));
  },
  methods: {
    // 商品规格列表
    async getGoodsSpecList() {
      let res = await getGoodsSpecList({ pageNo: 1, pageSize: 999 });
      if (res.code > 0) {
        this.GoodsSpecList = res.content.list ? res.content.list : [];
      }
      console.log(res);
    },
    // 选择商品规格
    choseSku(id, name) {
      // sessionStorage.setItem('goodsSkuModels', JSON.stringify(this.goodsSkuModels))
      // console.log(event.target)
      // console.log(event.target)
      console.log("SkuModels-----------------");
      console.log(this.goodsSkuModels);
      let index = this.choseSkuValue.findIndex(function(item) {
        return item.id === id;
      });
      console.log("index=============");
      console.log(index);
      if (index > -1) {
        this.choseSkuValue.splice(index, 1);
        this.classValue.splice(index, 1);
        // console.log('classValue======================')
        // console.log(this.classValue.splice(index, 1))
        // console.log(this.choseSkuValue)
      } else {
        if (this.choseSkuValue.length < 2) {
          this.choseSkuValue.push({ id: id, name: name });
          this.classValue.push(id);
        } else {
          Toast("规格最多选取两个");
        }
      }
      // console.log('this.classValue.indexOf(id)------------------------')
      // console.log(this.classValue)
      console.log("choseSkuValue=========");
      console.log(this.choseSkuValue); // id:12 name:尺寸
      console.log("this.goodsSkuModels--------------------");
      console.log(this.goodsSkuModels);
      // console.log(this.goodsSkuModels[0].goodsSkuSpecValueModels[0].goodsSpecValueName)
      // if (this.goodsSkuModels[0].goodsSkuSpecValueModels[0].goodsSpecValueName) {
      //   console.log(111)
      //   this.goodsSkuModels = [
      //     {
      //       prince: '',
      //       stock: '',
      //       goodsSkuSpecValueModels: [{
      //         goodsSpecValueName: '',
      //         goodsSpecId: ''
      //       }, {
      //         goodsSpecValueName: '',
      //         goodsSpecId: ''
      //       }]
      //     }
      //   ]
      // }
      // for (let i = 0; i < this.goodsSkuModels.length; i++) {
      //   for (let j = 0; j < this.goodsSkuModels[0].goodsSkuSpecValueModels.length; j++) {
      //     console.log(name)
      //     var SpecName = this.goodsSkuModels[i].goodsSkuSpecValueModels[j].goodsSpecName
      //     console.log('i=======' + i)
      //     console.log('j=======' + j)
      //     console.log('SpecName==========' + SpecName)
      //     if (name === SpecName) {
      //       console.log('相等')
      //       this.goodsSkuModels[i].goodsSkuSpecValueModels.splice(i, 1)
      //       this.choseSkuValue.splice(i, 1)
      //       // this.goodsSkuModels[i].goodsSkuSpecValueModels[j].goodsSpecValueName = ''
      //       console.log(this.goodsSkuModels)
      //       console.log('点击规格=====================')
      //       console.log(this.goodsSkuModels[i].goodsSkuSpecValueModels[j].goodsSpecName)
      //     }
      //   }
      // }
    },
    // 添加商品规格值列表
    addSkuList() {
      this.goodsSkuModels.push({
        prince: "",
        stock: "",
        goodsSkuSpecValueModels: [
          {
            goodsSpecValueName: "",
            goodsSpecId: ""
          },
          {
            goodsSpecValueName: "",
            goodsSpecId: ""
          }
        ]
      });
    },
    // 确定
    skuListSure() {
      if (this.classValue.length === 0) {
        Toast("请选择规格");
        return;
      }
      for (let i = 0; i < this.goodsSkuModels.length; i++) {
        // 规格为空时
        for (
          let j = 0;
          j < this.goodsSkuModels[0].goodsSkuSpecValueModels.length;
          j++
        ) {
          if (
            this.goodsSkuModels[i].goodsSkuSpecValueModels[j]
              .goodsSpecValueName === ""
          ) {
            Toast(
              "请输入" +
                this.goodsSkuModels[i].goodsSkuSpecValueModels[j].goodsSpecName
            );
            console.log("点击确定====================");
            console.log(
              this.goodsSkuModels[i].goodsSkuSpecValueModels[j].goodsSpecName
            );
            return;
          }
        }
        // 价格为空时
        if (this.goodsSkuModels[i].prince === "") {
          Toast("请输入价格");
          return;
        }
        // var prince = this.goodsSkuModels[i].prince
        // prince = prince.toFixed(2)
        // console.log(prince)
        if (this.goodsSkuModels[i].stock === "") {
          this.goodsSkuModels[i].stock = 999999;
        }
        if (this.classValue.length === 2) {
          this.goodsSkuModels[
            i
          ].goodsSkuSpecValueModels[0].goodsSpecName = this.choseSkuValue[0].name;
          this.goodsSkuModels[
            i
          ].goodsSkuSpecValueModels[0].goodsSpecId = this.choseSkuValue[0].id;
          this.goodsSkuModels[
            i
          ].goodsSkuSpecValueModels[1].goodsSpecName = this.choseSkuValue[1].name;
          this.goodsSkuModels[
            i
          ].goodsSkuSpecValueModels[1].goodsSpecId = this.choseSkuValue[1].id;
        } else {
          this.goodsSkuModels[
            i
          ].goodsSkuSpecValueModels[0].goodsSpecName = this.choseSkuValue[0].name;
          this.goodsSkuModels[
            i
          ].goodsSkuSpecValueModels[0].goodsSpecId = this.choseSkuValue[0].id;
          this.goodsSkuModels[i].goodsSkuSpecValueModels.splice(1, 1);
        }
      }
      sessionStorage.setItem(
        "goodsSkuModels",
        JSON.stringify(this.goodsSkuModels)
      );
      sessionStorage.setItem(
        "choseSkuValue",
        JSON.stringify(this.choseSkuValue)
      );
      sessionStorage.setItem("classValue", JSON.stringify(this.classValue));
      // window.location.href = '/addGoods'
      console.log("sessionStorage---goodsSkuModels==========");
      console.log(this.goodsSkuModels);
    },
    openSpec() {
      this.boxShow = true;
    },
    closeSpec() {
      this.boxShow = false;
    },
    /* 自定义 */
    addSpec() {
      this.isSpecGoods = true;
    },
    // 添加自定义规格内容
    async saveSpecName() {
      let res = await saveSpecName({ name: this.specName });
      if (res.code > 0) {
        var id = this.GoodsSpecList.length + 1;
        this.GoodsSpecList.push({ id, name: this.specName });
        this.isSpecGoods = false;
        this.specName = "";
      }
      console.log(res);
    }
  }
};
</script>
