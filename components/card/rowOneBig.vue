<template>
	<view class="rowOneBig">
		<view class="rowOneBig1">
			<view class="rowOneBig-left">
				<u-lazy-load img-mode="widthFix" border-radius="12" image="http://imge.hcjk.com/ctr_cloud/hcyy-unv-app/static/Rectangle6.png?2" loading-img="/static/picloading.jpg" error-img="/static/picloading.jpg"></u-lazy-load>
			</view>
			<view class="rowOneBig-right">
				<view class="rowOneBig-right-t show2lines">职业药师专业</view>
				<view class="rowOneBig-right-t0">
					<view class="rowOneBig-right-t0-txt">讲师：张三</view>
				</view>
				<view class="rowOneBig-right-t1 flex up-center">
					<view class="rowOneBig-right-t1-pic"><image src="@/static/book.png" /></view>
					<view class="rowOneBig-right-t1-txt">2000人看过</view>
				</view>
				<view class="rowOneBig-right-t2">第12讲/￥10.00</view>
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
	.rowOneBig{
		.rowOneBig1{
			position: relative;
			.rowOneBig-left{
				position: absolute;
				top: 0;
				left: 0;
				width: 280rpx;
				height: 156rpx;
				overflow: hidden;
			}
			.rowOneBig-right{
				padding-left: 310rpx;
				line-height: 48rpx;
				.rowOneBig-right-t{
					font-weight: 600;
					font-size: 32rpx;
					color: #333333;
					line-height: 42rpx;
				}
				.rowOneBig-right-t0{
					font-size: 26rpx;
					color: #333333;
				}
				.rowOneBig-right-t1{
					font-size: 30rpx;
					color: #333333;
					line-height: normal;
					.rowOneBig-right-t1-pic{
						width: 24rpx;
						height: 24rpx;
						font-size: 0;
						margin-right: 10rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.rowOneBig-right-t1-txt{
						font-size: 26rpx;
						color: #333333;
					}
				}
				.rowOneBig-right-t2{
					font-size: 26rpx;
					color: #EF2E14;
				}
			}
		}
	}
</style>
