<template>
    <div class="daily-menu">
        <div class="daily-menu-item" 
              @click="clickRecommend"
              :class="{ on: type === 'recommend' }">每日推荐</div>
        <div class="daily-menu-item" 
              @click="clickTheme"
              :class="{ on: type === 'themes' }">主题日报</div>
        <ul v-show="this.show">
            <li v-if="menus.length"
                v-for="(item,index) in menus" 
                :key="index">
                <a href="#" @click="switchTheme(item)"
                            :title="item.description"> 
                    {{item.name}} 
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
import bus from "./bus.js";

export default {
  data() {
    return {
      menus: [],
      type: "recommend",
      show: true
    };
  },
  methods: {
    //获取 主题日报 分类
    clickTheme() {
      this.show = !this.show;
      bus.$emit("getTheme");
    },
    //通知 daily-list 组件 获取今天的推荐文章
    clickRecommend() {
      this.type = "recommend";
      this.show = false;
      bus.$emit("getToday");
    },
    //通知 daily-list 组件 获取相应主题下的文章
    switchTheme(item) {
      this.type = "themes";
      bus.$emit("switchTheme", item.id);
    }
  },
  created() {
    //获取主题的菜单
    axios
      .get("/zhihu/themes")
      .then(response => {
        this.menus = response.data.THEMES.others;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style>
.daily-menu {
  width: 150px;
  position: fixed;
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
</style>

