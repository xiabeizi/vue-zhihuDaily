<template>
	<div class="daily-list">
		<div class="time-label"> {{currentThemes}} </div>
		<loading :loading="isLoading"></loading>
		<div class="daily-list-body shadowscroll">
			<div class="daily-list-item"
			     v-for="(item,index) in menuLists"
			     @click="setContentsId(item.id)"
			     :key="index">
				<!-- @click="getDetail(storie)" -->
				<div class="media-img"
				     v-if="item.images">
					<img :src="imgPath + item.images[0]">
				</div>
				<div class="media-body">
					{{item.title}}
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
// import api from "../../api/api.js";
import loading from "../loading.vue";

export default {
	components: { loading },
	data() {
		return {
			imgPath: this.$api.ImgPath
		};
	},
	computed: {
		...mapState({
			menuLists: "themes_menuLists",
			isLoading: "menuListsIsLoading",
			currentThemes: "themes"
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
	meathods: {
		setContentsId(id) {
			this.$store.commit("setContentsId", { id });
		}
	}
};
</script>

