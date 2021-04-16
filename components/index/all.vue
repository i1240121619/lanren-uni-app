<template>
	<view class="all">
		<view class="all1">
			<view class="test flex up-center" v-if="openPage">
				<view class="test-1">
					切换底部tabar
				</view>
				<view class="test-2">
					<view class="switch">
						<u-switch v-model="checked" @change="change"></u-switch>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openPage: 1, // 测试属性 开启测试页面
				checked: false, // 测试属性
			};
		},
		methods: {
			_onLoad() {
				console.log('这是全部页面_onLoad')
			},
			_onShow() {
				console.log('这是全部页面_onShow')
			},
			change(status) { // 测试函数
			   if (status) {
				   this.$parent.userInfo = {
				   	company: 1
				   }
			   } else {
				   this.$parent.userInfo = {
				   	company: 0
				   }
			   }
			},
		}
	};
</script>
<style lang="scss" scoped>
	.test-1{
		margin-right: 20rpx;
	}
	.all1{
		margin-top: 150rpx;
		padding: 0 30rpx;
	}
	
</style>
