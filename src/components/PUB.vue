<template>
  <div class="body">
    <div v-for="items of lists" :key="items">
      {{items[0]}}
      <list-item :lists="items[1]" @specValue="getValue"> </list-item>
    </div>
  </div> 
</template>

<script>
import ListItem from './compon';
export default {
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
      sizeValue: '',
      kgValue:'',
      lists: [],
      specKg: '',
      specSize: ''
    }
  },
  methods: {
    getValue (item) {
      console.log(item)
    }
  },
  mounted () {
    this.lists = Object.entries(this.valueMap)
  },
  components: {
    ListItem
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
  border: 1px solid red;
}
</style>
