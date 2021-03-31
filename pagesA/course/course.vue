<template>
	<!--pages/course/view/view.wxml-->
	<view class="detail_page b_fff">
		<view class="img_box" ref="playerbox" v-if="!videoSrc && !h5Video">
			<image class="course_img" :src="courseInfo.courseLogo"></image>
		</view>
		<!--  #ifdef  H5 -->
		<view v-show="h5Video" id="player"></view>
		<!--  #endif -->

		<video v-if="videoSrc" id="polyvVideo" class="img_box" :poster="courseInfo.courseImg" :src="videoSrc" @ended="nextVideo"
		 @play="isPlay" @pause="pausevideo" @timeupdate="videoTimeUpdate" enable-danmu="true">
			<cover-view class="beisu-box" v-if="playstatu">
				<cover-view class="clearfix">
					<button class="beisu-btn" @tap="showbei">倍速{{bei == 1.0 ? "" : bei + "X"}}</button>
				</cover-view>
				<cover-view class="bei_list" v-if="showjs">
					<button :class="'btn ' + (bei == 0.8 ? 'on' : '')" @tap="jiasu" data-b="0.8">0.8X</button>
					<button :class="'btn ' + (bei == 1.0 ? 'on' : '')" @tap="jiasu" data-b="1.0">1.0X</button>
					<button :class="'btn ' + (bei == 1.25 ? 'on' : '')" @tap="jiasu" data-b="1.25">1.25X</button>
					<button :class="'btn ' + (bei == 1.5 ? 'on' : '')" @tap="jiasu" data-b="1.5">1.5X</button>
				</cover-view>
			</cover-view>
		</video>
		<view class="course_msg b_fff">
			<view class="flex_row_between">
				<like-btn :collectionId="courseInfo.id" :isCollection="courseInfo.isCollectionCourse" :courseCategory="courseInfo.courseCategory"></like-btn>
				<text class="course_title font33 c_333">{{courseInfo.courseName || '正在加载...'}}</text>
				<button class="share-btn" open-type="share">分享</button>
			</view>
			<view class="mgt20" v-if="showPrice">
				<view class="font41 c_red" v-if="!courseInfo.isFree">
					<text class="font25">￥</text>{{courseInfo.courseOriginal || '加载中...'}}
					<text class="font25 c_gold mgl20">{{courseInfo.courseDiscount ? '￥' + courseInfo.courseDiscount : '免费'}}</text>
					<view @click="goVip" style="display: inline-block;" class="font25 mgl10 c_fff vip_price">SVIP</view>
				</view>
				<view class="font41 c_red" v-else>免费<view style="display: inline-block;" @click="goVip" class="font25 mgl10 c_fff vip_price">超级会员更多优惠</view>
				</view>
			</view>
		</view>
		<view class="h5px" v-if="courseInfo.id"></view>
		<activity-panel v-if="courseInfo.id" @startSeckill="startSeckill" :courseInfo="courseInfo"></activity-panel>
		<view class="h5px"></view>
		<view class="teacher_box b_fff c_999 font25">
			<text>讲师：</text>
			<text class="c_333">{{courseInfo.lecturer.lecturerName}}</text>
			<attention-btn :isAttention="courseInfo.isAttentionLecturer" :lecturerUserNo="courseInfo.lecturerUserNo"></attention-btn>
		</view>

		<view class="h5px"></view>
		<view class="course_tabs b_fff">
			<view class="tabs font33 c_333">
				<view v-if="isMinappAudit " :class="tab == 2 ? 'tab active' : 'tab'" @tap="changeTab" data-int="2">课程大纲</view>
				<view :class="tab == 1 ? 'tab active' : 'tab'" @tap="changeTab" data-int="1">课程介绍</view>
			</view>
			<view v-if="tab == 2 && isMinappAudit " class="course_brief font25 b_fff mgt30 pdb30">
				<!-- <view class="h94 p_relative pdl20">
        <text class="col"></text>
        <text class="font_b pdl20">点播课程大纲</text>
      </view> -->
				<view v-for="(item, index) in chapterList" :key="index" class="c_333">
					<view class="chapter_title pdl30">{{item.chapterName}}</view>
					<view v-for="(item, index2) in item.periodList" :key="index2" class="pdl30 pdr40 h60 o_hide" @tap="selectVideo(item)"
					 :data-vInfo="item">
						<image v-if="item.videoVid" src="../../../static/images/no_play.svg" class="play_img"></image>
						<image v-else src="../../../static/images/no_vid.svg" class="play_img no_play"></image>
						<text v-if="item.isFree" class="c_blue">(免费)</text>
						<text class="c_999" v-if="!item.videoVid || !item.videoLength">(未更新)</text>
						<text>{{item.periodName}}</text>
						<text  @tap.stop="toExam(item)"  v-if="item.examId" class="examBtn">练习</text>
					</view>
				</view>
				<view class="text_center c_333 font33" v-if="loaddingEnd">加载中...</view>
			</view>
			<view v-else class="course_brief font25 b_fff pd20">
				<rich-text :nodes="courseInfo.introduce"></rich-text>
			</view>
		</view>
		<!-- <float-tab :shareImg="true" coursetype="1" @hidevideo="changeVideoBox" @hideewm="changeVideoBox"></float-tab> -->
		<view v-if="!isFree && showPrice" class="buy_panel">
			<view v-if="!courseInfo.isPutaway" class="buy_btn disabled">课程已下架</view>
			<view v-else @tap="buyCourse" :class="['buy_btn', isSeckill?'seckillBtn':'']"> {{ isSeckill?'立即秒杀':'立即购买' }}</view>
		</view>
		<view v-if="(isFree || courseInfo.isPay == 1) && courseInfo.examId " class="buy_panel">
			<view @tap="toExam(courseInfo)" class="buy_btn">立即考试</view>
		</view>
	</view>
