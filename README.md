### 知乎日报

基于 vue 的一个项目，原本是 vuejs 实战书籍上的一个练习，后面随着自己对 vue 学习的深入，不断地进行重构，可以说收获挺大的。

###相关细节

*   使用`vuex`进行数据通信
*   日报列表类型切换使用动态组件进行了缓存
*   列表滚动的时候监听滚动高度以确定日报的日期
*   使用`proxy`处理请求`api`时的跨域问题
*   使用`node`进行图片的代理，处理跨域问题（书上的代码，我并不懂 nodejs）

![10](/assets/10.gif)

###收获

1.  对·中的,数据绑定,组件系统,`watch`响应变化等等得到了实际应用，有了进一步的认识。
2.  使用`vuex`进行全局的状态管理，熟悉了`vuex`的用法，熟悉了不同组件间的通信和交互的方法。
3.  学会利用`keep-alive`进行动态组件的缓存，对`vue`的性能优化有了理解。
4.  使用`vue`的`transition`过渡,制作良好的用户交互体验。

### Build Setup

> 因为用到了 node 代理，只能下载到本地运行

```bash
# install dependencies
npm install

# 启动node代理，处理跨域问题
npm node proxy.js

# serve with hot reload at localhost:8080
npm run dev
```
