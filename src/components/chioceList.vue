<template>
   <div class="specList">
    <!-- <div v-for="(goodsValue,i) of valueMap" :key="i">
      <p>{{i}}</p>
      <ul class="clearfix">
        <li style="margin-bottom:20rpx;" :class="goodsSpec.id==index ?  'active' : ''" v-for="goodsSpec of goodsValue" :key="goodsSpec.id" @click="getSpec(goodsSpec.id)">{{ goodsSpec.value }}</li>
      </ul>
    </div> -->
    <div v-for="items of lists" :key="items">
      {{items[0]}}
      <compon :lists="items[1]" @specValue="getValue"></compon>
    </div>
  </div>
</template>

<script>
import compon from './compon'
export default {
  components: {
    compon
  },
  data () {
    return {
      valueMap:{
        重量:[
          {id:9,specId:3,value:"33"},
          {id:7,specId:3,value:"22"}
        ],
        尺寸:[
          {id:10,specId:1,value:"33"},
          {id:8,specId:1,value:"22"}
        ]
      },
      index: -1,
      specId: '',
      sizeValue: '',
      kgValue:'',
      lists: [],
      specKg: '',
      specSize: ''
    }
  },
  methods: {
    // 选择规格
    // getSpec (idx) {
    //   this.index = idx
    //   console.log(this.index)
    // }
    getValue (item) {
      console.log(item)
    }
  },
  mounted () {
    console.log(111)
    this.lists = Object.entries(this.valueMap)
    console.log(this.lists)
  }
}
</script>

<style scope>
*{
  margin: 0;
  padding: 0;
}
.specList {
    padding: 0 10px;
    margin-top: 30px;
}
.specList ul li {
    list-style: none;
    display: block;
    width: 20PX;
    height: 30px;
    float: left;
    line-height: 30px;
    color: #333;
    font-size: 0.26rem;
    background: #eaee0e;
    margin-right: 0.28rem;
    min-width: 0.38rem;
    text-align: center;
}
.specList p {
    color: #333;
    margin-bottom: 20px;
    width: 100%;
}
.clearfix {
    zoom: 1;
}
.clearfix:before,
.clearfix:after{
  display:table; 
  content:"";
}
.clearfix:after{
  clear:both;
}
ul li.active {
    color: #fff;
    background: #eb1010;
}
</style>
