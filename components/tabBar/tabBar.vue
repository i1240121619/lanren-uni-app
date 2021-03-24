<template>
	<view class="tabbarAll">
		<view class="tabbarAll1">
			<view class="tabbarbj" :style="{backgroundImage:'url(' + tabbg + ')'}"></view>
			<view class="tabbar flex" :class="[identityType ? 'tabbar2' : 'tabbar1']">
				<view class="tabbar-item sy" @click="tabbarChange('index')">
					<view class="tabbar-item-pic background-set animated" :style="{backgroundImage:'url(' + sy + ')'}"
						:class="[currentPageName === 'index' ? 'active bounce':'']"></view>
					<view class="tabbar-item-txt">首页</view>
				</view>
				<view class="tabbar-item qb" @click="tabbarChange('all')">
					<view class="tabbar-item-pic background-set animated" :style="{backgroundImage:'url(' + qb + ')'}"
						:class="[currentPageName === 'all' ? 'active bounce':'']"></view>
					<view class="tabbar-item-txt">全部</view>
				</view>
				<view class="tabbar-item qy" @click="tabbarChange('enterprise')">
					<view class="tabbar-item-pic"></view>
					<view class="tabbar-item-qy animated" :class="[currentPageName === 'enterprise' ? 'active bounce':'']"><image src="/static/qi.gif"/></view>
				</view>
				<view class="tabbar-item xx" @click="tabbarChange('study')">
					<view class="tabbar-item-pic background-set animated" :style="{backgroundImage:'url(' + xx + ')'}"
						:class="[currentPageName === 'study' ? 'active bounce':'']"></view>
					<view class="tabbar-item-txt">学习</view>
				</view>
				<view class="tabbar-item md" @click="tabbarChange('user')">
					<view class="tabbar-item-pic background-set animated" :style="{backgroundImage:'url(' + md + ')'}"
						:class="[currentPageName === 'user' ? 'active bounce':'']"></view>
					<view class="tabbar-item-txt">我的</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// currentPageName: index:首页/all:全部/study:学习/enterprise:企业/user:我的
	// userInfo.company = identityType true:企业/false:个人
	// tabbar1:个人tabar样式/tabbar2:企业taber样式
	export default {
		props: {
			identityType: {
				type: Number
			},
			propsCurrentPageName: {
				type: String
			},
		},
		watch: {
			propsCurrentPageName: {
				handler(newV, oldV) {
					this.currentPageName = newV
					// console.log(newV)
				},
				// deep: true // 需要深度监听
			},
			identityType: {
				handler(newV, oldV) {
					this.tabbg = this.identityType ? require('@/static/tabbg.png') : require('@/static/tabbg21.png')
					// console.log(newV)
				},
				// deep: true // 需要深度监听
			},
		},
		data() {
			return {
				currentPageName: this.propsCurrentPageName, // 当前页面名称ID
				sy: require('@/static/sy.png'),
				qb: require('@/static/qb.png'),
				qy: require('@/static/qy.png'),
				xx: require('@/static/xx.png'),
				md: require('@/static/md.png'),
				tabbg: this.identityType ? require('@/static/tabbg.png') : require('@/static/tabbg21.png'),
			}
		},

		mounted() {},
		methods: {
			tabbarChange(e) {
				this.currentPageName = e
				this.$emit('tabbarChange', this.currentPageName)
			}
		},
	}
</script>
<style lang="scss" scoped>
	.tabbarAll {
		width: 100%;
		height: 100rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 9999;


		.tabbarAll1 {
			height: 100%;
			position: relative;

			.tabbarbj {
				width: 100%;
				height: 200rpx;
				position: absolute;
				top: -20rpx;
				left: 0;
				background-position: center 0;
				background-repeat: no-repeat;
				background-size: 100%;
			}

			.tabbar {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;

				&.tabbar1 {
					.tabbar-item {
						width: 25%;
					}

					.qy {
						display: none;
					}
				}

				&.tabbar2 {

					.tabbar-item {
						width: 20%;
					}

					.qy {
						display: block;
					}
				}

				.tabbar-item {
					height: 100%;
					padding-top: 16rpx;
					text-align: center;

					&.qy {
						position: relative;

						.tabbar-item-qy {
							position: absolute;
							top: -16rpx;
							left: 50%;
							margin-left: -40rpx;
							width: 80rpx;							height: 80rpx;							border-radius: 50%;
							overflow: hidden;
							image{
								width: 100%;
								height: 100%;
							}
							
						}
					}

					.tabbar-item-pic {
						width: 46rpx;
						height: 46rpx;
						margin: 0 auto;
					}

					.tabbar-item-pic.active {
						background-position: center -46rpx;
					}

					.tabbar-item-txt {
						font-size: 24rpx
					}

				}
			}
		}
	}
</style>
