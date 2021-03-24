<template>
	<view class="rowOneSmall">
		<view class="rowOneSmall1">
			<view class="rowOneSmall-left">
				<u-lazy-load img-mode="widthFix" image="http://imge.hcjk.com/ctr_cloud/hcyy-unv-app/static/Rectangle6.png" loading-img="/static/picloading.jpg" error-img="/static/picloading.jpg"></u-lazy-load>
			</view>
			<view class="rowOneSmall-right">
				<view class="rowOneSmall-right-t show2lines">职业药师专业培训职业药师专业培训职业药师专业培训职业药师专业培训职业药师专业培训</view>
				<view class="rowOneSmall-right-t0">
					<view class="rowOneSmall-right-t0-txt">2021-01-20 14:37</view>
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
	.rowOneSmall{
		.rowOneSmall1{
			position: relative;
			.rowOneSmall-left{
				position: absolute;
				top: 0;
				left: 0;
				width: 208rpx;
				height: 116rpx;
				background-color: #010F44;
				border-radius: 8rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.rowOneSmall-right{
				padding-left: 236rpx;
				line-height: 48rpx;
				.rowOneSmall-right-t{
					font-weight: 600;
					font-size: 28rpx;
					color: #333333;
					line-height: 40rpx;
					height: 80rpx;
				}
				.rowOneSmall-right-t0{
					.rowOneSmall-right-t0-txt{
						font-size: 24rpx;
						color: #666666;
					}
				}
			}
		}
	}
</style>
