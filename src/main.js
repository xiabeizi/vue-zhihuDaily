import Vue from "vue";
import Api from "./api/api";
import store from "./store/index";
import "./assets/base.css";
import App from "./app.vue";

Vue.prototype.$api = Api;

new Vue({
	store,
	el: "#app",
	render: h => h(App)
});
