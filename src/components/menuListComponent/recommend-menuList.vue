<template>
	<div class="daily-list">
		<div class="time-label"> {{currentDate | ApiToLabel}} </div>
		<loading :loading="isLoading"></loading>
		<div class="daily-list-body shadowscroll"
		     ref="scrollBody"
		     v-domscroll="scrollHandel">
			<div v-for="(item,index) in menuLists"
			     ref="menuListBody"
			     :key="index">
				<div class="daily-list-item">{{item.date | menuListsDate}}</div>
				<div class="daily-list-item"
				     v-for="(storie,index) in item.stories"
				     @click="setContentsId(storie.id)"
				     :key="index">
					<!-- @click="getDetail(storie)" -->
					<div class="media-img"
					     v-if="storie.images">
						<img :src="imgPath + storie.images[0]">
					</div>
					<div class="media-body">
						{{storie.title}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import util from "../../libs/util.js";
import loading from "../loading.vue";

export default {
	components: { loading },
	data() {
		return {
			imgPath: this.$api.ImgPath,
			//滚动条位置
			scrollTop: 0,
			//滚动条位置的数组
			scrollTopObj: [],
			//当前正在浏览的推荐日报的日期
			currentDate: ""
		};
	},
	filters: {
		//把 api的时间格式 处理在 列表同步 显示所需要的格式: "5月10日"
		ApiToLabel: date => util.ApiToLabel(date),
		//把 api的时间格式 处理在 推荐列表 显示所需要的格式: "5月10日 星期六"
		menuListsDate: date => util.menuListsDate(date)
	},
	directives: {
		domscroll: {
			inserted: function(el, binding) {
				let f = function(evt) {
					if (binding.value(evt, el)) {
						el.removeEventListener("scroll", f);
					}
				};
				el.addEventListener("scroll", f);
			}
		}
	},
	computed: {
		...mapState({
			//从$store读取列表数据
			menuLists: "recommend_menuLists",
			//初始化从$store读取一次date
			storeDate: "date"
		}),
		isLoading: {
			get() {
				return this.$store.state.menuListsIsLoading;
			},
			set(boolean) {
				this.$store.commit("menuListsIsLoading", { boolean: boolean });
			}
		}
	},
	watch: {
		/**
		 * 每次menuLists 即列表数组发生变化的时候，
		 * 记录下当前dom的scrollHeight和日期，push到scrollTopObj中
		 * 用在滚动的时候，对比scrollTop的值，以确定当前正在看的推荐日报的日期
		 * */
		menuLists(newVal) {
			this.$nextTick(function() {
				// 列表数据更新了
				const scrollHeight = this.$refs.scrollBody.scrollHeight;
				const date = newVal[newVal.length - 1].date;
				this.scrollTopObj.push({ scrollHeight, date });

				//假如今天的日报数量不够出滚动条，默认加载上一天的日报
				let menuListHeight = 0;
				this.$refs.menuListBody.forEach(element => {
					menuListHeight += element.clientHeight;
				});
				if (scrollHeight > menuListHeight) {
					this.$store.dispatch("getPrevDay", {
						date: this.currentDate
					});
				}
			});
		},
		//初始化从$store读取一次date之后，设置到 列表头部
		storeDate(newVal) {
			this.currentDate = newVal;
		}
	},
	methods: {
		scrollHandel(evt, el) {
			//记录下scrollTop的值
			this.scrollTop = this.$refs.scrollBody.scrollTop;
			//对比滚动的高度以确定并设置 正在看的日报 的日期
			for (let item of this.scrollTopObj) {
				if (item.scrollHeight >= this.scrollTop) {
					//设置日期
					this.currentDate = item.date;
					break;
				} else {
					continue;
				}
			}
			//滚动到底部时 请求上一天的数据
			if (
				el.scrollTop + el.clientHeight >= el.scrollHeight &&
				this.isLoading === false
			) {
				this.isLoading = true;
				//获取前一天的推荐日报
				//const prevDay = util.getPrevDay(this.currentDate);
				this.$store.dispatch("getPrevDay", { date: this.currentDate });
			}
		},
		//点击文章的时候设置全局文章的id
		setContentsId(id) {
			this.$store.commit("setContentsId", { id });
		}
	},
	created() {
		this.$store.dispatch("getToday");
	},
	//显示的时候，还原滚动条位置
	activated() {
		this.$refs.scrollBody.scrollTo(0, this.scrollTop);
	}
};
</script>

