<template>
	<view class="webview">
		<web-view :src="urlAll" @message="getMessage"></web-view>
	</view>
</template>
<script>

	export default {
		components: {
		},
		data() {
			return {
				title: '',
				link: '',
				urlAll: '',
				userInfo: '',
				storeInfo: '',
			}
		},
		onLoad(options) {
			this.link = this.$Base64.decode(options.link)
			uni.setNavigationBarTitle({
				title: ''
			})
			this.$nextTick(() => {
				this.init()
			})
		},
		methods: {
			init() {
				this.userInfo = uni.getStorageSync('userInfo')
				this.$refs.positionChange.init()
			},
			positionChangeCallback(obj) { // 实时获取门店信息
				this.storeInfo = uni.getStorageSync('storeInfo')
				let link = this.link
				// let link = 'http://192.168.138.165:8080/pagesA/zt/20200320/20200320'
				this.urlAll = link + '?access_token=' + uni.getStorageSync('access_token') + '&userInfo=' + this.$Base64.encodeURI(
						JSON.stringify(this.userInfo)) + '&storeInfo=' + this.$Base64.encodeURI(JSON.stringify(this.storeInfo)) +
					'&link=' + this.$Base64.encodeURI(this.link) + '&timestamp=' + parseInt(new Date().getTime() /
						1000)
				console.log(this.urlAll)
			},
			onShareAppMessage(res) {
				let path = `/pagesA/webview/webview?link=${this.$Base64.encodeURI(this.link)}`
				console.log(path)
				return {
					title: this.title,
					path
				}
			},
			getMessage(event) {
				this.title = event.detail.data[0].title
			}
		}
	}
</script>
<style lang="scss">
	.url {
		text-align: center;
		margin-top: 200rpx;
		font-size: 48rpx;
		color: #666666;
	}
</style>
