<template>
	<view class="user_box background-set" :class="[userToken ? 'isSignIn' : '']">
		<view class="headerbar background-set" :style="{backgroundImage:'url(' + userbj + ')'}">
			<headerbar title="我的"></headerbar>
			<view class="headerPic flex up-center">
				<view class="headerPic1" @click="goLogin">
					<image :src="userInfo.avatar || '/static/img_logo.png'"></image>
				</view>
				<view class="headerPic1-txt flex up-center" @click="goLogin">
					<view class="headerPic1-txt-1">登录/注册</view>
					<view class="headerPic1-txt-2 iconfont">&#xe613;</view>
				</view>
				<view class="topYj">
					<view class="topYj1">
						<image src="/static/userbj1.png"></image>
						<view class="topYj1-c flex up-center">
							<view class="topYj1-c-ion">
								<image mode="widthFix" src="/static/qyicon.png"></image>
							</view>
							<view class="topYj1-c-txt">完成企业认证，员工一起学！</view>
							<view class="topYj1-c-btn">立刻认证</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="list-item flex up-center space-between">
				<view class="list-item-left flex up-center">
					<view class="list-item-icon"><image src="/static/userfankui.png"></image></view>
					<view class="list-item-t">意见反馈</view>
				</view>
				<view class="list-item-jt iconfont">&#xe613;</view>
			</view>
			<view class="list-item flex up-center space-between">
				<view class="list-item-left flex up-center">
					<view class="list-item-icon"><image src="/static/userhc.png"></image></view>
					<view class="list-item-t">恒昌介绍</view>
				</view>
				<view class="list-item-jt iconfont">&#xe613;</view>
			</view>
			<view class="list-item flex up-center space-between">
				<view class="list-item-left flex up-center">
					<view class="list-item-icon"><image src="/static/userhcdx.png"></image></view>
					<view class="list-item-t">关于恒昌大学</view>
				</view>
				<view class="list-item-jt iconfont">&#xe613;</view>
			</view>
			<view class="list-item flex up-center space-between">
				<view class="list-item-left flex up-center">
					<view class="list-item-icon"><image src="/static/userhcsc.png"></image></view>
					<view class="list-item-t">关于恒昌健康商城</view>
				</view>
				<view class="list-item-jt iconfont">&#xe613;</view>
			</view>
			<view class="list-item flex up-center space-between">
				<view class="list-item-left flex up-center">
					<view class="list-item-icon"><image src="/static/usershezhi.png"></image></view>
					<view class="list-item-t">设置</view>
				</view>
				<view class="list-item-jt iconfont">&#xe613;</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headerbar from "@/components/headerbar/headerbar";
	export default {
		components: {
			headerbar
		},
		data() {
			return {
				loading: true, // 是否显示骨架屏组件
				userToken: uni.getStorageSync('userToken'),
				userInfo: uni.getStorageSync('userInfo'),
				userbj: require('@/static/userbj.jpg'),
			};
		},
		mounted() {
		},
		methods: {
			onPageshow() {
				console.log('这是我的页面')
				if (!uni.getStorageSync('userToken')) {

				} else {

				}
			},
			goLogin() {
				// pageName: index:首页/course:课程/study:学习/enterprise:企业/user:我的
				if (!this.$checkLogin(this.$Base64.encodeURI('/pages/index/index?pageName=user'), 'navigateTo'))
					return // 判断有没有登陆，没有登陆跳转到登陆页面 一定写在onLoad生命周期函数里面
			}
		}
	};
</script>
<style lang="scss" scoped>
	.headerbar {
		width: 100%;
		height: 580rpx;
		position: relative;

		.headerPic {
			margin-top: 132rpx;
			padding: 0 30rpx;
			.headerPic1 {
				width: 120rpx;
				height: 120rpx;
				background: #FFFFFF;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.headerPic1-txt {
				color: #FFFFFF;
				margin-left: 24rpx;
				.headerPic1-txt-1 {
					font-weight: 600;
					font-size: 32rpx;
					line-height: 36rpx;
				}
				.headerPic1-txt-2 {
					margin-left: 0rpx;
					font-size: 38rpx;
				}

			}

		}
		.topYj {
			width: 100%;
			height: 160rpx;
			position: absolute;
			bottom: -1px;
			left: 0;
			.topYj1{
				position: relative;
				width: 100%;
				height: 100%;
				image{
					width: 100%;
					height: 100%;
				}
				.topYj1-c{
					position: absolute;
					top: 50rpx;
					left: 50rpx;
					.topYj1-c-ion{
						width: 52rpx;
						height: 52rpx;
						margin-right: 20rpx;
					}
					.topYj1-c-txt{
						width: 416rpx;
						overflow: hidden;
						font-size: 28rpx;
						color: #FFE3B9;
					}
					.topYj1-c-btn{
						font-size: 28rpx;
						width: 164rpx;
						height: 60rpx;
						background: linear-gradient(269.74deg, #FFE7B8 0.18%, #FFD098 99.75%);
						border-radius: 100rpx;
						color: #002F87;
						line-height: 60rpx;
						text-align: center;
					}
				}
			}
		}


	}
	.list{
		padding: 0 30rpx;
		.list-item{
			border-bottom: 1px solid #F3F3F3;
			height: 124rpx;
			.list-item-left{
				.list-item-icon{
					width: 40rpx;
					height: 40rpx;
					font-size: 0;
					margin-right: 20rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.list-item-t{
					font-size: 28rpx;
					color: #666666;
				}
			}
			.list-item-jt{
				color: #333333;
			}
		}
	}
</style>
