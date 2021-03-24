<template>
	<view class="rule">
		<h4 class="rule-wrapper">第1条 超级会员权益</h4>
		<p class="rule-content">
			1.1如何成为超级会员：支付88元/积分即可成为超级会员。
		</p>
		<p class="rule-content">
			1.2会员卡积分有效期：会员积分有效期解释权归六谷签约商户所有，具体情况见所绑定商户的积分规则。
		</p>
		<p class="rule-content">
			1.3如何获取积分及积分的发放？
		</p>
		<view class="table">
			<view class="tr">
				<view class="th th1">特权级别</view>
				<view class="th th2">普通会员</view>
				<view class="th th3">超级会员</view>
			</view>
			<view class="tr">
				<view class="td td1">
					<view>消费赚积分</view>
					<view>（门店积分标签区域购买商品）</view>
				</view>
				<view class="td td2 check"></view>
				<view class="td td3 check"></view>
			</view>
			<view class="tr">
				<view class="td td1">
					<view>六谷大药房内商品折扣</view>
				</view>
				<view class="td td2 check"></view>
				<view class="td td3 check"></view>
			</view>
			<view class="tr">
				<view class="td td1">
					<view>更多超级会员权益，持续在增加中，敬请期待。</view>
				</view>
			</view>
		</view>
		<p class="rule-content">
			您成为六谷超级会员后，可享受的超级会员权益以六谷平台公布的信息为准。为更好地向会员提供服务，六谷有权基于自身业务发展需要调整全部或部分会员权益。权益调整将在相应服务页面进行通知或公告，您可以通过进入平台查询最新的会员权益内容。
		</p>
		<p class="rule-content">
			1.4超级会员有效期：自开卡日起，有效时间周期为365天，到期请续费。
		</p>
		<view class="rule-r"></view>
		<h4 class="rule-wrapper">第2条 特别申明</h4>
		<p class="rule-content">
			2.1在获取和使用积分过程中，如果出现违规行为（如作弊领取），六谷将取消您获得积分的资格，并有权收回所得积分，必要时将追究法律责任。
		</p>
		<p class="rule-content">
			2.2积分不能兑现，不可转让。
		</p>
		<p class="rule-content">
			2.3会员开通后，您在已开通服务期内主动取消或终止服务的，相关费用不予退还。
		</p>
		<p class="rule-content">
			2.4积分规则最终解释权归六谷所有。
		</p>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.rule {
		width: 100%;
		height: 100%;
		padding: 20rpx;

		.rule-icon {
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-size: 18px;
			color: #333333;
			padding: 40upx 0;
		}

		.rule-title {
			width: 100%;
			text-align: center;
		}

		.rule-wrapper {
			font-size: 24upx;
			font-weight: bold;
			color: #333333;
			line-height: 60rpx;
		}

		.rule-content {
			font-size: 12px;
			font-weight: 500;
			color: rgba(102, 102, 102, 1);
			line-height: 20px;
			margin-top: 10rpx;
		}

		.rule-r {
			height: 24upx;

		}

		.part {
			width: 90rpx;
			height: 90rpx;
			background: url('https://imgd.hnhcyy.com/ctr_cloud/liugu/images/icon_part1%402x.png') no-repeat 4px 5px;
			background-size: 90rpx 90rpx;
			position: relative;
			left: -47rpx;
			top: -22rpx;

			.part-1 {
				width: 39px;
				height: 39px;
				font-size: 12px;
				font-family: PingFang-SC-Medium, PingFang-SC;
				font-weight: 500;
				color: rgba(113, 59, 14, 1);
				line-height: 17px;
				transform: rotate(-45deg);
				margin-left: 9rpx;
				padding-top: 22rpx;
			}
		}

		.rule-12 {
			padding: 0 32rpx;
			background: #FFFFFF;

			.max-font {
				font-size: 28upx;
				color: #713B0E;
				text-align: center;
				margin-top: -30rpx;
			}

			.more {
				height: 48rpx;
				text-align: center;
				color: #713B0E;
				font-size: 24upx;
				position: relative;

				.alit {
					display: inline-block;
					width: 14rpx;
					height: 14rpx;
					border-top: 1px solid #c3c8d6;
					border-right: 1px solid #c3c8d6;
					transform: rotate(135deg);
					position: absolute;
					top: 6rpx;
					left: 430rpx;
				}

			}

			.top {
				height: 48rpx;
				text-align: center;
				color: #713B0E;
				font-size: 24upx;
				position: relative;

				.alit {
					display: inline-block;
					width: 20px;
					height: 20px;
					border-top: 1px solid #c3c8d6;
					border-right: 1px solid #c3c8d6;
					transform: rotate(-45deg);
					margin-right: 30px;
					margin-top: 6px;
				}
			}

			.row {
				display: flex;
				flex-direction: row;

				.hath {
					padding: 20upx 0;
					width: 25%;
					text-align: center;

					.font {
						font-size: 24upx;
						color: #713B0E;
					}
				}

				.hath-serve-1 {
					display: flex;
					flex-direction: row;
					justify-content: center;

					.pic {
						width: 48upx;
						height: 48upx;
					}

				}
			}
		}

		.check::after {
			display: inline-block;
			content: " ";
			height: 24rpx;
			width: 11rpx;
			border-width: 0 2rpx 2rpx 0;
			border-color: #333333;
			border-style: solid;
			transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
			transform-origin: center;
			transition: transform .3s;
			color: #333333;
		}
	}

	.table {
		border: 1px solid #E4E4E4;
		border-right: 0;
		border-bottom: 0;
		width: 100%;
	}

	.tr {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.th,
	.td {
		padding: 15px 8px;
		border-bottom: 1px solid #E4E4E4;
		border-right: 1px solid #E4E4E4;
		text-align: center;
		width: 100%;
	}

	.th3,
	.th2,
	.td3,
	.td2 {
		width: 37%;
	}

	.th {
		font-size: 28rpx;
		font-family: PingFang-SC-Medium, PingFang-SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		background: rgba(246, 246, 246, 1);
	}

	.td {
		font-size: 28rpx;
		color: #333333;
		background: rgba(255, 255, 255, 1);
	}
</style>
