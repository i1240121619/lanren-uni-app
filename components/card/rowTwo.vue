<template>
	<view class="rowTwo">
		<view class="rowTwo1">
			<view class="rowTwo-up">
				<u-lazy-load img-mode="widthFix" border-radius="12rpx 12rpx 0 0" :image="item.courseLogo" loading-img="/static/picloading.jpg" error-img="/static/picloading.jpg"></u-lazy-load>
			</view>
			<view class="rowTwo-dpwn">
				<view class="rowTwo-dpwn-t show2lines">{{item.courseName}}</view>
				<view class="rowTwo-dpwn-t1">讲师：{{item.lecturerName}}</view>
				<view class="rowTwo-dpwn-t2 flex space-between">
					<view class="rowTwo-dpwn-t2-left flex up-center">
						<view class="rowTwo-dpwn-t2-pic"><image src="@/static/book.png" /></view>
						<view class="rowTwo-dpwn-t2-txt">{{item.countStudy}}人看过</view>
					</view>
					<view class="rowTwo-dpwn-t2-right">共{{item.periodTotal}}讲</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: [Object]
			}
		},
		watch: {
			item(val) {
			}
		},
		data() {
			return {
				
			}
		},
		mounted() {

		},
		methods: {
			
		}
	}
</script>

<style lang='scss' scoped>
	.rowTwo{
		width: 100%;
		.rowTwo1{
			width: 100%;
			background: #FAFAFA;
			border-radius: 12rpx;
			height: 404rpx;
			overflow: hidden;
			.rowTwo-up{
				width: 100%;
				height: 184rpx;
				overflow: hidden;
			}
			.rowTwo-dpwn{
				padding: 20rpx 12rpx;
				line-height: 52rpx;
				.rowTwo-dpwn-t{
					font-size: 28rpx;
					color: #333333;
					font-weight: 600;
					line-height: 40rpx;
					height: 80rpx;
				}
				.rowTwo-dpwn-t1{
					font-size: 24rpx;
					color: #333333;
				}
				.rowTwo-dpwn-t2{
					.rowTwo-dpwn-t2-left{
						line-height: normal;
						.rowTwo-dpwn-t2-pic{
							width: 24rpx;
							height: 24rpx;
							font-size: 0;
							margin-right: 10rpx;
							image{
								width: 100%;
								height: 100%;
							}
						}
						.rowTwo-dpwn-t2-txt{
							font-size: 24rpx;
							color: #666666;
						}
					}
					.rowTwo-dpwn-t2-right{
						font-size: 24rpx;
						color: #666666;
					}
				}
			}
		}
	}
</style>
