import Vue from "vue";
import Router from "vue-router";
import add from "../components/add.vue";
import chioceList from "../components/chioceList.vue";
import chioceList2 from "../components/chioceList2.vue";
import pub from "../components/PUB.vue";
import HelloWorld from "../components/HelloWorld.vue";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/add", name: "add", component: add },
    { path: "/chioceList", name: "chioceList", component: chioceList },
    { path: "/chioceList2", name: "chioceList2", component: chioceList2 },
    { path: "/pub", name: "pub", component: pub },
    { path: "/HelloWorld", name: "HelloWorld", component: HelloWorld }
  ]
});
