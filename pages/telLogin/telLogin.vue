<template>
	<view class="container">
		<view class='header'>
			<image src='/static/logo.png'></image>
		</view>
		<view class='content'>
			<view class="tel">
				<view class="tel-0">+86</view>
				<view class="tel-1">
					<input v-model="phone" maxlength="11" placeholder="请输入手机号码" />
				</view>
				<view class="del iconfont" @click="del" v-if="phone"></view>
			</view>
			<view class="telcodeall flex">
				<view class="telcode">
					<view class="tel-1">
						<input v-model="phoneCode" placeholder="请输入手机验证码" />
					</view>
				</view>
				<view class="verification-code">
					<view v-show="show" class="form-item-right"><button class="getUserInfo" @click="getUserInfo"><text
								v-show="show1">获取验证码</text><text v-show="!show1">重发验证码</text></button></view>
					<view v-show="!show" class="form-item-right">{{count}}s</view>
				</view>
			</view>
		</view>
		<view class='btn'>
			<button type='primary' @click="wxLogin" @keyup.enter="wxLogin" :disabled='!phone'>
				登录
			</button>
		</view>
		<view class="quickLogon" @click="quickLogon">微信一键登录</view>
		<view class='tip'>
			<view>登录注册即表明您已同意<span class="xy1" @click="userTerms">《用户协议》</span>和<span class="xy1"
					@click="privacyTerms">《隐私政策》</span></view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config';
	import reg from '../../common/reg';

	export default {
		data() {
			return {
				fromBase64: '', // Base64跳转路径
				loginType: '', // 登陆方式
				from: '', // 跳转路径
				type: '', // 跳转方式
				phone: '',
				phoneCode: '',
				code: '',
				count: '',
				timer: '',
				show: true,
				show1: true
			}
		},
		onLoad(option) {
			this.loginType = option.loginType // 1:一键登陆绑定/2:手机登陆
			this.fromBase64 = option.from ? option.from : this.$Base64.encodeURI('/pages/index/index')
			this.from = option.from ? this.$Base64.decode(option.from) : '/pages/index/index'
			this.type = option.type || 'reLaunch'
		},
		methods: {
			quickLogon() {
				uni.navigateBack()
			},
			getUserInfo() {
				let _this = this;
				if (!_this.phone || !reg.tel_reg.test(_this.phone)) {
					uni.showToast({
						title: '手机号码不能为空或不正确1',
						icon: 'none'
					})
					return
				}
				_this.getCodeAjax()
			},
			wxLogin() {
				let _this = this;
				// wx登录
				uni.login({
					provider: 'weixin',
					success(res) {
						_this.code = res.code
						_this.submit()
						// console.log(res)
						console.log(res)
					},
					fail(err) {
						uni.showToast({
							title: '微信授权登陆失败',
							icon: 'none'
						})
					}
				})
			},
			submit() {
				let _this = this;
				if (!_this.phone) {
					uni.showToast({
						title: '手机号码不能为空',
						icon: 'none'
					})
					return
				}
				if (!reg.tel_reg.test(_this.phone)) {
					uni.showToast({
						title: '手机号码格式不正确',
						icon: 'none'
					})
					return
				}
				if (!_this.phoneCode) {
					uni.showToast({
						title: '短信验证码不能为空',
						icon: 'none'
					})
					return
				}
				if (_this.loginType === 1) {
					_this.xcxBinding()
				} else {
					_this.codeLogon()
				}
			},
			codeLogon() {
				let _this = this;
				let ipInfo = uni.getStorageSync('IPInfo');
				let data = {
					browser: 'mp-weixin',
					city: ipInfo.city,
					clientType: 4,
					code: _this.phoneCode,
					loginIp: ipInfo.ip,
					mobile: _this.phone,
					os: uni.getStorageSync('systemType'),
					province: ipInfo.pro
				};
				uni.showLoading({
					title: '请稍等'
				})
				_this.$http('/service-user/user/api/user/login/code', 'POST', data)
					.then((res) => {
						if (res.code === 200) {
							uni.setStorageSync('userToken', res.data.token)
							_this.$getUserInfo(() => {
								uni.hideLoading()
								uni[_this.type]({
									url: _this.from
								});
							})
						} else {
							uni.hideLoading()
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
			},
			xcxBinding() {
				let _this = this;
				let data = {
					timestamp: new Date().getTime(),
					uniconId: uni.getStorageSync('wxUniCode'),
					sign: md5.hexMD5( _this.phoneCode + new Date().getTime() + uni.getStorageSync('wxUniCode') +  _this.phone)
				};
				uni.showLoading({
					title: '请稍等'
				})
				_this.$http('/user/api/user/xcx/xcxBinding', 'POST', data)
					.then((res) => {
						if (res.code === 200) {
							uni.setStorageSync('userToken', res.data.token)
							_this.$getUserInfo(() => {
								uni.hideLoading()
								uni[_this.type]({
									url: _this.from
								});
							})
						} else {
							uni.hideLoading()
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
			},
			userTerms() {
				uni.navigateTo({
					url: '/pagesA/terms/userTerms'
				});
			},
			privacyTerms() {
				uni.navigateTo({
					url: '/pagesA/terms/privacyTerms'
				});
			},
			serviceTerms() {
				uni.navigateTo({
					url: '/pagesA/terms/serviceTerms'
				});
			},
			payTerms() {
				uni.navigateTo({
					url: '/pagesA/terms/payTerms'
				});
			},
			del() {
				this.phone = ''
			},
			getCode() {
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 1 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							this.show1 = false;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			},
			getCodeAjax() {
				uni.showLoading({
					title: '请稍等'
				})
				this.$http(`/service-user/user/api/user/send/code`, 'POST', {mobile: this.phone})
					.then((res) => {
						uni.hideLoading()
						if (res.code === 200) {
							uni.showToast({
								title: '短信验证码已发送',
								icon: 'none'
							})
							this.getCode()
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					});
			}
		}
	}
</script>

<style lang='scss' scoped>
	page {
		background: #fff;
	}

	.container {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		padding: 0 50rpx;
	}

	.content {
		margin-top: 90rpx;
	}

	.header {
		margin-top: 80rpx;
		text-align: center;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%
	}

	.btn {
		margin-top: 60rpx;
	}

	.btn button {
		border-radius: 66rpx;
	}

	.btn button[disabled][type=primary] {
		background: #C4C4C4;
	}

	.btn .button-hover {
		background: #002F87;
		opacity: .8;
	}

	.tel,
	.telcodeall {
		padding: 16rpx 0;
		position: relative;
		border-bottom: 1px solid #F3F3F3;
	}

	.telcodeall {
		margin-top: 60rpx;
		position: relative;
	}

	.del {
		position: absolute;
		top: 20rpx;
		right: 30rpx;
	}

	.del:before {
		content: "\e617";
		color: #999999;
		font-size: 32rpx;
	}

	.getUserInfo {
		padding: 0;
		background: none;
		line-height: normal;
		height: 60rpx;
	}

	.getUserInfo:after {
		border: none;

	}

	.verification-code {
		width: 192rpx;
		height: 60rpx;
		background: #F3F3F3;
		border: 1px solid #666666;
		box-sizing: border-box;
		border-radius: 100rpx;
		position: absolute;
		top: 0px;
		right: 0;
		text-align: center;
	}

	.quickLogon {
		font-size: 28rpx;
		line-height: 40rpx;
		text-align: center;
		color: #002F87;
		margin-top: 40rpx;
	}


	.form-item-right button.getUserInfo text {
		cursor: pointer;
		text-align: center;
		font-size: 28rpx;
		color: #333333;
		line-height: 56rpx;
		padding: 10rpx 16rpx;
	}

	.form-item-right {
		color: #333333;
		height: 60rpx;
		line-height: 56rpx;
	}

	.tel-0 {
		position: absolute;
		top: 24rpx;
		left: 30rpx;
		color: #333333;
		font-size: 32rpx;
	}

	.tel .tel-1 {
		padding-left: 100rpx;
		padding-right: 80rpx;
	}

	.telcodeall .tel-1 {
		padding-left: 20rpx;
	}

	.tip {
		width: 100%;
		font-size: 26rpx;
		line-height: 36rpx;
		text-align: center;
		color: #666666;
		position: absolute;
		bottom: 40rpx;
		left: 50%;
		transform: translateX(-50%);
		padding: 0 50rpx;
		white-space:nowrap;
	}

	.xy1 {
		color: #002F87;
	}
</style>
