<script>
	export default {
		globalData: {
			statusBarHeight: 20 //状态栏高度
		},
		onLaunch: function() {
			// #ifdef APP-PLUS
			// 锁定横屏  
			// plus.screen.lockOrientation("landscape-primary");  
			// 锁定竖屏  
			plus.screen.lockOrientation("portrait-primary"); 
			// this.$wordbook((res) => {
			// 	if (res.every((e) => e === 1)) {
			// 		this.$isResolve()
			// 	} else {
			// 		this.$message.error('数据初始化失败')
			// 	}
			// })
			// #endif
			this.$http('https://gateway.doityun.com/ip/info', 'GET').then((res) => {
				if (res.code === 200) {
					uni.setStorageSync('IPInfo', res.data)
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})
			// #ifdef MP-WEIXIN
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function(res2) {
						uni.showModal({
							title: '更新提示',
							content: '发现新版本，是否重启应用?',
							success(res2) {
								if (res2.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});
				}
			});

			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
				uni.showModal({
					title: '提示',
					content: '检查到有新版本，但下载失败，请检查网络设置',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
			// #endif
		},
		onShow: function() {
			this.$http('/system/api/website/get', 'POST', {
				platShow: 2
			}).then((result) => {
				if (result.code === 200) {
					uni.setStorageSync('website', result.data)
					// #ifdef MP-WEIXIN
					uni.getSystemInfo({
						success: res => {
							let system = res.system.toUpperCase(); // console.log(system)
							if (system.includes('IOS')) {
								uni.setStorageSync('systemType', 'IOS');
							} else {
								uni.setStorageSync('systemType', 'Android');
							}
						}
					});
					// #endif
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods: {}
	}
</script>
<style lang='scss'>
	@import 'styles/animate.css';
	@import 'styles/index.scss';
	@import "uview-ui/index.scss";
</style>