<template>
	<view class="list">
		<view class="item" @click="toDetails(item)" v-for="(item, index) in list" :key="index">
			<image :src="item.courseLogo" mode="aspectFill" class="logo"></image>
			<Mark v-if="markList[index]" class="Mark" :act-list="markList[index].actZoneCourseUserViewDTO"></Mark>
			<view class="text">
				<view class="title" v-html="item.courseName"></view>
				<view class="people">{{ item.countStudy }}人</view>
				<view class="price">
					<view v-if="showPrice">
						<text v-if="item.courseOriginal">￥{{ item.courseOriginal }}元</text>
						<text v-else class="free c_green">
							免费
						</text>
						<text class="c_gold" v-if="item.courseDiscount">
							SVIP：￥{{ item.courseDiscount }}元
						</text>
					</view>
					&nbsp;
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCourseListMark
	} from "../../api/activity";
	import Mark from "../activity/Mark.vue"
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		watch: {
			list(val) {
				this.getMarks();
			}
		},
		data() {
			return {
				showPrice: false,
				markList: []
			};
		},
		mounted() {
			this.setData({
				showPrice: uni.getStorageSync('showPrice')
			});
			this.getMarks();
		},
		components: {
			Mark
		},
		methods: {
			toDetails(item) {
				uni.navigateTo({
					url: '/pages/resource/details?id=' + item.id
				});
			},
			getMarks() {
				if (this.list && this.list.length) {
					const idList = []
					this.list.map(item => {
						idList.push(item.courseId || item.id)
					})
					getCourseListMark({
						courseIds: idList
					}).then(res => {
						console.log(res.courseIdList)
						this.markList = res.courseIdList
					})
				}
			}
		}
	};
</script>


<style lang="scss" scoped>
	.list {
		padding: 36upx 36upx 2upx;
		background-color: #fff;

		.item {
			margin-bottom: 36upx;
			padding-left: 266upx;
			min-height: 136upx;
			position: relative;
			
			.Mark {
				position: absolute;
				left: 0;
				width: 140px;
				top: 0;
			}

			.logo {
				position: absolute;
				left: 0;
				top: 0;
				width: 242upx;
				height: 136upx !important;
				display: block;
				border-radius: 16upx;
				margin-right: 24upx;
			}

			.text {
				width: 100%;

				.title {
					font-weight: 600;
					font-size: 32upx;
					line-height: 50upx;
					color: #333333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.people {
					font-size: 24upx;
					line-height: 46upx;
					color: #999999;
				}

				.price {
					font-size: 24upx;
					line-height: 40upx;
					color: #EB5757;

					.c_gold {
						font-size: 22upx;
						margin-left: 20upx;
					}

					.free {}
				}
			}
		}
	}
</style>
