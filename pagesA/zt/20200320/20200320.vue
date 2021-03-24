<template>
	<view class="product">
		<view class="productimage">
			<image mode="widthFix" style="width: 100%; z-index: 10;" src="https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/01@2x.jpg" />
			<view class="compose-wrapper">
				<view class="compose-wrapper-1" v-for="(item, index) in data1" :key="index" @click="goproduct(item)" :style="{'background-image': 'url(' + item.url + ')'}">
					<view class="compose-wrapper-1-1" @click.stop="buy(item)">立即购买</view>
				</view>
			</view>
			<view class="compose-wrapper1">
				<view class="compose-wrapper1-content"></view>
				<view class="compose-wrapper1-1" v-for="(item, index) in data2" :key="index" @click="goproduct(item)" :style="{'background-image': 'url(' + item.url + ')'}">
					<view class="compose-wrapper1-1-1" @click.stop="buy(item)">立即购买</view>
				</view>
			</view>
			<view class="compose-wrapper2">
				<view class="compose-wrapper2-content"></view>
				<view class="compose-wrapper2-1">
					<view class="compose-wrapper2-1-1" v-for="(item, index) in data3" :key="index" @click="goproduct(item)" :style="{'background-image': 'url(' + item.url + ')'}">
						<view class="compose-wrapper2-1-1-1" @click.stop="goshop(item)">加入购物车</view>
					</view>
				</view>
			</view>
			<view class="compose-wrapper3">
				<view class="compose-wrapper3-content"></view>
				<view class="compose-wrapper3-1">
					<view class="compose-wrapper3-1-1" v-for="(item, index) in data4" :key="index" @click="goproduct(item)" :style="{'background-image': 'url(' + item.url + ')'}">
						<view class="compose-wrapper3-1-1-1" @click.stop="goshop(item)">加入购物车</view>
					</view>
				</view>
			</view>
			<view class="compose-wrapper4">
				<view class="compose-wrapper4-content"></view>
				<view class="compose-wrapper4-1">
					<view class="compose-wrapper4-1-1" v-for="(item, index) in data5" :key="index" @click="goproduct(item)" :style="{'background-image': 'url(' + item.url + ')'}">
						<view class="compose-wrapper4-1-1-1" @click.stop="goshop(item)">加入购物车</view>
					</view>
				</view>
			</view>
			<view class="compose-wrapper5">
				<image mode="widthFix" style="width: 100%;" src="https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/bottom.png" />
			</view>
		</view>
		<!-- 购物车右边浮动按钮 -->
		<view class="shop-car" @click="cartbtn">
			<view class="shopBag" v-if="shopNuiber">
				{{shopNuiber}}
			</view>
			<image src="https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200302/icon_%E6%82%AC%E6%B5%AE%E8%B4%AD%E7%89%A9%E8%BD%A6.png"
			 class="shopBat" mode="scaleToFill"></image>
			<!-- <text style="margin-left:12upx">购物车</text> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '早春焕新 特惠集市',
				link: '',
				code: '', // 1:超级会员/22:内部会员/21:普通会员
				shopNuiber: '',
				data1: [{
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0301@2x.png',
					goodsId: 115,
					id: 99,
					type: 1, // 如也: "0.非活动.1.组合商品，2.特价专区，3.超卡特价专区，4.家庭防护专区(满58-10)，5.零食专区（满58-20）")
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0302@2x.png',
					goodsId: 116,
					id: 100,
					type: 1,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0303@2x.png',
					goodsId: 117,
					id: 101,
					type: 1,
				}],
				data2: [{
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0701@2x.png',
					goodsId: 94,
					id: 88,
					type: 3,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0702@2x.png',
					goodsId: 56,
					id: 57,
					type: 3,
				}],
				data3: [{
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0601@2x.png',
					goodsId: 55,
					id: 56,
					type: 2,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0602@2x.png',
					goodsId: 46,
					id: 48,
					type: 2,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0603@2x.png',
					goodsId: 60,
					id: 60,
					type: 2,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0604@2x.png',
					goodsId: 75,
					id: 71,
					type: 2,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0605@2x.png',
					goodsId: 95,
					id: 89,
					type: 2,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0606@2x.png',
					goodsId: 105,
					id: 92,
					type: 2,
				}],
				data4: [{
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0401@2x.png',
					goodsId: 84,
					id: 78,
					type: 4,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0402@2x.png',
					goodsId: 106,
					id: 93,
					type: 4,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0403@2x.png',
					goodsId: 96,
					id: 90,
					type: 4,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0404@2x.png',
					goodsId: 111,
					id: 95,
					type: 4,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0405@2x.png',
					goodsId: 107,
					id: 94,
					type: 4,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0406@2x.png',
					goodsId: 112,
					id: 96,
					type: 4,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0407@2x.png',
					goodsId: 113,
					id: 97,
					type: 4,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0408@2x.png',
					goodsId: 114,
					id: 98,
					type: 4,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0409@2x.png',
					goodsId: 97,
					id: 91,
					type: 4,
				}],
				data5: [{
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0501@2x.png',
					goodsId: 90,
					id: 84,
					type: 5,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0502@2x.png',
					goodsId: 89,
					id: 83,
					type: 5,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0503@2x.png',
					goodsId: 88,
					id: 82,
					type: 5,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0504@2x.png',
					goodsId: 86,
					id: 80,
					type: 5,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0505@2x.png',
					goodsId: 87,
					id: 81,
					type: 5,
				}, {
					url: 'https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/0506@2x.png',
					goodsId: 85,
					id: 79,
					type: 5,
				}]
			};
		},
		onLoad(options) {
			uni.setStorageSync('userInfo', JSON.parse(this.$Base64.decode(options.userInfo)))
			uni.setStorageSync('storeInfo', JSON.parse(this.$Base64.decode(options.storeInfo)))
			uni.setStorageSync('access_token', options.access_token)
			this.link = this.$Base64.decode(options.link)
			uni.setNavigationBarTitle({
				title: this.title
			})
			wuni.postMessage({
				data: {
					title: this.title
				}
			});
			this.$nextTick(() => {
				this.init()
			})
			if (uni.getStorageSync('access_token')) {
				setInterval(() => {
					this.getDataShop()
				}, 1500);
			}
		},
		methods: {
			init() {
				this.code = uni.getStorageSync('userInfo') && uni.getStorageSync('userInfo').po.code
			},
			// 点击立即购买
			buy(item) {
				if (!this.$checkLogin(this.$Base64.encodeURI('/pagesA/webview/webview?link=' + this.$Base64.encodeURI(this.link)),
						'reLaunch'))
					return
				let data = this.$Base64.encodeURI(JSON.stringify({
					from: 'wxxcx',
					// cartId: goodsData,
					payType: 1, // 0: 积分支付/1：钱支付
					fromPage: 1,
					specificationId: item.id,
					id: item.goodsId
				}))
				let prame = {
					id: item.goodsId,
					specificationId: item.id,
					shopId: uni.getStorageSync('storeInfo').shopId,
					type: false
				}
				uni.showLoading({
					title: '请稍等',
					mask: true,
					duration: 2000
				});
				this.$http('/mall/front/mallCart/checkLimitNum', 'POST', prame).then((res) => {
					if (!res.code) { // 成功
						this.$checkActivity(item.type, this.code, () => {
							uni.hideLoading()
							wuni.navigateTo({
								url: `/pagesA/order/confirmOrder?data=${data}`
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
			// 进入详情
			goproduct(item) {
				wuni.navigateTo({
					url: '/pagesA/product/product?id=' + item.goodsId
				});
			},
			// 点击购物车
			cartbtn() {
				if (!this.$checkLogin(this.$Base64.encodeURI('/pagesA/webview/webview?link=' + this.$Base64.encodeURI(this.link)),
						'reLaunch')) return
				wuni.switchTab({
					url: '/pages/cart/cart'
				});
			},
			// 获取购物车数量
			getDataShop() {
				if (!this.$checkLogin(this.$Base64.encodeURI('/pagesA/search/search'), 'reLaunch')) return
				this.$http('/mall/front/mallCart/number/' + uni.getStorageSync('userInfo').pickUpShopId, 'GET').then((res) => {
					if (!res.code) {
						if (res.data) {
							this.shopNuiber = res.data
						}
					} else {
						uni.showToast({
							title: '获取购物车数量失败',
							icon: 'none'
						})
					}
				})

			},
			// 加入购物车
			goshop(datass) {
				if (!this.$checkLogin(this.$Base64.encodeURI('/pagesA/webview/webview?link=' + this.$Base64.encodeURI(this.link)),
						'reLaunch')) return
				let _this = this
				let data = {
					"goodsId": datass.goodsId,
					"number": 1,
					"shopId": uni.getStorageSync('storeInfo').shopId,
					"specificationId": datass.id
				}
				// console.log(_this.fromdata.priceList) 
				_this.$http(`/mall/front/mallCart/addCart`, 'POST', data).then((res) => {
					if (res.code === 0) {
						uni.showToast({
							title: '加入购物车成功',
							icon: 'none'
						})
						setTimeout(() => {
							_this.getDataShop()
						}, 1500);
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2500
						})
					}
				})
			}
		},

	}
</script>

<style lang='scss'>
	.product {
		background: #85C4B1;
	}

	.compose-wrapper {
		width: 100%;
		height: 1170upx;
		background-image: url("https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/03@2x.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;

		.compose-wrapper-1 {
			position: relative;
			margin: auto;
			width: 736upx;
			height: 384upx;
			background-size: 100% 100%;
			background-repeat: no-repeat;

			.compose-wrapper-1-1 {
				position: absolute;
				right: 48upx;
				bottom: 36upx;
				width: 122upx;
				height: 41upx;
				font-size: 20upx;
				line-height: 41upx;
				text-align: center;
				color: #FFF;
				border-radius: 18upx;
				background: #FE8427;
			}
		}
	}

	.compose-wrapper1 {
		width: 100%;
		height: 626upx;
		background-image: url("https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/07@2x.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;

		.compose-wrapper1-content {
			width: 100%;
			height: 150upx;
		}

		.compose-wrapper1-1 {
			position: relative;
			margin: auto;
			width: 94%;
			height: 236upx;
			background-size: 100% 100%;
			background-repeat: no-repeat;

			.compose-wrapper1-1-1 {
				position: absolute;
				right: 32upx;
				bottom: 26upx;
				width: 122upx;
				height: 41upx;
				font-size: 20upx;
				line-height: 41upx;
				text-align: center;
				color: #FFF;
				border-radius: 18upx;
				background: #FE8427;
			}
		}
	}

	.compose-wrapper2 {
		width: 100%;
		height: 928upx;
		background-image: url("https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/06@2x.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;

		.compose-wrapper2-content {
			width: 100%;
			height: 110upx;
		}

		.compose-wrapper2-1 {
			margin: 20upx auto 0 auto;
			width: 90%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.compose-wrapper2-1-1 {
				overflow: hidden;
				position: relative;
				margin-top: 10upx;
				width: 214upx;
				height: 378upx;
				background-size: 100% 100%;
				background-repeat: no-repeat;

				.compose-wrapper2-1-1-1 {
					position: absolute;
					right: 18upx;
					bottom: 10upx;
					width: 180upx;
					height: 42upx;
					font-size: 20upx;
					line-height: 42upx;
					text-align: center;
					color: #FFF;
					border-radius: 22upx;
					background: #FE8427;
				}
			}
		}
	}

	.compose-wrapper3 {
		width: 100%;
		height: 1258upx;
		background-image: url("https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/04@2x.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;

		.compose-wrapper3-content {
			width: 100%;
			height: 110upx;
		}

		.compose-wrapper3-1 {
			margin: 100upx auto 0 auto;
			width: 90%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.compose-wrapper3-1-1 {
				position: relative;
				margin-top: 10upx;
				width: 214upx;
				height: 328upx;
				background-size: 100% 100%;
				background-repeat: no-repeat;

				.compose-wrapper3-1-1-1 {
					position: absolute;
					right: 8upx;
					bottom: 10upx;
					width: 120upx;
					height: 42upx;
					font-size: 20upx;
					line-height: 42upx;
					text-align: center;
					color: #FFF;
					border-radius: 22upx;
					background: #66A5DB;
				}
			}
		}
	}

	.compose-wrapper4 {
		width: 100%;
		height: 930upx;
		background-image: url("https://imgd.hnhcyy.com/ctr_cloud/shs/zt/20200320/05@2x.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;

		.compose-wrapper4-content {
			width: 100%;
			height: 110upx;
		}

		.compose-wrapper4-1 {
			margin: 80upx auto 0 auto;
			width: 90%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.compose-wrapper4-1-1 {
				position: relative;
				margin-top: 10upx;
				width: 214upx;
				height: 332upx;
				background-size: 100% 100%;
				background-repeat: no-repeat;

				.compose-wrapper4-1-1-1 {
					position: absolute;
					right: 18upx;
					bottom: 10upx;
					width: 180upx;
					height: 42upx;
					font-size: 20upx;
					line-height: 42upx;
					text-align: center;
					color: #FFF;
					border-radius: 22upx;
					background: #AAD391;
				}
			}
		}
	}

	.productimage {
		font-size: 0;
		background: #85C4B1;
	}

	.bottom {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}

	.text {
		font-size: 0;
	}

	.shop-car {
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-size: 24rpx;
		color: red;
		position: fixed;
		right: 10rpx;
		bottom: 186rpx;
		border-radius: 50%;
		box-shadow: 9px 3px 9px 1px rgba(41, 96, 138, 0.29);
		z-index: 9999;

		.shopBag {
			position: absolute;
			top: 12px;
			right: 10px;
			box-sizing: border-box;
			min-width: 22px;
			padding: 0px 2px;
			color: #fff;
			font-weight: 450;
			font-size: 12px;
			font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
			line-height: 20px;
			height: 22px;
			text-align: center;
			background-color: #EA424D;
			border: 1px solid #fff;
			border-radius: 11px;
			-webkit-transform: translate(50%, -50%);
			transform: translate(50%, -50%);
			-webkit-transform-origin: 100%;
			transform-origin: 100%;
			z-index: 2
		}

		.shopBat {
			width: 96rpx;
			height: 96rpx;
		}

	}
</style>
