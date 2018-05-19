//requestAnimationFrame 兼容ie9及以下
window.requestAnimationFrame = window.requestAnimationFrame || function (fn) { return setTimeout(fn, 1000 / 60) }
window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

const Util = {

    imgPath: 'http://127.0.0.1:8011/img/',

    //把时间处理成 请求api 和 在title显示 所需要的格式
    formatTime(timestamps = new Date()) {
        function s(num) {
            return num < 10 ? '0' + num : num.toString();
        }

        const timestamp = new Date(timestamps);
        const year = timestamp.getFullYear();
        const month = timestamp.getMonth() + 1;
        const day = timestamp.getDate();

        const time_Api = s(year) + s(month) + s(day);
        const label = `${month}月${day}日`;

        return { time_Api, label };
        // {time_Api: "20180510", label: "5月10日"}
    },

    // 获取上一天日期  timeStamp = "20180510"
    getPrevDay(timeStamp) {
        const PrevDay = new Date();
        PrevDay.setFullYear(timeStamp.slice(0, 4));
        PrevDay.setMonth(timeStamp.slice(4, 6) - 1);
        PrevDay.setDate(timeStamp.slice(6, 8));
        PrevDay.getTime();

        const prevTimeStamp = PrevDay - 24 * 60 * 60 * 1000;
        return this.formatTime(prevTimeStamp);
    },

    //平滑滚动回顶部处理
    scrollToTop(el) {
        const scrollToTop = (el) => {
            let c = 0;
            if (el == document) {
                c = el.documentElement.scrollTop || el.body.scrollTop;
            } else {
                c = el.scrollTop;
            }
            if (c > 0) {
                window.requestAnimationFrame(function () {
                    scrollToTop(el);
                });
                el == document ? window.scrollTo(0, c - c / 8) : el.scrollTo(0, c - c / 8);
            }
        };
        scrollToTop(el);
    },

};

export default Util;
