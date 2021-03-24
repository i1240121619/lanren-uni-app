import config from './config';

export default {
	http(url1, method, data1, header1) {
		let url = url1.indexOf('http') != -1 ? url1 : config.baseUrl + url1;
		let token = uni.getStorageSync('userToken');
		let header = {
			"content-type": header1 || "application/json",
			"CTR_VERSION": 'DOCKER'
		}
		if (token) {
			header['token'] = token;
		}
		let data
		if (navigator) {
			data = JSON.stringify(data1)
		} else {
			data = data1
		}
		return new Promise((succ, error) => {
			this.request = uni.request({
				url,
				data,
				method,
				header,
				success: function(result) {
					let data1 = result.data
					if (data1.data === "invalid_token") {
						uni.removeStorageSync('userToken')
						uni.reLaunch({
							url: `/pages/index/index`
						});
					} else {
						succ.call(self, data1);
					}
				},
				fail: function(e) {
					error.call(self, e);
				}
			});
		});
	},
	checkLogin(form, type) {
		if (!type) return;
		if (!uni.getStorageSync('userToken')) {
			// 判断有没有登陆
			this.$getUni()[type]({
				url: '/pages/login/login?from=' + form + '&type=' + type
			});
			return false;
		}
		return true;
	},
	getUni() {
		if (navigator) {
			return wuni;
		} else {
			return uni;
		}
	},
	cutString(str, len) {
		if (!str) return ''
		if (str.length * 2 <= len) {
			return str
		}
		let strlen = 0
		let s = ""
		for (let i = 0; i < str.length; i++) {
			s = s + str.charAt(i)
			if (str.charCodeAt(i) > 128) {
				strlen = strlen + 2
				if (strlen >= len) {
					return s.substring(0, s.length - 1) + "..."
				}
			} else {
				strlen = strlen + 1;
				if (strlen >= len) {
					return s.substring(0, s.length - 2) + "..."
				}
			}
		}
		return s
	}, // length属性读出来的汉字长度为1
	toDecimal(x) {
		var f = parseFloat(x);
		if (isNaN(f)) {
			return '0.00';
		}
		var f = Math.round(x * 100) / 100;
		var s = f.toString();
		var rs = s.indexOf('.');
		if (rs < 0) {
			rs = s.length;
			s += '.';
		}
		while (s.length <= rs + 2) {
			s += '0';
		}
		return s;
	}, // 保留2位小数，如：2，会在2后面补上00.即2.00
	convertCcyCnZH(num1) {
		let num
		if (!num1) return 0
		if (typeof(num1) === 'number') {
			num = num1
		} else {
			num = Number(num1)
		}
		num = num.toFixed(2);
		num = parseFloat(num)
		num = num.toLocaleString();
		return num; //返回的是字符串23,245.12保留2位小数
	}, // 数字分割2,000
	wxPay(timeStamp, nonceStr, packages, paySign, success, fail, complete) {
		/*
		 * 微信小程序支付,仅支持微信支付(后续可能集成网页支付宝支付web-view)
		 * @param : provider(String) ->付款商家
		 * @param : timeStamp(String) ->时间戳(当前支付时间)
		 * @param : nonceStr(String) ->支付密匙
		 * @param : packages(String) ->支付id
		 * @param : signType(String) ->加密方式(默认MD5)
		 * @param : paySign(String)
		 */
		// console.log(timeStamp + ':' + nonceStr + ':' + packages + ':' + paySign)
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp,
			nonceStr,
			package: packages,
			signType: 'MD5',
			paySign,
			success(res) {
				success(res);
			},
			fail(err) {
				fail(err)
			},
			complete(res) {
				if (complete) {
					complete(res)
				}
			}
		});
	}, // 微信支付
	findIndex(arr, id, idKey) {
		let i = arr.length;
		while (i--) {
			if (arr[i][idKey] === id) {
				return i;
			}
		}
		return false;
	}, // 根据id 找索引
	findItem(arr, id, idKey) {
		let Item = arr.find(function(x) {
			return x[idKey] === id
		});
		return Item;
	}, // findItme(arr, id, idkey) 查询/查找
	saveLocal(key, obj) {
		uni.setStorageSync(key, obj)
	}, // 保存数据到本地
	getLocal(key) {
		const getObj = uni.getStorageSync(key) === 'undefined' ? null : uni.getStorageSync(key)
		return getObj
	}, // 获取本地数据
	delLocal(key) {
		uni.removeStorageSync(key)
	}, // 删除本地数据
	// 将日期时间转换为指定格式，如：YYYY-mm-dd HH:MM表示2019-06-06 19:45
	dateFormat(fmt, date) {
		let ret;
		const opt = {
			"Y+": date.getFullYear().toString(), // 年
			"m+": (date.getMonth() + 1).toString(), // 月
			"d+": date.getDate().toString(), // 日
			"H+": date.getHours().toString(), // 时
			"M+": date.getMinutes().toString(), // 分
			"S+": date.getSeconds().toString() // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt);
			if (ret) {
				fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			};
		};
		return fmt;
	},
	unique(arr, key) {
		let obj = {};
		let arr1 = arr.reduce(function(item, next) {
			obj[next[key]] ? '' : obj[next[key]] = true && item.push(next);
			return item;
		}, []);
		return arr1;
	}, //Set数据结构，它类似于数组，其成员的值都是唯一的'
	addArrLocal(newDada, name, key) {
		if (this.$getLocal(name)) {
			const oldObj = this.$getLocal(name)
			oldObj.unshift(newDada)
			this.$saveLocal(name, this.$unique(oldObj, key))
		} else {
			this.$saveLocal(name, [])
			const oldObj = this.$getLocal(name)
			oldObj.unshift(newDada)
			this.$saveLocal(name, this.$unique(oldObj, key))
		}
	}, // 追加累加数组元素
	delArrLocal(arr, id, name) {
		let filter = arr.filter(
			(item) => item.id != id
		);
		this.$saveLocal(name, filter)
	}, // 删除数组对象中指定那些或者某个对象
	addLocal(name, newDada) {
		if (name) {
			if (this.$getLocal('wordbook')) {
				const oldObj = this.$getLocal('wordbook')
				oldObj[name] = newDada
				this.$saveLocal('wordbook', oldObj)
			} else {
				this.$saveLocal('wordbook', {})
				const oldObj = this.$getLocal('wordbook')
				oldObj[name] = newDada
				this.$saveLocal('wordbook', oldObj)
			}
		} else {
			if (this.$getLocal('wordbook')) {
				const oldObj = this.$getLocal('wordbook')
				const newObj = Object.assign(oldObj, newDada)
				this.$saveLocal('wordbook', newObj)
			} else {
				this.$saveLocal('wordbook', {})
				const oldObj = this.$getLocal('wordbook')
				const newObj = Object.assign(oldObj, newDada)
				this.$saveLocal('wordbook', newObj)
			}
		}
	}, // 追加数组对象
	wordbook(callback) {
		// if (this.$getLocal('wordbook')) {
		// 	callback([1])
		// 	return
		// }
		const p1 = new Promise((resolve, reject) => {
			this.$http(`/custom/mallShop/getOrgIdByAppId?appId=${config.appId}`, 'GET').then((res) => {
				if (!res.code) { // 成功
					this.$addLocal('chainInfo', res.data)
					resolve(1)
				} else {
					reject(0)
				}
			})
		})

		Promise.all([p1]).then((res) => {
			callback(res)
		})
	}, // 按需调用字典
	getQueryString(url, name) {
		var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
		var r = url.substr(1).match(reg)
		if (r != null) {
			return r[2]
		}
		return null;
	}, // 获取url 参数
	getUserInfo(callback) {
		if (!uni.getStorageSync('userToken')) return
		this.$http('/user/auth/user/ext/view', 'POST', {
			noLoading: true
		}).then((res) => {
			if (res.code === 200) { // 获取个人信息
				let data = res.data
				uni.setStorageSync('userInfo', data)
				this.userInfo = uni.getStorageSync('userInfo')
				if (callback) {
					callback()
				}
			} else {
				uni.removeStorageSync('userToken')
				let pages = getCurrentPages()
				let page = pages[pages.length - 1]
				page.onLoad()
			}
		})
	}, // 更新用户信息
	groupingData(data, filed) {
		let map = {};
		let dest = [];
		data.forEach(item => {
			if (!map[item[filed]]) {
				dest.push({
					[filed]: item[filed],
					list: [item]
				});
				map[item[filed]] = item;
			} else {
				dest.forEach(dItem => {
					if (dItem[filed] == item[filed]) {
						dItem.list.push(item);
					}
				});
			}
		})
		return dest;
	}, // JS根据 某个共同字段将数据分组
	countDown(timeDifference, callback) {
		let timer = setInterval(() => {
			let hour = 0,
				minute = 0,
				second = 0; // 时间默认值
			if (timeDifference >= 0) {
				hour = Math.floor(timeDifference / (60 * 60));
				minute = Math.floor(timeDifference / 60) - (hour * 60);
				second = Math.floor(timeDifference) - (hour * 60 * 60) - (minute * 60);

				if (hour <= 9) hour = '0' + hour;
				if (minute <= 9) minute = '0' + minute;
				if (second <= 9) second = '0' + second;
				let data = {
					hour,
					minute,
					second
				};
				//console.log(timeDifference);
				callback(timeDifference, data);
				timeDifference--;
				//console.log(hour+"Kecil时："+minute+"分钟："+second+"秒");
			} else {
				clearInterval(timer);
			}
		}, 1000);
	}, // 倒计时 this.$countDown(this.timeDifference, (timeDifference, data) => {console.log(timeDifference);});
	timeStamp(str) {
		let stamp = new Date(str.replace(/-/g, '/')).getTime() / 1000;
		return stamp;
	}, // 2019-06-03 17:24:43 -> 1425553097
	getOsInfo() {
		const userAgent = navigator.userAgent.toLowerCase()
		let name = 'Unknown'
		let version = 'Unknown'
		if (userAgent.indexOf('win') > -1) {
			name = 'Windows'
			if (userAgent.indexOf('windows nt 5.0') > -1) {
				version = 'Windows 2000'
			} else if (
				userAgent.indexOf('windows nt 5.1') > -1 ||
				userAgent.indexOf('windows nt 5.2') > -1
			) {
				version = 'Windows XP'
			} else if (userAgent.indexOf('windows nt 6.0') > -1) {
				version = 'Windows Vista'
			} else if (
				userAgent.indexOf('windows nt 6.1') > -1 ||
				userAgent.indexOf('windows 7') > -1
			) {
				version = 'Windows 7'
			} else if (
				userAgent.indexOf('windows nt 6.2') > -1 ||
				userAgent.indexOf('windows 8') > -1
			) {
				version = 'Windows 8'
			} else if (userAgent.indexOf('windows nt 6.3') > -1) {
				version = 'Windows 8.1'
			} else if (
				userAgent.indexOf('windows nt 6.2') > -1 ||
				userAgent.indexOf('windows nt 10.0') > -1
			) {
				version = 'Windows 10'
			} else {
				version = 'Unknown'
			}
		} else if (userAgent.indexOf('iphone') > -1) {
			name = 'Iphone'
		} else if (userAgent.indexOf('mac') > -1) {
			name = 'Mac'
		} else if (
			userAgent.indexOf('x11') > -1 ||
			userAgent.indexOf('unix') > -1 ||
			userAgent.indexOf('sunname') > -1 ||
			userAgent.indexOf('bsd') > -1
		) {
			name = 'Unix'
		} else if (userAgent.indexOf('linux') > -1) {
			if (userAgent.indexOf('android') > -1) {
				name = 'Android'
			} else {
				name = 'Linux'
			}
		} else {
			name = 'Unknown'
		}
		return {
			name,
			version
		}
	} // 获取系统信息
};
