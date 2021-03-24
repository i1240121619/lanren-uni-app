<template>
	<view class="container">
		<view class="userinfo">
			<view class="userinfo-avatar">
				<image mode="widthFix" src="/static/logo.png" />
			</view>
		</view>

		<view class='btn'>
			<button type='primary' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				微信一键登录
			</button>
		</view>
		<view class='btn btn1'>
			<button type='primary' @click="tellLogin">
				手机验证码登录
			</button>
		</view>
		<view class='tip'>未注册的手机号自动注册并登录</view>
	</view>
</template>

<script>
	import config from '../../common/config';
	import md5 from "../../common/md5";

	export default {
		components: {},
		data() {
			return {
				fromBase64: '', // Base64跳转路径
				from: '', // 跳转路径
				type: '', // 跳转方式
				code: ''
			}
		},
		created() {},
		onShow() {
		},
		onLoad(option) {
			this.fromBase64 = option.from ? option.from : this.$Base64.encodeURI('/pages/index/index')
			this.from = option.from ? this.$Base64.decode(option.from) : '/pages/index/index'
			// console.log(this.from)
			this.type = option.type || 'reLaunch'
		},
		methods: {
			tellLogin() {
				uni.navigateTo({
					url: '/pages/telLogin/telLogin?loginType=2&from=' + this.fromBase64 + '&type=' + this.type
				});
			},
			//第一授权获取用户信息===》按钮触发
			getPhoneNumber(e) {
				let _this = this;
				// wx登录
				uni.login({
					provider: 'weixin',
					success(res) {
						_this.code = res.code
						if (e.detail.errMsg.indexOf("getPhoneNumber:fail") != -1) {
							uni.showToast({
								title: '微信授权失败',
								icon: 'none'
							})
							return
						}
						//发起网络请求
						let _now = new Date();
						let ipInfo = uni.getStorageSync('IPInfo');
						let data = {
							code: _this.code,
							timestamp: _now.getTime(),
							sign: md5.hexMD5(_this.code + _now.getTime()),
							city: ipInfo.city,
							province: ipInfo.pro,
							loginIp: ipInfo.ip,
							os: uni.getStorageSync('systemType'),
							browser: 'mp-weixin'
						}
						uni.showLoading({
							title: '请稍等'
						})
						_this.$http('/user/api/user/xcx/xcxLogin', 'POST', data).then((res) => {
							uni.setStorageSync('userToken', res.data.token)
							if (res.code === 200) { // 一键登陆成功  已经绑定
								_this.$getUserInfo(() => {
									uni.hideLoading()
									uni[_this.type]({
										url: _this.from
									});
								})
							} else if (res.code === 100) { // 没有绑定
								uni.setStorageSync('wxUniCode', res.data.uniconId)
								uni.navigateTo({
									url: '/pages/telLogin/telLogin?loginType=1&from=' + _this.fromBase64 +
										'&type=' + _this.type + '&phone=' + res.data
								});
							} else {
								uni.hideLoading()
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}
						})
					},
					fail() {
						uni.showToast({
							title: '微信授权登陆失败',
							icon: 'none'
						})
					}
				})
			}
		},

	}
</script>

<style lang='scss' scoped>
	page {
		background: #fff;
		height: 100%;
	}
	.container{
		height: 100%;
	}

	.userinfo {
		position: relative;
		color: #000;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 160rpx;
	}

	.userinfo-avatar {
		overflow: hidden;
		display: block;
		width: 200rpx;
		height: 200rpx;
		margin-top: 80rpx;
		border-radius: 50%;
		image{
			width: 200rpx;
			height: 200rpx;
		}
	}

	.btn {
		padding: 20rpx 50rpx;
	}

	.btn button {
		width: 556rpx;
		height: 80rpx;
		background: linear-gradient(270.19deg, #002F87 9.25%, #1A53BF 102.17%);
		border-radius: 100rpx;
	}
	.btn .button-hover {
		background: linear-gradient(270.19deg, #002F87 9.25%, #1A53BF 102.17%);
		opacity: .8;
	}
	
	.btn1 button{
		background: #D6E4FF;
		border-radius: 100rpx;
		color: #002F87;
	}
	.btn1 .button-hover {
		background: #D6E4FF;
		opacity: .8;
		color: #002F87;
	}
	.btn1 button::after {
		border: none
	}
	.tip {
		font-size: 26rpx;
		line-height: 36rpx;
		text-align: center;
		color: #666666;
		position: absolute;
		bottom: 40rpx;
		left: 50%;
		transform: translateX(-50%);
		white-space:nowrap;
	}
</style>
