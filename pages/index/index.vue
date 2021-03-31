<template>
	<view class="container">
		<view class="home" :class="[jumpScrollBarFinished ? 'transparent' : '']">
			<!-- 已登录,企业用户首页1 -->
			<view v-if="$findItem(tabArr, 'index', 'pageName')" v-show="currentPageName === 'index'">
				<index ref="index"></index>
			</view>
			<view v-if="$findItem(tabArr, 'all', 'pageName')" v-show="currentPageName === 'all'">
				<all ref="all"></all>
			</view>
			<view v-if="$findItem(tabArr, 'enterprise', 'pageName')" v-show="currentPageName === 'enterprise'">
				<enterprise ref="enterprise"></enterprise>
			</view>
			<view v-if="$findItem(tabArr, 'study', 'pageName')" v-show="currentPageName ===  'study'">
				<study ref="study"></study>
			</view>
			<view v-if="$findItem(tabArr, 'user', 'pageName')" v-show="currentPageName ===  'user'">
				<user ref="user"></user>
			</view>
		</view>
		<tabBar ref="tabBar" @tabbarChange="switchTab" :propsCurrentPageName="currentPageName"
			:identityType="userInfo.company ? 1 : 0">
		</tabBar>
	</view>
</template>

<script>
	// currentPageName: index:首页/all:全部/study:学习/enterprise:企业/user:我的
	// userInfo.company true:企业/false:个人
	// 跳转至tabar对应页面：/pages/index/index?pageName=user（user为页面名称）
	import tabBar from '@/components/tabBar/tabBar.vue' // 底部导航

	import index from '@/components/index/index.vue' // 首页
	import all from '@/components/index/all.vue' // 全部
	import study from '@/components/index/study.vue' // 学习
	import enterprise from '@/components/index/enterprise.vue' // 企业
	import user from '@/components/index/user.vue' // 我的


	export default {
		components: {
			index,
			all,
			study,
			enterprise,
			user,
			tabBar
		},
		data() {
			return {
				jumpScrollBarFinished: 1, // 跳转滚动条完毕 避免页面从顶部滚动到指定位置瞬间抖动
				userInfo: uni.getStorageSync('userInfo'), // 用户信息
				userToken: uni.getStorageSync('userToken'),
				currentPageName: "", // 当前页面名称ID
				tabArr: [] // 缓存页面基本信息 缓存过的页面 无须重新渲染  优化性能
			}
		},
		onShow() {
			this.onPageshow()
		},
		async onLoad(options) {
			// await this.$onLaunched // 初始化数据
			this.init(options)
		},
		onReachBottom(e) {
			this.$refs[this.currentPageName] && this.$refs[this.currentPageName].onPagesReachBottom && this.$refs[this
					.currentPageName]
				.onPagesReachBottom(e)
		},
		onPullDownRefresh() {
			this.$refs[this.currentPageName] && this.$refs[this.currentPageName].onPagesPullDownRefresh && this.$refs[this
					.currentPageName]
				.onPagesPullDownRefresh()
		},
		onPageScroll(e) {
			this.$refs[this.currentPageName] && this.$refs[this.currentPageName].onPagesScroll && this.$refs[this
				.currentPageName].onPagesScroll(e)
			this.setScrollTop(e)
		},

		methods: {
			init(options) {
				if (options.pageName && options.pageName !== 'undefined') {
					this.currentPageName = options.pageName
				} else {
					this.currentPageName = 'index'
				}
				this.tabArr.push({
					pageName: this.currentPageName,
					scrollTop: 0
				})
				this.$getUserInfo() // 更新用户信息，会重新渲染页面
				this.$nextTick(() => {
					this.$refs[this.currentPageName] && this.$refs[this.currentPageName].onPagesLoad && this.$refs[
							this.currentPageName]
						.onPagesLoad(options)
				})
			},
			setScrollTop(e) { // 设置对应页面滚动条位置
				this.$findItem(this.tabArr, this.currentPageName, 'pageName').scrollTop = e.scrollTop
			},
			onPageshow() { // 页面初始函数
				this.$nextTick(() => {
					this.$refs[this.currentPageName] && this.$refs[this.currentPageName].onPageshow && this.$refs[
							this.currentPageName]
						.onPageshow()
				})
			},
			switchTab(e) { // tabar页面跳转方式：this.$parent.switchTab(e)
				if (this.currentPageName !== e) { // 禁止重复刷新
					this.currentPageName = e
					this.jumpScrollBarFinished = 0 // 设置滚动条定位中状态
					if (!this.$findItem(this.tabArr, this.currentPageName,
							'pageName')) { // 查询有没有缓存记录  缓存过的页面 无须重新渲染  优化性能  第一次点击切换页面
						let pageName = this.currentPageName
						let scrollTop = 0
						this.tabArr.push({
							pageName,
							scrollTop
						})
					}
					this.$nextTick(() => {
						uni.pageScrollTo({
							duration: 0, // 毫秒
							scrollTop: this.$findItem(this.tabArr, this.currentPageName, 'pageName')
								.scrollTop, // 位置
							success: () => {
								this.jumpScrollBarFinished = 1 // 定位渲染完毕
							}
						});
					}) // dom渲染完成后执行 避免渲染之前定位
					
					console.log("======所有缓存的页面信息=======")
					console.log(this.tabArr)
					this.onPageshow()
				}
			}
		}
	}
</script>

<style lang='scss'>
	.home {
		opacity: 0;
	}

	.transparent {
		transition: all .3s ease-in;
		-webkit-transition: all .3s ease-in;
		opacity: 1;
	}
</style>
