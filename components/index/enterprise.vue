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
			onPageshow() {
				console.log('这是企业页面')
			},
			goLogin() {
			}
		}
	};
</script>
<style lang="scss" scoped>
</style>