</template>

<script>
	// pages/course/view/view.js
	import * as apis from "@/api/course";
	import * as auth from "@/api/user";
	import * as examApis from "@/api/exam";
	import {
		login,
		hideLogin
	} from "@/utils/auth";
	import polyv from "@/utils/polyv";
	import likeBtn from "@/components/likebtn/likebtn";
	import attentionBtn from "@/components/attentionBtn/attentionBtn";

	import ActivityPanel from "@/components/activity/ActivityPanel";
	export default {
		data() {
			return {
				faceContrast: 0, // 活体认证次数
				constrastTimes: null, // 认证时间点
				videoPeriodId: '', // 正在播放课时ID
				playstatu: false, // 开始播放
				playInfo: {
					currentTime: 0, // 当前播放时间
					duration: 0 // 播放总时长
				}, // 播放信息
				showPrice: uni.getStorageSync('showPrice'),
				isFree: true,
				videoSrc: '',
				study: '',
				isSeckill: false,
				isMinappAudit: uni.getStorageSync('isMinappAudit'),
				tab: 2,
				bei: 1.0,
				showjs: false,
				courseInfo: {
					isPutaway: true,
					lecturer: {}
				},
				//课程基本信息
				hideVideo: false,
				h5Video: false,
				player: undefined,
				chapterList: [],
				//活动信息
				loaddingEnd: false,
				//章节加载完毕
				pageSize: 20,
				totalPage: 0,
				pageCurrent: 1,
				userInfo: "",
				courseId: ""
			};
		},

		components: {
			likeBtn,
			attentionBtn,
			// floatTab,
			ActivityPanel
		},
		onShareAppMessage: function(res) {
			const userInfo = uni.getStorageSync('userInfo');
			let url = 'pages/course/view/view?id=' + this.courseId;

			if (userInfo &&  userInfo.referralCode) {
				url += '&referralCode=' + userInfo.referralCode;
			}

			return {
				path: url
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let courseId = '';
			if (options.scene) {
				courseId = decodeURIComponent(options.scene);
			} else {
				courseId = options.id;
			}
			if (!this.isMinappAudit) {
				this.tab = 1;
			}
			this.setData({
				courseId: courseId
			});
			if (uni.getStorageSync('userInfo')) {
				this.setData({
					userInfo: uni.getStorageSync('userInfo')
				});
				this.getUserCourse(courseId);
			} else {
				this.getCourse(courseId);
			}
			this.getChapterList(1);
			// #ifdef  H5
			window.s2j_onVideoPlay = () => {
				this.setData({
					playstatu: true
				})
				this.getPlayTime()
			}
			window.s2j_onPlayOver = (res) => {
				this.setData({
					playstatu: false
				})
				this.getPlayTime()
			}
			window.s2j_onVideoPause = () => {
				this.setData({
					playstatu: false
				})
				this.getPlayTime()
			}
			// #endif
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			// #ifdef MP_WEIXIN
			this.setData({
				videoContext: uni.createVideoContext('polyvVideo')
			})
			// #endif
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {
			this.setData({
				playstatu: false
			})
		},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			startSeckill() {
				this.isSeckill = true;
			},
			changeTab(e) {
				const int = e.currentTarget.dataset.int;
				this.setData({
					tab: int
				});
			},

			goVip() {
				uni.navigateTo({
					url: '../../vip/vip'
				});
			},

			// 获取课程详情
			getCourse(id) {
				uni.showLoading({
					title: '加载中...'
				});
				apis.courseInfo({
					courseId: id
				}).then(res => {
					res.introduce = res.introduce.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;"');
					this.setData({
						courseInfo: res,
						isFree: !!res.isFree
					});
				});
			},
			toExam(item) {
				examApis.examRecordCheck().then((res) => {
					if (res.isExamination) {
						const examId = res.examId
						if (examId !== item.examId) {
							uni.showModal({
							    title: '提示',
							    content: '你正在考' + res.examName + '; 请先考完这个试卷再考其他试卷！',
							    success:  (res) => {
							        if (res.confirm) {
							           uni.navigateTo({
							           	url: '/pages/exam/startExam?id=' + examId
							           })
							        }
							    }
							});
						} else {
							uni.navigateTo({
								url: '/pages/exam/startExam?id=' + item.examId
							})
						}
					} else {
						uni.navigateTo({
							url: '/pages/exam/startExam?id=' + item.examId
						})
					}
				})
			},

			// 登录后详情
			getUserCourse(id) {
				uni.showLoading({
					title: '加载中...'
				});
				auth.courseInfo({
					courseId: id
				}).then(res => {
					// console.log(res)
					res.introduce = res.introduce.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;"');
					this.setData({
						courseInfo: res,
						isFree: !!res.isPay
					});
				});
			},

			selectVideo(e) {
				if (!uni.getStorageSync('userInfo')) {
					login(() => {
						this.setData({
							userInfo: uni.getStorageSync('userInfo')
						});
					});
					return;
				}
				let videoInfo = e;
				console.log(JSON.stringify(e))
				if (videoInfo.videoVid && videoInfo.videoLength) {
					if (this.isFree || videoInfo.isFree) {
						let vid = videoInfo.videoVid;
						this.playVideo(videoInfo, vid);
						uni.pageScrollTo({
							scrollTop: 0
						});
					} else {
						uni.showToast({
							title: '您没有观看权限',
							icon: 'none'
						});
					}
				} else {
					uni.showToast({
						title: '该视频未更新',
						icon: 'none'
					});
				}
			},

			// 播放视频
			playVideo(videoInfo, vid) {
				// console.log(polyvObject)
				const that = this;
				uni.showLoading({
					title: '加载中...'
				});
				console.log(JSON.stringify({
					periodId: videoInfo.id,
					videoVid: vid
				}))
				auth.getCourseSign({
					periodId: videoInfo.id,
					videoVid: vid
				}).then(res => {
					this.setData({
						faceContrast: res.residueContrastTotal,
						videoPeriodId: videoInfo.id
					})
					// #ifdef MP-WEIXIN || APP-PLUS
					this.wxGetVideo(vid, res, videoInfo)
					return
					// #endif
					//   console.log('res',res)
					this.getVideo(Object.assign({
						vid: vid
					}, res))
				});
			},
			getVideo(data) {
				const userInfo = uni.getStorageSync('userInfo')
				// let box = this.$refs.playerbox;
				this.setData({
					h5Video: true
				})
				if (this.videoContext) {
					this.videoContext.changeVid({
						vid: data.vid,
						playsafe: data.token,
						ts: data.ts,
						sign: data.sign,
						autoplay: true
					});
				} else {
					this.setData({
						videoContext: polyvObject('#player').videoPlayer({
							'width': '100%',
							'height': '203px',
							'forceH5': true,
							'code': data.code,
							'playsafe': data.token,
							'ts': data.ts,
							'sign': data.sign,
							'vid': data.vid,
							'viewerInfo': {
								'viewerId': userInfo.userNo,
								'viewerName': userInfo.nickname
							},
							flashvars: {
								skin_type: 'skin_blue',
								ban_set_player: 'off'
							}	
						})
					})
				}
			},
			wxGetVideo(vid, res, videoInfo) {
				polyv.getVideo(vid, (playInfo) => {
					this.setData({
						videoSrc: playInfo.src[0],
						study: videoInfo.id
					});
				}, res.ts, res.sign);
			},
			// 分页获取章节列表
			getChapterList(page) {
				apis.chapterList({
					courseId: this.courseId,
					pageCurrent: page
				}).then(res => {
					this.setData({
						chapterList: this.chapterList.concat(res.list)
					});
					if (res.pageCurrent === res.totalPage) {
						this.setData({
							loaddingEnd: false
						});
					} else {
						this.getChapterList(page + 1);
					}
				});
			},

			buyCourse() {
				if (!uni.getStorageSync('userInfo')) {
					login(() => {
						this.setData({
							userInfo: uni.getStorageSync('userInfo')
						});
						this.getUserCourse(this.courseId); // this.buyCourse()
					});
					return;
				}

				if (!this.courseInfo.isPutaway) {
					uni.showToast({
						title: '该课程已下架',
						icon: 'none'
					});
					return false;
				}
				uni.navigateTo({
					url: '../../order/order?no=' + this.courseId + '&t=1'
				});
			},
			// 获取播放时长
			getPlayTime() {
				const playInfo = this.playInfo
				// #ifdef  H5
				playInfo.currentTime = this.videoContext.j2s_getCurrentTime()
				playInfo.duration = this.videoContext.j2s_getDuration()
				// #endif
				// this.playInfo.currentTime
				if (this.faceContrast) { // 校验认证信息
					this.checkContrast(playInfo)
				}
				auth.saveCourseLog({
					noLoading: true,
					periodId: this.videoPeriodId,
					watchLength: playInfo.currentTime,
					duration: playInfo.duration
				}).then(res => {
					console.log(res)
				})
				if (this.playstatu) {
					setTimeout(() => {
						this.getPlayTime()
					}, 3000)
				}
			},
			// 活体认证
			checkContrast(playObj) {
				console.log('ontrastTotal', playObj)
				if (playObj.duration === 0) {
					return
				}
				if (!this.constrastTimes) { // 判断是否已经生成验证时间点
					const times = []
					for (let i = this.faceContrast; i > 0; i--) {
						const randomTime = Math.random() * playObj.duration / 3 + (playObj.duration / 3 * (3 - i))
						times.push(randomTime)
					}
					console.log(times)
					this.setData({
						constrastTimes: times
					})
				}
				const currentContrastTime = this.constrastTimes[3 - this.faceContrast] // 获得当前认证时间点
				if (playObj.currentTime > currentContrastTime) { // 需要活体认证
					console.log('需要认证')
					// #ifdef H5
					this.videoContext.j2s_pauseVideo();
					// #endif
					// #ifdef MP-WEIXIN
					this.videoContext.pause()
					// #endif
					console.log('pid', this.videoPeriodId)
					uni.navigateTo({
						url: '../../verifyFace/verifyFace?scene=' + this.videoPeriodId +'&courseId=' + this.courseId
					})
				}
			},

			// 播放
			isPlay: function(e) {
				this.setData({
					playstatu: true
				});
				this.getPlayTime()
			},
			// 暂停播放
			pausevideo: function() {
				this.setData({
					playstatu: false
				});
				this.getPlayTime()
			},
			// 暂停播放
			nextVideo: function() {
				this.setData({
					playstatu: false
				});
				this.getPlayTime()
			},
			// 显示加速列表
			showbei: function() {
				this.setData({
					showjs: !this.showjs
				});
			},
			// 选择倍速
			jiasu: function(e) {
				let beisu = parseFloat(e.currentTarget.dataset.b);
				this.videoContext.playbackRate(beisu);
				this.setData({
					bei: beisu,
					showjs: true
				});
			},
			videoTimeUpdate: function(result) {
				console.log(result.detail)
				this.setData({
					playInfo: result.detail
				})
			}
		}
	};
</script>
<style scoped>
	@import "../../../static/css/detail.css";

	.seckillBtn {
		background-color: red;
		color: #fff
	}
	
	.examBtn {
		width: 100rpx;
		text-align: center;
		line-height: 48rpx;
		height: 48rpx;
		float: right;
		margin-top: 6rpx;
		color:#fff;
		background-color: #2488EC;
		border-radius: 8rpx;
		float: right;
	}

	.beisu-btn {
		color: #fff;
		float: left;
		margin-left: 12rpx;
		font-size: 24rpx;
		width: 120rpx;
		text-align: left;
		background: rgba(0, 0, 0, 0.2);
	}

	.beisu-box .bei_list {
		width: 100rpx;
	}

	.beisu-box .btn {
		background: rgba(255, 255, 255, 0.8);
		font-size: 24rpx;
	}

	.beisu-box .btn.on {
		color: springgreen;
	}

	.share-btn {
		font-size: 26rpx;
		padding: 0;
		color: #333;
		background: none;
		border: none;
	}

	.share-btn:after {
		border: none;
	}

	.img_box {
		display: block;
	}

	.beisu-box {
		position: relative;
		z-index: 99;
	}

	.course_title {
		margin-left: 10rpx;
	}
</style>
