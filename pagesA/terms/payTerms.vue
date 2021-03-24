<template>
	<view class="container">
		<view class="top">
			<view class="p">特别提示：您在同意协议前应完整、仔细地阅读本协议，您勾选同意并继续支付将被视为完
				全理解并接受以下全部协议条款。您在六谷大药房小程序上勾选同意本支
				付协议后，即成为本支付协议之授权人，该授权即刻发生效力。您如果不同意以下协议条款，
				请勿勾选同意，且不要进行后续操作。</view>
			<view class="p">支付协议</view>
			<view class="p">一、授权人兹授权湖南六谷大药房连锁有限公司
				（以下简称“乙方，')通过第三方支付平台划扣服务费。</view>
			<view class="p">二、服务费是指授权人通过六谷大药房
				提交的订单上记载的总费用。</view>
			<view class="p">三、在授权人成功提交订单后，乙方依照六谷大药房上公布的收费
				规则计算服务费用。授权人应在30分钟内根据页面指示完成支付。</view>
			<view class="p">四、如因授权人在第三
				方支付平台中的支付账户被锁定、盗用、被往来银行拒绝或账户无效等，以致支付账户付款
				失败时，乙方有权依据与授权人之消费账单要求授权人支付服务费。</view>
			<view class="p">五、授权人如有冒用、
				盗用他人支付账户之行为，须自负法律责任。</view>
			<view class="p">六、在使用六谷大药房服务的过程中，包括但不限
				于注册、点单、支付、收货等，如授权人未遵从相关规则，则乙方有权拒绝为授权人提供相
				关服务，且无需承担任何责任。因授权人的过错导致的任何损失由授权人承担，该等过错包
				括但不限于：不按照交易提示操作，未及时进行交易操作等。</view>
			<view class="p">七、授权人同意其消费产生的
				服务费用以乙方记录的数据为准，乙方通过六谷大药房告知授权人。授权人对服务费用有异议或
				发现扣款金额与应缴费用金额不符时，可及时与 六谷大药房客服联系，客服热线电话：0731-86399621。</view>
			<view class="p foot">本版本发布时间：2020年5月15日</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad(option) {},
		methods: {}
	}
</script>

<style lang='scss'>
	page {
		background: #fff;
	}

	.container {
		position: relative;
		width: 100vw;
		height: 100vh;
		padding: 0 50rpx;
	}

	.top {
		margin-top: 50rpx;
	}

	.p {
		font-size: 28rpx;
		line-height: 48rpx;
		word-break: break-all;
	}

	.foot {
		text-align: right;
		margin-bottom: 20rpx;
	}
</style>
