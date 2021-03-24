import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
	},
	mutations: {
		getVerison(state, callback) {
			Vue.prototype.$http('/public/params/code/WX_VERSION', 'GET').then((res) => {
				callback(res)
			})
		}
	},
	actions: {}
})

export default store
