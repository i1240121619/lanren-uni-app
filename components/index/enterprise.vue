<template>
	<view class="enterprise flex all-center" style="height: 100vh;">
		这是企业页面
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userToken: uni.getStorageSync('userToken'),
				userInfo: uni.getStorageSync('userInfo')
			};
		},
		methods: { 
			_onLoad() {
				console.log('这是企业页面_onLoad')
			},
			_onShow() {
				console.log('这是企业页面_onShow')
			},
			goLogin() {
			}
		}
	};
</script>
<style lang="scss" scoped>
</style>
