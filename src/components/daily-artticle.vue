<template>
	<div class="daily-artticle"
	     ref="scrollbody">
		<loading :loading="isLoading"></loading>
		<h2 class="daily-artticle-title">
			{{artticle.title}}
		</h2>
		<div v-html="artticle.body">
		</div>
	</div>
</template>

<script>
import loading from "./loading.vue";
// import api from "../api/api";
import Util from "../libs/util";

export default {
	components: { loading },
	data: function() {
		return {
			artticle: {},
			isLoading: true
		};
	},
	computed: {
		contentsId() {
			return this.$store.state.contentsId;
		}
	},
	watch: {
		//watch文章id
		contentsId(newVal) {
			this.getContents(newVal);
		}
	},
	methods: {
		getContents(contentsId) {
			this.isLoading = true;
			//请求文章的详细
			this.$api.getContents(contentsId).then(response => {
				let res = response.data.CONTENTS;
				//将图片的链接 换成代理的地址
				res.body = res.body.replace(
					/src="http/g,
					'src="' + this.$api.ImgPath + "http"
				);
				res.body = res.body.replace(
					/src="https/g,
					'src="' + this.$api.ImgPath + "https"
				);
				this.artticle = res;
				this.$nextTick(() => {
					this.isLoading = false;
					Util.scrollToTop(this.$refs.scrollbody);
				});
			});
		}
	}
};
</script>

<style>
.daily-artticle {
	position: relative;
	margin-left: 450px;
	height: 100%;
	padding: 10px;
	font-size: 18px;
	overflow: auto;
}
.daily-artticle > h2 {
	margin: 20px;
	color: #494b4d;
	line-height: 1.4;
	font-size: 30px;
}
.main-wrap {
	max-width: 100%;
	min-width: 300px;
	margin: 0 auto;
}
.content-wrap {
	overflow: hidden;
	background-color: #f9f9f9;
}
.content-wrap a {
	word-break: break-all;
}
.headline {
	border-bottom: 4px solid #f6f6f6;
}
.headline-title.onlyheading {
	margin: 20px 0;
}
.headline img {
	max-width: 100%;
	vertical-align: top;
}
.headline-background-link {
	line-height: 2em;
	position: relative;
	display: block;
	padding: 20px 45px 20px 20px !important;
}
.headline-background .heading {
	color: #999;
	font-size: 15px !important;
	margin-bottom: 8px;
	line-height: 1em;
}
.headline-background .heading-content {
	color: #444;
	font-size: 17px !important;
	line-height: 1.2em;
}
.headline-title {
	line-height: 1.2em;
	color: #000;
	font-size: 22px;
	margin: 20px 0 10px;
	padding: 0 20px !important;
	font-weight: bold;
}
.meta {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	font-size: 16px;
	color: #b8b8b8;
}
.meta .source-icon {
	width: 20px;
	height: 20px;
	margin-right: 4px;
}
.meta .time {
	float: right;
	margin-top: 2px;
}
.content {
	color: #444;
	line-height: 1.6em;
	font-size: 17px;
	margin: 10px 0 20px;
}
.content img {
	max-width: 100%;
	display: block;
	margin: 30px auto;
}

.content img + img {
	margin-top: 15px;
}

