import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入element-ui和css文件
import "./assets/styles/reset.css";
// 引入样式重置的css样式
import axios from 'axios'
import Axios from 'axios'
//语音聊天
import Recorderx, { ENCODE_TYPE } from "recorderx";
const rc = new Recorderx();

Vue.prototype.$ajax = axios
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
	render: h => h(App),
	router,
	store,
}).$mount('#app')
