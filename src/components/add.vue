<template>
  <div class="add">
    <div class="title">添加品牌</div>
    <div>
      <label>序号：<input type="text" v-model="id"></label>
      <label>名字：<input type="text" v-model="name"></label>
      <button type="button" @click="add()">添加</button>
      <label>搜索名称关键字：<input type="text" v-model="keywords"></label>
    </div>
    <table>
      <thead>
        <tr>
          <td>序号</td>
          <td>品牌</td>
          <td>添加时间</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <!-- <tr v-for="item of search(keywords)" :key="item.id"> -->
        <tr v-for="item of list" :key="item.id">
          <td>{{ item.id }}</td>
          <td v-text="item.name"></td>
          <td>{{ item.createTime }}</td>
          <td><a href="" @click.prevent="del(item.id)">删除</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { id: 1, name: '奔驰', createTime: new Date() },
        { id: 2, name: '宝马', createTime: new Date() },
        { id: 3, name: '奥迪', createTime: new Date() },
        { id: 4, name: '玛莎拉蒂', createTime: new Date() }
      ],
      id: '',
      name: '',
      keywords: ''
    }
  },
  methods: {
    //添加
    add () {
      var car = {
        id: this.id,
        name: this.name,
        createTime: new Date()
      }
      this.list.push(car)
      this.id = this.name = ''
    },
    //删除
    del (id) {
      //findIndex数组方法  传入一个函数  函数返回符合比较条件的第一个元素所在的下标
      var index = this.list.findIndex(function (item) {
        console.log(item)
        if (item.id == id) {
          return true
        }
      });
      this.list.splice(index,1);//删除下标之后个数元素
      console.log(index)
    },
    //搜索功能--有bug
    search (keywords) {//通过关键字去搜索
      var result = this.list.filter(function (item) {
        if(item.name.includes(keywords)){
          return true
        }
      });//过滤数组中的元素
      console.log(result)
    }
  }
}
</script>

<style scoped>
  .add{
    width: 750px;
    padding: 10px;
    margin: 0 auto;
    border: 1px solid #000;
  }
  .title{
    text-align: center
  }
</style>
