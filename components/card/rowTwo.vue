<template>
	<view class="rowTwo">
		<view class="rowTwo1">
			<view class="rowTwo-up">
				<u-lazy-load img-mode="widthFix" image="http://imge.hcjk.com/ctr_cloud/hcyy-unv-app/static/rowTwo.jpg" loading-img="/static/picloading.jpg" error-img="/static/picloading.jpg"></u-lazy-load>
			</view>
			<view class="rowTwo-dpwn">
				<view class="rowTwo-dpwn-t show2lines">职业药师专业培训职业药师专业培训职业药师专业培训职业药师专业培训职业药师专业培训</view>
				<view class="rowTwo-dpwn-t1">讲师：张三</view>
				<view class="rowTwo-dpwn-t2 flex space-between">
					<view class="rowTwo-dpwn-t2-left flex up-center">
						<view class="rowTwo-dpwn-t2-pic"><image src="@/static/book.png" /></view>
						<view class="rowTwo-dpwn-t2-txt">2000人看过</view>
					</view>
					<view class="rowTwo-dpwn-t2-right">共50讲</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String
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
			.rowTwo-up{
				width: 100%;
				height: 186rpx;
				overflow: hidden;
				background-color: #010F44;
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
