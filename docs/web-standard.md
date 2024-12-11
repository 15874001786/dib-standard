# 前端开发规约

html、css、js、ts代码具体规范

[html规约](./html.md)

[css规约](./css.md)

[js规约](./javascript.md)

[ts规约](./typescript.md)

## 工程化配置

为了严格参照上述代码规范，需要工程化进行配置

推荐可选方案:

### 1.F2Elint
F2Elint 是由阿里巴巴团队开发的一款前端代码质量工具，可用于 JavaScript、TypeScript、Style/CSS/SCSS/Less、HTML/Markdown、Vue/
React 等前端全栈场景，也集成了 Prettier、ESLint、stylelint 等。

安装F2Elint：

````md
npx @f2elint/cli init
````
这将会在你的项目中安装 F2Elint，并自动创建一个 .f2elintrc.js 配置文件。

配置 F2Elint：你可以编辑 .f2elintrc.js 文件来定制 F2Elint 的规则。F2Elint 的配置非常灵活，你可以根据项目需求来进行定制。

运行 F2Elint：在配置好 F2Elint 后，你可以通过运行 npm run lint 命令来检查你的代码。如果你在 package.json 中设置了相应的脚本，你也可以运行 npm run fix 来自动修复一些简单的问题。

集成到 CI/CD：你还可以将 F2Elint 集成到你的持续集成/持续部署（CI/CD）流程中，这样你就可以在代码提交到仓库时自动检查代码质量。

### 2.airbnb-base
eslint-config-airbnb-base 是 Airbnb 公司开发并维护的一套 JavaScript 语言的编程规范，被广泛应用于许多项目中。使用这套基于Base基础上去添加 eslint 和 prettier的内容，定制度更高，团队可自行编写成团队大部分成员所习惯的编码风格。

### 3.配置Husky和lint-staged
[husky+lint-staged介绍文章](https://juejin.cn/post/7085534305249656862)

上述为可参考文章

通过husky，去处理 git pre-commit和push等钩子，然后在pre-commit钩子中用lint-staged       去处理 git add 缓冲区中的提交内容，在Lint-staged中去执行 esint --fix，prettier --write 等。在钩子中也可执行tsc的检测校验，这个由开发团队自行决定。通过husky、lint-staged的配置，我们能做到

1.针对本次提交的代码自动执行eslint prettier --fix、可让代码风格、规范统一

2.当工具检测不通过时则拦截commit的提交，通过工具去保证代码质量

需要在package script中写prepare: husky install，通常在npm i 后，会默认执行一遍prepare去进行husky的初始化，若不是通过Npm install的，即要手动输入prepare去初始化Husky

### 4.node依赖包与vscode插件统一
在上述的eslint prettier配置完成后，需要在vscode中也安装eslint、pretteier的插件，插件会默认读取根目录下的.eslintrc .prettierrc，这样在vscode开发中，也能看到编辑器的eslint等报错，而进行及时的更改



## Vue开发规约

[vue开发规约](./vue-standard.md)

## 代码评审

在功能或fix bug的内容提mr后，组内开发人员就可以代码评审查看了，评审他人代码是个好的习惯，1者学习了解他人的代码，2者把控项目代码质量。code review往往是工程师之间关于代码交流的最好方式。

再优秀的工程师也有可能犯下低级错误，代码评审也是项目质量的最后一道关卡

代码评审需要做到

1.禁止重复造轮子，看到开发者重复造了轮子需要更正改进，尽量复用现有组件

2.组件封装复用，若一些功能是系统全局可能复用到的，需要单独抽离，封装成组件

3.针对公共区域的代码进行重点评审，不应此次改动可能影响到别的业务或者别的场景

4.禁止死循环或者内存泄漏代码

5.代码是否正确地处理了错误和边界情况？是否使用了错误边界组件？

6.是否避免了不必要的渲染和计算？或者说是否性能方面欠考虑，比如表格中添加表单组件，大量的组件渲染以及双向数据绑定会导致页面及其卡顿，这种情况是否使用了懒加载和异步组件？

7.核心模块，公共组件等是否严格使用了ts

8.css中的通用样式是否用了预编译器中的变量或者函数，禁止单独写死通用样式

至少需要一半的组内工程师评审完毕点击approve后，仓库拥有者owner点击合并，才可合并回rc，master分支
