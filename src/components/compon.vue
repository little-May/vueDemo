<template>
  <div class="div">
    <ul>
      <!-- 进行一个for循环 -->
      <li v-for="(items,index) of lists" :key="index" class="item" @click="getValue(items)" :class="itemValue==items.value?'checked':''">
        {{items.id}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    // 传入一个数组
    props: ['lists'],
    data () {
      return {
        itemValue: ''
      }
    },
    methods: {
      getValue(item) {
        this.itemValue = item.value
        this.$emit('specValue',item);
      }
    }
  }
</script>

<style scoped>
.body div{
  overflow: hidden;
  margin-bottom: 10px;
}
ul{
  overflow: hidden;
  display: block;
  margin: 10px auto;
}
.item{
  float: left;
  width: 20px;
  height: 20px;
  background-color: blue;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  margin-left: 20px;
}
.checked{
  border: 1px solid red
}
</style>
