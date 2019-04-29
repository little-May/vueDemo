import Vue from 'vue'
import Router from 'vue-router'
import add from '../components/add.vue'
import chioceList from '../components/chioceList.vue'
import pub from '../components/PUB.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/add', name: 'add', component: add },
    { path: '/chioceList', name: 'chioceList', component: chioceList },
    { path: '/pub', name: 'pub', component: pub }
  ]
})
