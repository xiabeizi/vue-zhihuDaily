<template>
    <div class="daily-list">
        <div v-if="this.type === 'recommend'" class="timeLabel"> {{timeLabel}} </div>
        <div v-else class="timeLabel"> {{themesLabel}} </div>
        <div class="daily-list-body shadowscroll"
          ref="itembody"
          v-domscroll="getPrevDay">
          <div class="daily-list-item"
            v-for="(storie,index) in stories" 
            :key="index"
            @click="getDetail(storie)">
              <div class="media-img" v-if="storie.images">
                  <img :src="imgPath + storie.images[0]">
              </div>
              <div class="media-body">
                  {{storie.title}}
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import bus from "./bus";
import directive from "./directive.js";
import util from "../libs/util.js";

export default {
  data() {
    return {
      type: "recommend",
      themesLabel:'',
      time: {}, //{time_Api: "20180510", label: "5月10日"}
      stories: [],
      imgPath: util.imgPath,
    };
  },
  computed: {
    timeLabel() {
      return this.time.label;
    }
  },
  methods: {
    //获取今天的推荐文章
    getToday() {
      //显示日期
      this.type = "recommend";
      //设置今天的日期
      this.time = util.formatTime();

      axios
        .get("/zhihu/last-stories")
        .then(response => {
          this.stories = response.data.STORIES.stories;
          this.$nextTick(() => {
            this.$refs.itembody.scrollTo(0, 0);
          });
          //通知 daily-artticle 组件，获取列表第一项的文章详情
          this.getDetail(this.stories[0]);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取 前一天文章
    getPrevDay(evt, el) {
      if (this.type !== "recommend") return;
      //滚动到底部时
      if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
        //获取前一天的时间
        const prevDay = util.getPrevDay(this.time.time_Api);
        //设置日期
        this.time = prevDay;
        axios
          .get("/zhihu/before-stories/" + prevDay.time_Api)
          .then(response => {
            this.stories = response.data.STORIES.stories;
            this.$nextTick(() => {
              this.$refs.itembody.scrollTo(0, 0);
            });
            //通知 daily-artticle 组件，获取列表第一项的文章详情
            this.getDetail(this.stories[0]);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    //获取 主题文章
    switchTheme(id) {
      this.type = "themes"; //隐藏日期
      axios
        .get("/zhihu/themes/" + id)
        .then(response => {
          this.stories = response.data.THEMEDES.stories;
          this.themesLabel = response.data.THEMEDES.name;
          this.$nextTick(() => {
            this.$refs.itembody.scrollTo(0, 0);
          });
          //通知 daily-artticle 组件，获取列表第一项的文章详情
          this.getDetail(this.stories[0]);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //通知 daily-artticle组件 获取文章详情
    getDetail(storie) {
      bus.$emit("getDetail", storie.id);
    }
  },
  mounted() {
    /*
     *获取今天的推荐文章，并且成功后
     *通知 daily-artticle 组件，获取列表第一项的文章详情
     */
    this.getToday();

    //监听获取 今天推荐文章 事件
    bus.$on("getToday", () => {
      this.getToday();
    });
    //监听获取 主题文章 事件
    bus.$on("switchTheme", id => {
      this.switchTheme(id);
    });
  }
};
</script>

<style>
.daily-list {
  width: 300px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 150px;
  border-right: 1px solid #d7dde4;
}
.timeLabel {
  padding: 10px;
  height: 36px;
  text-align: center;
}
.daily-list-body {
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
