import vue from "vue";
import vuex from "vuex";
import api from "../api/api";

vue.use(vuex);

const state = {
	//当前日报的类型 recommend:每日推荐 themes:主题日报
	type: "recommend",
	//当前浏览日报的日期
	date: "",
	//推荐日报的列表数据
	recommend_menuLists: [],
	//当前浏览日报的主题
	themes: "",
	//主题日报的列表数据
	themes_menuLists: [],
	//列表是否在加载
	menuListsIsLoading: true,
	//当前阅读的文章id
	contentsId: 0
};

const mutations = {
	//显示或隐藏列表加载的遮罩层
	menuListsIsLoading(state, { boolean }) {
		state.menuListsIsLoading = boolean;
	},
	//切换推荐日报和主题日报
	changeType(state, { type }) {
		state.type = type;
	},
	//设置文章id
	setContentsId(state, { id }) {
		state.contentsId = id;
	},
	//列表获取今天的推荐日报
	getToday(state, { date, menuLists }) {
		//初始化设置一次日期
		state.date = date;
		state.recommend_menuLists.push(menuLists);
	},
	//获取指定的往天日报
	getPrevDay(state, { date, menuLists }) {
		state.recommend_menuLists.push(menuLists);
	},
	//设置当前正在看的主题日报的主题
	setThemes(state, { themes }) {
		state.themes = themes;
	},
	//获取指定的主题日报
	getThemesContents(state, { menuLists }) {
		state.themes_menuLists = menuLists;
	}
};

const actions = {
	//获取今天的推荐日报
	getToday({ commit }) {
		api.getToday.then(response => {
			const date = response.data.STORIES.date;
			const menuLists = response.data.STORIES;
			const id = response.data.STORIES.stories[0].id;
			commit("getToday", { date, menuLists });
			commit("menuListsIsLoading", { boolean: false });
			commit("setContentsId", { id });
		});
	},
	//获取选择的主题日报
	getThemesContents({ commit }, { id, name }) {
		api.getThemesContents(id).then(response => {
			const menuLists = response.data.THEMEDES.stories;
			const id = response.data.THEMEDES.stories[0].id;
			commit("getThemesContents", { menuLists });
			commit("setContentsId", { id });
			commit("setThemes", { themes: name });
			commit("menuListsIsLoading", { boolean: false });
		});
	},
	//往天的推荐日报
	getPrevDay({ commit }, { date }) {
		api.getPrevDay(date).then(response => {
			const date = response.data.STORIES.date;
			const menuLists = response.data.STORIES;
			commit("getPrevDay", { date, menuLists });
			commit("menuListsIsLoading", { boolean: false });
		});
	}
};

const store = new vuex.Store({
	state,
	mutations,
	actions
});

export default store;
