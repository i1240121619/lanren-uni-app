import Vue from 'vue'
import store from './store'
import App from './App'
import uView from "uview-ui"

import tool from './common/tool'
import { Base64 } from 'js-base64'

import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue"

Vue.component('mescroll-body', MescrollBody)
Vue.use(uView)
Vue.prototype.$http = tool.http
Vue.prototype.$checkLogin = tool.checkLogin
Vue.prototype.$Base64 = Base64
Vue.prototype.$findIndex = tool.findIndex
Vue.prototype.$findItem = tool.findItem
Vue.prototype.$wordbook = tool.wordbook
Vue.prototype.$getLocal = tool.getLocal
Vue.prototype.$addLocal = tool.addLocal
Vue.prototype.$saveLocal = tool.saveLocal

Vue.prototype.$getUserInfo = tool.getUserInfo
Vue.prototype.$getUni = tool.getUni 
Vue.prototype.$getCurrent = tool.getCurrent
Vue.prototype.$getOsInfo = tool.getOsInfo

Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})

/**
 *  因工具函数属于公司资产, 所以直接在Vue实例挂载几个常用的函数
 *  所有测试用数据均存放于根目录json.js
 *  
 *  css部分使用了App.vue下的全局样式和iconfont图标，有需要图标库的可以留言。
 *  示例使用了uni.scss下的变量, 除变量外已尽量移除特有语法,可直接替换为其他预处理器使用
 */
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type => {
	//模拟异步请求数据
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}


Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {
	msg,
	json,
	prePage
};

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
