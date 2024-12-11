# Vue开发规约
1.开发前的约束，vscode plugin必须安装eslint prettier插件，husky lint-staged是否安装视项目情况而定，git pull模式统一成rebase 或 默认的merge模式。(强制)

2.组件的文件名推荐采用首字母大写驼峰或者字母小写连字符的方式，例如：MyComponent.vue、my-component.vue。(强制)

3.组件名应该始终是多个单词的，根组件App和内置组件除外，这样做可以避免跟现有的以及未来的 HTML 元素冲突，因为所有的 HTML 元素名称都是单个单词的。(强制)

4.每个SFC组件，都需要有其name属性。name用处：(强制)

    在组件自己的模板中递归引用自己时。

    在 Vue 开发者工具中的组件树显示时。

    在组件抛出的警告追踪栈信息中显示时。

    使用 KeepAlive，通过该属性来匹配需要缓存的组件时。

5.vue-router的route name 命名规则通常是使用首字母大写驼峰或 kebab-case（短横线分隔式）。例如，MyRoute 或 my-route。(强制)

6.为组件样式去设置scope作用域，修改ui框架的相关css代码在全局styles里面去维护一个如custom-element.scss的文件，去进行样式重写(强制)

7.颜色等样式变量，尽量使用css变量或者element-plus的变量，与设计沟通必要情况下在var.css中自定义css变量，避免损坏切换颜色、字体、主题的系统功能。(强制)

8.不得破坏vue的单向数据流，举例：子组件修改父组件prop传过来的值。通常情况下，可以使用v-model配合computed set组合去修改适配上述场景，或者使用本地状态，一次性的emit修改父属性去处理。(强制)
    
9.使用组合式api、避免选项式api，使用第三方库等时，尽量选择按需引入的，如loadash-es loadsh选择loadsh-es，最大化tree-shaking的效果。(推荐)

10.处理函数异步使用async + await，并且用上try catch去捕获错误(推荐)

11.不要在onMounted钩子上去调用异步后端接口，理论上这个钩子只处理跟dom相关的逻辑，由于setup语法糖可以完成vue2 created钩子的工作，因此在setup中直接调用后端异步接口即可。(推荐)

12.在对vue3响应式和reactive了解不深的情况下，统一使用ref去进行响应式定义。比如：(推荐)

    当你对 reactive 创建的响应式对象进行解构操作时，你会丢失响应性

    与解构类似，如果你对 reactive 创建的响应式对象进行展开操作（例如，使用 ... 操作符创建一个新对象），也会丢失响应性。

    如果你使用 toRefs 或 toRaws 之类的函数将 reactive 创建的响应式对象转换为普通对象， 也会丢失响应性。

13.减少大型不可变数据的响应性开销，如处理表格渲染时不关注，数组对象里面对象key值的变化，只需要初始赋值渲染，可以使用shallowRef去替代ref，这样可以减少大量的响应性开销。(推荐)

14.多个请求并发时，尽量用Promise.allSettled替代Promise.all，Promise.allSettled会将成功和失败的结果都返回，可以更好的处理失败的情况。(推荐)

15.避免内存泄漏，在组件onUnmounted中往往需要给bus.on，定时器等代码给上终止的操作(推荐)

16.公共组件或者重要模块需要严格配置ts，一是静态检查，二是方便他人阅读(推荐)

17.灵活使用代码分割，如在vue-router上，如使用defineAsyncComponent按需加载组件上，如方法里(推荐)
````md
return import('./lazy.js')
````
加载js上，以上方式都会让打包被拆分到一个单独的文件中，只在调用或渲染时才被加载，可以有效减少打包体积，加快单页或者首页的加载速度。

18.保持props的稳定，在 Vue 之中，一个子组件只会在其至少一个 props 改变时才会更新，比如:active-id="activeId"可用:active="item.id === activeId"取代，保持props的稳定，可以避免不必要的更新。(推荐)

19.灵活使用v-memo，如渲染海量 v-for 列表，当组件的 selected 状态改变，默认会重新创建大量的 vnode，尽管绝大部分都跟之前是一模一样的，这时可使用(推荐)
````md
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
````
来优化渲染。