.content img[src*="zhihu.com/equation"] {
	display: inline-block;
	margin: 0 3px;
}
.content a {
	color: #259;
}
.content a:hover {
	text-decoration: underline;
}
.view-more {
	margin-bottom: 25px;
	text-align: center;
}
.view-more a {
	font-size: 16px;
	display: inline-block;
	width: 125px;
	height: 30px;
	line-height: 30px;
	background: #f0f0f0;
	color: #b8b8b8;
}
.question {
	overflow: hidden;
	padding: 0 20px !important;
}
.question + .question {
	border-top: 5px solid #f6f6f6;
}
.question-title {
	line-height: 1.4em;
	color: #000;
	font-weight: 700;
	font-size: 18px;
	margin: 20px 0;
}
.meta .author {
	color: #444;
	font-weight: 700;
}
.answer + .answer {
	border-top: 2px solid #f6f6f6;
	padding-top: 20px;
}
.footer {
	text-align: center;
	color: #b8b8b8;
	font-size: 13px;
	padding: 20px 0;
}
.footer a {
	color: #b8b8b8;
}
.question .view-more a {
	width: 100%;
	display: block;
}
.img-wrap .headline-title {
	bottom: 5px;
}
.img-wrap .img-source {
	right: 10px !important;
	font-size: 9px;
}
.global-header {
	position: static;
}
.button {
	width: 60px;
}
.button i {
	margin-right: 0;
}
.large .question-title {
	font-size: 24px;
}
.large .meta {
	font-size: 18px;
}
.large .content {
	font-size: 20px;
}
.large blockquote,
.large sup {
	line-height: 1.6;
}
.meta .meta-item {
	-o-text-overflow: ellipsis;
	width: 39%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	display: inline-block;
	color: #929292;
	margin-right: 7px;
}
.headline .meta {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	font-size: 11px;
	color: #b8b8b8;
	margin: 15px 0;
	padding: 0 20px;
}
.headline .meta a,
.headline .meta a:hover {
	padding-left: 1em;
	margin-top: 2px;
	float: right;
	font-size: 11px;
	color: #0066cf;
	text-decoration: none;
}
.highlight {
	width: auto;
	overflow: auto;
	word-wrap: normal;
}
.highlight::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
.highlight code {
	overflow: auto;
}
.highlight::-webkit-scrollbar-thumb:horizontal {
	border-radius: 6px;
	background-color: rgba(0, 0, 0, 0.5);
}
.highlight::-webkit-scrollbar-thumb:horizontal:hover {
	background-color: rgba(0, 0, 0, 0.6);
}
.highlight pre {
	margin: 0;
	white-space: pre;
}
.highlight .hll {
	background-color: #ffc;
}
.highlight .err {
	color: #a61717;
	background-color: #e3d2d2;
}
.highlight .cp {
	color: #999;
	font-weight: 700;
}
.highlight .cs {
	color: #999;
	font-weight: 700;
	font-style: italic;
}
.highlight .gd {
	color: #000;
	background-color: #fdd;
}
.highlight .gi {
	color: #000;
	background-color: #dfd;
}
.highlight .gu {
	color: #aaa;
}
.highlight .ni {
	color: purple;
}
.highlight .nt {
	color: navy;
}
.highlight .w {
	color: #bbb;
}
.highlight .sr {
	color: olive;
}
[hidden],
.button span {
	display: none;
}
b,
strong,
.highlight .k,
.highlight .o,
.highlight .gs,
.highlight .kc,
.highlight .kd,
.highlight .kn,
.highlight .kp,
.highlight .kr,
.highlight .ow {
	font-weight: 700;
}
dfn,
.highlight .ge {
	font-style: italic;
}
.meta span,
.meta .source {
	vertical-align: middle;
}
.meta .avatar,
.comment-meta .avatar {
	width: 20px;
	height: 20px;
	border-radius: 2px;
	margin-right: 5px;
}
.meta .bio,
.highlight .gh,
.highlight .bp {
	color: #999;
}
.nig .highlight .c,
.highlight .cm,
.highlight .c1 {
	color: #998;
	font-style: italic;
}
.highlight .gr,
.highlight .gt {
	color: #a00;
}
.highlight .gp,
.highlight .nn {
	color: #555;
}
.highlight .kt,
.highlight .nc {
	color: #458;
	font-weight: 700;
}
.highlight .m,
.highlight .mf,
.highlight .mh,
.highlight .mi,
.highlight .mo,
.highlight .il {
	color: #099;
}
.highlight .s,
.highlight .sb,
.highlight .sc,
.highlight .sd,
.highlight .s2,
.highlight .se,
.highlight .sh,
.highlight .si,
.highlight .sx,
.highlight .s1,
.highlight .ss {
	color: #d32;
}
.highlight .na,
.highlight .nb,
.highlight .no,
.highlight .nv,
.highlight .vc,
.highlight .vg,
.highlight .vi {
	color: teal;
}
.highlight .ne,
.highlight .nf {
	color: #900;
	font-weight: 700;
}
.answer h1,
.answer h2,
.answer h3,
.answer h4,
.answer h5 {
	font-size: 19px;
}

.meta .meta-item {
	width: 39%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	display: inline-block;
	color: #929292;
	margin-right: 7px;
}
.headline .meta {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	font-size: 11px;
	color: #b8b8b8;
	margin: 20px 0;
	padding: 0 20px;
}
.headline .meta a,
.headline .meta a:hover {
	margin-top: 2px;
	float: right;
	font-size: 11px;
	color: #0066cf;
	text-decoration: none;
}
.answer h1,
.answer h2,
.answer h3,
.answer h4,
.answer h5 {
	font-size: 19px;
}
.origin-source,
a.origin-source:link {
	display: block;
	margin: 25px 0;
	height: 50px;
	overflow: hidden;
	background: #f0f0f0;
	color: #888;
	position: relative;
	-webkit-touch-callout: none;
}
.origin-source .source-logo,
a.origin-source:link .source-logo {
	float: left;
	width: 50px;
	height: 50px;
	margin-right: 10px;
}
.origin-source .text,
a.origin-source:link .text {
	line-height: 50px;
	height: 50px;
	font-size: 13px;
}
.origin-source.with-link .text {
	color: #333;
}
.origin-source.with-link:after {
	display: block;
	position: absolute;
	border-color: transparent transparent transparent #f0f0f0;
	border-width: 7px;
	border-style: solid;
	height: 0;
	width: 0;
	top: 18px;
	right: 4px;
	line-height: 0;
	content: "";
}
.origin-source.with-link:before {
	display: block;
	height: 0;
	width: 0;
	position: absolute;
	top: 18px;
	right: 3px;
	border-color: transparent transparent transparent #000;
	border-width: 7px;
	border-style: solid;
	line-height: 0;
	content: "";
}
.origin-source-wrap {
	position: relative;
	background: #f0f0f0;
}
.origin-source-wrap .focus-link {
	position: absolute;
	right: 0;
	top: 0;
	width: 45px;
	color: #00a2ed;
	height: 50px;
	display: none;
	text-align: center;
	font-size: 12px;
	-webkit-touch-callout: none;
}
.origin-source-wrap .focus-link .btn-label {
	text-align: center;
	display: block;
	margin-top: 8px;
	border-left: solid 1px #ccc;
	height: 34px;
	line-height: 34px;
}
.origin-source-wrap.unfocused .focus-link {
	display: block;
}
.origin-source-wrap.unfocused .origin-source:before,
.origin-source-wrap.unfocused .origin-source:after {
	display: none;
}
.question-title {
	color: #494b4d;
}

blockquote {
	color: #9da3a6;
	border-left: 3px solid #dfe3e6;
}

.content a {
	color: #4786b3;
}

.content {
	font-size: 17px;
	color: #616466;
}

.content-wrap {
	background: #fff;
}

hr {
	margin: 30px 0;
	border-top-width: 0;
}

p {
	margin: 20px 0 !important;
}
</style>
