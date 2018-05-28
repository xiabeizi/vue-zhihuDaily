import axios from "axios";
import Vue from "vue";

/**
 * 配合proxy
 * 把 /zhihu 代理成 https://zhihu-daily.leanapp.cn/api/v1/
 */

const api = {
	//apiPath: "http://127.0.0.1:8010/",
	ImgPath: "http://127.0.0.1:8011/img/",
	zhihuPath: "/zhihu"
};

//知乎api通用路径
api.ajax = axios.create({
	baseURL: api.zhihuPath
});

//分类主题
api.getThemes = api.ajax.get("themes");

//主题日报
api.getThemesContents = function(id) {
	return api.ajax.get("themes/" + id);
};

//当天的推荐日报
api.getToday = api.ajax.get("last-stories");

//往天的推荐日报
api.getPrevDay = function(date) {
	return api.ajax.get("before-stories/" + date);
};

//文章的具体内容
api.getContents = function(id) {
	return api.ajax.get("contents/" + id);
};

export default api;
