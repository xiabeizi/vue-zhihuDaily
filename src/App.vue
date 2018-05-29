<template>
	<div class="daily">
		<div class="daily-menu">
			<div class="daily-menu-item"
			     @click="changeTypeToRecommend"
			     :class="{ on: type === 'recommend' }">每日推荐</div>
			<div class="daily-menu-item"
			     @click="toggleTheme"
			     :class="{ on: type === 'themes' }">主题日报</div>
			<transition name="fade">
				<ul v-show="showThemeMenu">
					<li v-if="menus.length"
					    v-for="(item,index) in menus"
					    :key="index">
						<a href="#"
						   @click="getThemesContents(item)"
						   :title="item.description">
							{{item.name}}
						</a>
					</li>
				</ul>
			</transition>
		</div>
		<transition name="slide-left"
		            mode="out-in">
			<keep-alive>
				<component :is="menuListComponent"></component>
			</keep-alive>
		</transition>
		<daily-artticle></daily-artticle>
	</div>
</template>

<script>
import themesMenuList from "./components/menuListComponent/themes-menuList.vue";
import recommendMenuList from "./components/menuListComponent/recommend-menuList.vue";
import dailyArtticle from "./components/daily-artticle.vue";

export default {
	components: {
		dailyArtticle,
		recommendMenuList,
		themesMenuList
	},
	data: function() {
		return {
			//主题日报的菜单
			menus: [],
			//是否显示主题日报的菜单
			showThemeMenu: true,
			//点击的主题日报的id
			themeId: 0
		};
	},
	computed: {
		//日报的类型
		type: {
			get() {
				return this.$store.state.type;
			},
			set(type) {
				this.$store.commit("changeType", { type: type });
			}
		},
		//动态组件的名字
		menuListComponent() {
			return this.$store.state.type + "MenuList";
		}
		//
	},
	methods: {
		//把日报的类型切换为推荐日报
		changeTypeToRecommend() {
			this.type = "recommend";
		},
		//获取 主题日报 分类
		getThemesContents(item) {
			this.type = "themes";
			//如果主题id相同，不发起请求，使用缓存的动态组件
			if (this.themeId === item.id) return;
			this.themeId = item.id;
			this.$store.commit("menuListsIsLoading", { boolean: true });
			this.$store.dispatch("getThemesContents", item);
		},
		//显示隐藏 主题菜单
		toggleTheme() {
			this.showThemeMenu = !this.showThemeMenu;
		}
	},
	created() {
		this.$api.getThemes.then(response => {
			this.menus = response.data.THEMES.others;
		});
	}
};
</script>

<style>
html,
body {
	height: 100%;
}
body {
	color: #657180;
	font-size: 16px;
}
/*动画*/
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
	transition: 0.5s;
}
.slide-left-enter,
.slide-left-leave-to {
	transform: translate3d(-100%, 0, 0);
	opacity: 0;
}
.slide-left-enter-active,
.slide-left-leave-active {
	transition: 0.35s;
}

.daily {
	width: 100%;
	height: 100%;
}
.daily-menu {
	width: 150px;
	position: fixed;
	z-index: 1;
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 150px;
	background: rgb(245, 247, 249);
	text-align: center;
	overflow: auto;
}
.daily-menu-item {
	font-size: 18px;
	text-align: center;
	cursor: pointer;
	margin: 5px 0px;
	padding: 10px 0px;
	border-right: 2px solid transparent;
	transition: all 0.3s ease-in-out;
}
.daily-menu-item.on {
	border-right: 2px solid rgb(51, 153, 255);
}
.daily-menu-item:hover {
	background: rgb(227, 232, 238);
}
.daily-menu ul li a {
	display: block;
	margin: 5px 0;
	padding: 5px 0;
	color: inherit;
	text-decoration: none;
	cursor: pointer;
}
.daily-menu ul li a:hover {
	color: rgb(51, 153, 255);
}
.daily-list {
	width: 300px;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 150px;
	border-right: 1px solid #d7dde4;
}
.time-label {
	padding: 10px;
	height: 36px;
	text-align: center;
}
.daily-list-body {
	position: relative;
	overflow: auto;
	height: calc(100% - 36px);
}
.daily-list-item {
	padding: 16px;
	overflow: hidden;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
}
.daily-list-item:hover {
	background: rgb(227, 232, 238);
}
.media-img {
	width: 80px;
	height: 80px;
	float: left;
}
.media-img img {
	width: 100%;
	height: 100%;
	border-radius: 3px;
}
.media-body {
	padding: 10px 5px 10px 0;
}
.media-img + .media-body {
	padding-left: 90px;
}
</style>
