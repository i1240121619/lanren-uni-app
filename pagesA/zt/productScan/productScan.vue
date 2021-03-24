<template>
	<view class="productScan">
		<view class="productScan-1">
			<view class="header-bar"></view>
			<view class="header">
				<view class="header1">
					<image mode="widthFix" src="https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/icon_药店.png?1" />
				</view>
				<view class="header2">
					<view class="header2-1">您的专属药店</view>
					<view class="header2-2">世纪金源大药房世纪金源大药房世纪金源大药房世纪金源大药房世纪金源大药房世纪金源大药房</view>
				</view>
				<view class="header3">
					<image mode="widthFix" src="https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/icon_人物.png" />
				</view>
			</view>
			<view class="box box1">
				<view class="title flex">
					<view class="title1">
						<image mode="widthFix" src="https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/吊灯.png?1" />
					</view>
					<view class="title2 flex all-center">
						<image mode="widthFix"
							src="https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/icon_OTC.png?2" />
						<image mode="widthFix"
							src="https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/icon_医保_44.png?2" />
					</view>
					<view class="title3">
						<image mode="aspectFit" src="https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/吊灯.png?1" />
					</view>
				</view>
				<view class="content">
					<swiper class="swiper" @change="change" :autoplay="true" circular=true :interval="3000"
						:duration="1000">
						<swiper-item class="swiper-item" v-for="(item, index) in bannerList" :key="index">
							<view class="swiper-media flex all-center">
								<image :src="item" mode="aspectFit" />
							</view>
						</swiper-item>
					</swiper>
					<view class="qiehuan">
						<view class="text">小柴胡颗粒小柴胡颗胡颗粒</view>
						<view class="dian flex all-center">
							<view class="dian1 flex all-center">
								<view class="dian1-item" :class="[swiperCurrent === index ? 'active' : '']"
									v-for="(item, index) in bannerList" :key="index"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="box box2">
				<view class="title">
					<image mode="widthFix" src="https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/标题0.png" />
				</view>
				<view class="content">
					<view class="content-t flex left-center">
						<view class="audioPlayerAll">
							<audioPlayer></audioPlayer>
						</view>
					</view>
					<view class="content-c">
						<view class="content-c-item">
							<view class="content-c-item-zs flex up-center">
								<view class="content-c-item-dian"></view>
								<view class="content-c-item-text-t">通用名称</view>
							</view>
							<view class="content-c-item-text-c">小柴胡颗粒小柴胡颗粒小柴胡颗粒小柴胡颗粒</view>
						</view>
						<view class="content-c-item">
							<view class="content-c-item-zs flex up-center">
								<view class="content-c-item-dian"></view>
								<view class="content-c-item-text-t">汉语拼音</view>
							</view>
							<view class="content-c-item-text-c">xiaochaihukeli</view>
						</view>
						<view class="content-c-item">
							<view class="content-c-item-zs flex up-center">
								<view class="content-c-item-dian"></view>
								<view class="content-c-item-text-t">用法用量</view>
							</view>
							<view class="content-c-item-text-c">口服，1天3次，1次1-2袋</view>
						</view>
						<view class="content-c-item">
							<view class="content-c-item-zs flex up-center">
								<view class="content-c-item-dian"></view>
								<view class="content-c-item-text-t">禁忌</view>
							</view>
							<view class="content-c-item-text-c">尚不明确</view>
						</view>

					</view>
				</view>
			</view>
			<view class="box box3">
				<view class="title">
					<image mode="widthFix" src="https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/标题1.png" />
				</view>
				<view class="content">
					<scroll-view class="NavigationBar" :scroll-left="scrollLeft" scroll-x="true">
						<view v-for="(item, index) in menuTabs" :key="index" class="NavigationBarItem"
							@click="swichMenu(index)" :class="[currentIndex === index ? 'active' : '']">
							<view class="NavigationBarItem_txt">{{item.name}}</view>
							<view class="NavigationBarItem_bottom"></view>
						</view>
					</scroll-view>
					<view class="scrollContent1">
						<view class="scrollContent11">
							<view class="scrollContent12" :class="[currentIndex === index ? 'active' : '']"
								v-for="(item, index) in menuTabs" :key="index">
								{{item.describe}}
							</view>
						</view>
					</view>
					<view class="pages flex up-center">
						<view class="pages1">
							第{{currentIndex + 1}}页<text>/总{{menuTabs.length}}页</text>
						</view>
						<view class="pages2">
							<view class="pages2-dian" :style="{marginLeft: (40/menuTabs.length)*currentIndex  + 'px'}">
							</view>
						</view>
					</view>
				</view>
				<view class="btnLeft" @click="btnLeft">
					<image mode="widthFix" src="https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/左箭头.png" />
				</view>
				<view class="btnRight" @click="btnRight">
					<image mode="widthFix" src="https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/右箭头.png" />
				</view>
			</view>
			<view class="dibu">
				<view class="dibu1">
					<image mode="widthFix" src="https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/底部组合.png" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import audioPlayer from '@/components/audioPlayer/audioPlayer';

	export default {
		components: {
			audioPlayer
		},
		data() {
			return {
				id: '', // 商品id
				longitude: '', // 纬度
				latitude: '', // 经度
				
				bannerList: ['https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/商品.png',
					'https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/商品.png',
					'https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/商品.png',
					'https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/商品.png'
				],
				swiperCurrent: 0,

				scrollLeft: 0,
				currentIndex: 0,
				menuTabs: [{
					name: '功效作用',
					describe: '1解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干'

				}, {
					name: '成分',
					describe: '2解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来'
				}, {
					name: '注意事项',
					describe: '3解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来'
				}, {
					name: '不良反应',
					describe: '4解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来'
				}, {
					name: '批准',
					describe: '5解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来'
				}, {
					name: '直播',
					describe: '6解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来'
				}, {
					name: '电视',
					describe: '7解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来'
				}, {
					name: '专题',
					describe: '8解表散热，疏肝和胃。用于外感病邪犯少阳证，症见寒热往来'
				}]
			};
		},
		onLoad(options) {
			this.id = options.id || 1
			let that = this
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.log('纬度:'+res.latitude+', 经度:'+res.longitude)
					that.longitude = res.longitude
					that.latitude = res.latitude
					that.getDetail()
				},
				fail(err) {
					console.log(err)
				}
			});

		},
		onShow() {

		},
		methods: {
			btnLeft() {
				if (this.currentIndex > 0) {
					this.currentIndex--
				}
				this.swichMenu(this.currentIndex)
			},
			btnRight() {
				if (this.currentIndex <= this.menuTabs.length - 2) {
					this.currentIndex++
				} else {
					this.currentIndex = 0
				}
				this.swichMenu(this.currentIndex)
			},
			swichMenu(index) {
				this.currentIndex = index;
				this.scrollLeft = index * 30;
			},
			change(e) {
				this.swiperCurrent = e.detail.current;
			},
			getDetail() {
				uni.showLoading({
					title: '请稍等',
					mask: true,
					duration: 2000
				})
				this.$http(`/o2o/qrcode/${this.id}`, 'GET', {lat: this.latitude, lng: this.longitude}).then((res) => {
					uni.hideLoading()
					if (!res.code) {
						console.log(res)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.productScan {
		min-height: 100vh;
		margin: 0 auto;
		background-image: url(https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/底板1.png);
		background-color: #F5F9FF;
		background-position: center bottom;
		background-repeat: no-repeat;
		background-size: 100% 2.87rem;

		.productScan-1 {
			padding: 0 16px;
			background-image: url(https://imgd.hnhcyy.com/ctr_cloud/liugu/zt/productScan/背景.png);
			background-position: center top;
			background-repeat: no-repeat;
			background-size: 100% 2.87rem;
			margin: 0 auto;
			min-height: 2.87rem;
		}

		.header-bar {
			width: 100%;
			text-align: center;
			height: 0.2rem;
			color: #FFFFFF;
		}

		.header {
			min-height: .67rem;
			background: #FFFFFF;
			border-radius: .20rem;
			position: relative;
			padding-bottom: .10rem;

			.header1 {
				position: absolute;
				left: 0;
				top: .05rem;
				width: .56rem;
				height: .56rem;
				font-size: 0;

				image {
					width: .56rem;
					height: .56rem;
				}
			}

			.header2 {
				margin: 0 .60rem;
				padding-top: .14rem;

				.header2-1 {
					font-size: .12rem;
					line-height: .17rem;
					;
					letter-spacing: .02em;
					color: #888888;
					opacity: 0.8;
				}

				.header2-2 {
					font-weight: 600;
					font-size: .14rem;
					line-height: .20rem;
					letter-spacing: .02em;
					color: #666666;
					margin-top: 0.03rem;
				}
			}

			.header3 {
				position: absolute;
				right: .20rem;
				bottom: .10rem;
				width: .38rem;
				height: .50rem;
				font-size: 0;

				image {
					width: .38rem;
					height: .50rem;
				}
			}
		}

		.box {
			background: rgba(255, 255, 255, 0.92);
			box-shadow: 0px 0px 14px rgba(110, 155, 255, 0.15);
			backdrop-filter: blur(30px);
			border-radius: 20px;
			margin-bottom: 0.16rem;
			padding-bottom: 0.16rem;

			&.box:last-child {
				margin-bottom: 0;
			}

			&.box1 {
				margin-top: .2rem;
				min-height: 3.69rem;
				position: relative;

				.title {
					.title1 {
						margin-top: -.20rem;

						image {
							width: 1.08rem;
							height: 1.42rem;
						}
					}

					.title2 {
						flex: 1;
						height: .25rem;
						font-size: 0;
						margin-top: .34rem;

						image {
							width: .25rem;
							height: .25rem;
							margin: 0 .02rem;
						}
					}

					.title3 {
						margin-top: -.20rem;

						image {
							width: 1.08rem;
							height: 1.42rem;
						}
					}
				}

				.content {
					position: absolute;
					left: 0;
					top: 0.8rem;
					width: 100%;

					.swiper {
						width: 100%;
						height: 2.8rem;

						.swiper-item {
							.swiper-media {
								image {
									width: 1.8rem;
									height: 1.8rem;
								}

								video {
									width: 100%;
									height: 100%;
								}
							}
						}
					}

					.qiehuan {
						width: 100%;
						position: absolute;
						left: 0;
						top: 2rem;
						pointer-events: none;

						.text {
							height: .22rem;
							font-size: .16rem;
							font-weight: 500;
							text-align: center;
							line-height: .22rem;
							color: #444444;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							padding: 0 .2rem;
							margin-top: .08rem;
						}

						.dian {
							margin-top: .1rem;

							.dian1 {
								padding: 0 10px;
								height: 18px;
								background: #F4F8FF;
								border-radius: 10px;
								margin-top: .1rem;

								.dian1-item {
									width: 4px;
									height: 4px;
									background: rgba(75, 131, 255, 0.2);
									border-radius: 50%;
									margin: 0 3px;
								}

								.active {
									background: #437DFF;
								}
							}
						}
					}

				}
			}

			&.box2 {
				.title {
					transform: translate(-.16rem, -.16rem);
					-webkit-transform: translate(-.16rem, -.16rem);
					font-size: 0;

					image {
						width: 3.33rem;
						height: 0.44rem;
					}
				}

				.content {
					.content-t {
						height: 1.01rem;

						.audioPlayerAll {
							width: 3.11rem;
							height: 1.01rem;
						}
					}

					.content-c {
						padding: 0 .16rem;

						.content-c-item {
							padding-bottom: 0.08rem;
							position: relative;

							.content-c-item-zs {
								position: absolute;
								left: 0;
								top: 0;
								width: 0.76rem;

								.content-c-item-dian {
									width: 6px;
									height: 6px;
									border-radius: 50%;
									background: #437DFF;
									margin-right: 0.06rem;
								}

								.content-c-item-text-t {
									width: 0.57rem;
									font-size: 0.14rem;
									color: #BBBBBB;
									line-height: 160%;
									text-align-last: justify;
								}
							}

							.content-c-item-text-c {
								margin-left: 0.8rem;
								font-size: 0.14rem;
								line-height: 160%;
								color: #666666;
							}
						}

					}
				}
			}

			&.box3 {
				position: relative;

				.title {
					transform: translate(-.16rem, -.16rem);
					-webkit-transform: translate(-.16rem, -.16rem);
					font-size: 0;

					image {
						width: 3.33rem;
						height: 0.44rem;
					}
				}

				.content {
					font-size: 0;
					padding: 0 0.16rem;

					.NavigationBar {
						width: 100%;
						display: inline-block;
						white-space: nowrap;
					}

					.NavigationBar .NavigationBarItem {
						display: inline-block;
						white-space: nowrap;
						margin: 0 .10rem;
						position: relative;
						height: .25rem;
					}

					.NavigationBar .NavigationBarItem .NavigationBarItem_txt {
						font-size: .14rem;
						color: #999999;
					}

					.NavigationBar .NavigationBarItem .NavigationBarItem_bottom {
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
						-webkit-transform: translateX(-50%);
						width: 60%;
					}

					.NavigationBar .NavigationBarItem.active .NavigationBarItem_txt {
						color: #437DFF;
					}

					.NavigationBar .NavigationBarItem.active .NavigationBarItem_bottom {
						height: 4px;
						border-radius: 100px;
						background: #437DFF;
					}

					.scrollContent1 {
						width: 100%;
						background: #FAFAFA;
						border-radius: 4px;
						padding: 0.16rem;
						margin-top: 0.2rem;

						.scrollContent11 {
							height: 1.68rem;
							overflow: scroll;

							.scrollContent12 {
								font-size: .14rem;
								line-height: 160%;
								color: #666666;
								display: none;

								&.active {
									display: block;
								}
							}
						}
					}

					.pages {
						justify-content: space-between;
						-webkit-justify-content: space-between;
						margin-top: .16rem;
						margin-bottom: .3rem;

						.pages1 {
							font-size: .12rem;
							line-height: .17rem;
							color: #888888;

							text {
								opacity: 0.6;
								margin-left: 0.04rem;
							}
						}

						.pages2 {
							width: 40px;
							height: 4px;
							background: rgba(43, 106, 244, 0.1);
							border-radius: 100px;

							.pages2-dian {
								width: 6px;
								height: 6px;
								background: #2B6AF4;
								border-radius: 100px;
								margin-top: -1px;
							}
						}
					}
				}

				.btnLeft {
					position: absolute;
					left: 0;
					top: 1.1rem;

					image {
						width: 0.38rem;
						height: 0.55rem;
					}
				}

				.btnRight {
					position: absolute;
					right: 0;
					top: 1.1rem;

					image {
						width: 0.38rem;
						height: 0.55rem;
					}
				}
			}
		}

		.dibu {
			.dibu1 {
				margin-top: -.45rem;
				text-align: center;
			}
		}
	}
</style>
