//requestAnimationFrame 兼容ie9及以下
window.requestAnimationFrame =
	window.requestAnimationFrame ||
	function(fn) {
		return setTimeout(fn, 1000 / 60);
	};
window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

const Util = {
	imgPath: "http://127.0.0.1:8011/img/",

	//把时间戳处理成 请求api 所需要的格式
	stampsToApi(timestamps = new Date()) {
		function s(num) {
			return num < 10 ? "0" + num : num.toString();
		}

		const timestamp = new Date(timestamps);
		const year = timestamp.getFullYear();
		const month = timestamp.getMonth() + 1;
		const day = timestamp.getDate();

		const time_Api = s(year) + s(month) + s(day);

		return time_Api;
		//time_Api: "20180510"
	},

	//把 api的时间格式 处理 时间戳
	ApiTostamps(timeapi) {
		const PrevDay = new Date();
		PrevDay.setFullYear(timeapi.slice(0, 4));
		PrevDay.setMonth(timeapi.slice(4, 6) - 1);
		PrevDay.setDate(timeapi.slice(6, 8));
		PrevDay.getTime();

		return PrevDay;
	},

	//把 api的时间格式 处理成需要在标题栏显示的格式
	ApiToLabel(timeapi) {
		const month = timeapi.slice(4, 6);
		const day = timeapi.slice(6, 8);
		return `${month}月${day}日`;
	},

	//把 api的时间格式 处理在 推荐列表 显示所需要的格式: "5月10日 星期六"
	menuListsDate(timeapi) {
		const weekStr = ["日", "一", "二", "三", "四", "五", "六"];
		const currentTimeStamp = this.ApiTostamps(timeapi);

		const month = timeapi.slice(4, 6);
		const day = timeapi.slice(6, 8);
		const week = currentTimeStamp.getDay();

		const label = `${month}月${day}日 星期${weekStr[week]}`;

		return label;
	},

	// 获取上一天日期  timeStamp = "20180510"
	getPrevDay(timeapi) {
		const currentTimeStamp = this.ApiTostamps(timeapi);
		const prevTimeStamp = currentTimeStamp - 24 * 60 * 60 * 1000;

		return this.stampsToApi(prevTimeStamp);
	},

	//平滑滚动回顶部处理
	scrollToTop(el) {
		const scrollToTop = el => {
			let c = 0;
			if (el == document) {
				c = el.documentElement.scrollTop || el.body.scrollTop;
			} else {
				c = el.scrollTop;
			}
			if (c > 0) {
				window.requestAnimationFrame(function() {
					scrollToTop(el);
				});
				el == document
					? window.scrollTo(0, c - c / 8)
					: el.scrollTo(0, c - c / 8);
			}
		};
		scrollToTop(el);
	}
};

export default Util;
