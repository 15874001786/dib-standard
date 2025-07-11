# ARS 前端开发规范

## 1 开发环境配置

### 编辑器配置

#### VSCode 推荐配置

**必需插件安装：**

1. **代码质量插件**
   - ESLint - JavaScript 代码检查
   - Prettier - 代码格式化

2. **Vue.js 开发插件**
   - Vue Official - Vue 语法支持

3. **通用开发插件**
   - GitLens - Git 增强功能

4. **样式插件**
   - UnoCss - UnoCss vscode plugins
   - Stylelint - css Stylelint 检查插件

#### VSCode 工作区配置

在项目根目录下 `.vscode/settings.json`，继承即可

## 2 代码格式化配置

### Prettier 配置

项目根目录下 `.prettierrc`：

```json
{
  "printWidth": 100,                // 每行最大字符数，超出会自动换行（默认80，这里是100）
  "tabWidth": 2,                    // 一个tab等于几个空格（这里是2个空格）
  "useTabs": false,                 // 是否使用tab缩进（false表示用空格）
  "semi": false,                    // 语句末尾是否加分号（false表示不加）
  "vueIndentScriptAndStyle": false, // vue文件中的<script>和<style>是否缩进（false表示不缩进）
  "singleQuote": true,              // 字符串是否使用单引号（true表示用单引号，false用双引号）
  "quoteProps": "as-needed",        // 对象属性名是否加引号（"as-needed"表示只对需要的加）
  "bracketSpacing": true,           // 对象大括号内是否有空格（true表示有，如 { foo: bar }）
  "trailingComma": "none",          // 多行对象/数组最后一个元素后是否加逗号（"none"表示不加）
  "jsxSingleQuote": false,          // jsx中是否使用单引号（false表示用双引号）
  "arrowParens": "always",          // 箭头函数参数是否总是加括号（"always"表示总是加，如 (x) => x）
  "insertPragma": false,            // 是否在文件开头插入特殊注释（false表示不插入）
  "requirePragma": false,           // 是否只格式化带有特殊注释的文件（false表示所有文件都格式化）
  "proseWrap": "never",             // markdown等文本是否自动换行（"never"表示不换行）
  "htmlWhitespaceSensitivity": "strict", // html空白敏感度（"strict"表示严格遵守）
  "endOfLine": "auto",              // 换行符类型（"auto"表示保持现有风格）
  "rangeStart": 0                   // 格式化的起始位置（0表示从头开始）
}
```

### ESLint 配置

项目根目录下 `.eslintrc.js`：

```javascript
module.exports = {
  root: true,                        // 标记为根配置文件，停止向上查找其他配置文件
  env: {
    browser: true,                   // 启用浏览器全局变量（如 window, document）
    node: true,                      // 启用 Node.js 全局变量（如 process, global）
    es6: true                        // 启用 ES6 全局变量（如 Set, Map, Promise）
  },
  parser: 'vue-eslint-parser',       // 使用 Vue 专用的解析器来解析 .vue 文件
  parserOptions: {
    parser: '@typescript-eslint/parser', // 使用 TypeScript 解析器解析 <script> 标签内容
    ecmaVersion: 2020,               // 指定 ECMAScript 版本（2020 对应 ES2020）
    sourceType: 'module',            // 指定代码是模块类型（使用 import/export）
    jsxPragma: 'React',              // 指定 JSX 的 pragma（用于 JSX 语法）
    ecmaFeatures: {
      jsx: true                      // 启用 JSX 语法支持
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',   // Vue 3 推荐规则集
    'plugin:@typescript-eslint/recommended', // TypeScript 推荐规则集
    'prettier',                      // 禁用与 Prettier 冲突的 ESLint 规则
    'plugin:prettier/recommended',   // 将 Prettier 作为 ESLint 规则运行
    '@unocss'                        // UnoCSS 规则集
  ],
  rules: {
    // Vue 相关规则
    'vue/no-setup-props-destructure': 'off',        // 允许在 setup 中解构 props
    'vue/script-setup-uses-vars': 'error',          // 确保 script setup 中使用的变量被正确识别
    'vue/no-reserved-component-names': 'off',       // 允许使用保留的组件名
    'vue/custom-event-name-casing': 'off',          // 允许自定义事件名使用任意大小写
    'vue/attributes-order': 'off',                  // 不强制属性顺序
    'vue/one-component-per-file': 'off',            // 允许一个文件包含多个组件
    'vue/html-closing-bracket-newline': 'off',      // 不强制 HTML 闭合标签换行
    'vue/max-attributes-per-line': 'off',           // 不限制每行属性数量
    'vue/multiline-html-element-content-newline': 'off', // 不强制多行元素内容换行
    'vue/singleline-html-element-content-newline': 'off', // 不强制单行元素内容换行
    'vue/attribute-hyphenation': 'off',             // 不强制属性名使用连字符
    'vue/require-default-prop': 'off',              // 不强制 props 设置默认值
    'vue/require-explicit-emits': 'off',            // 不强制显式声明 emits
    'vue/require-toggle-inside-transition': 'off',  // 不强制 transition 内使用 toggle
    'vue/multi-word-component-names': 'off',        // 允许单词组件名
    'vue/no-v-html': 'off',                         // 允许使用 v-html 指令

    // TypeScript 相关规则
    '@typescript-eslint/ban-ts-ignore': 'off',      // 允许使用 @ts-ignore 注释
    '@typescript-eslint/explicit-function-return-type': 'off', // 不强制函数显式返回类型
    '@typescript-eslint/no-explicit-any': 'off',    // 允许使用 any 类型
    '@typescript-eslint/no-var-requires': 'off',    // 允许使用 require 语句
    '@typescript-eslint/no-empty-function': 'off',  // 允许空函数
    '@typescript-eslint/ban-ts-comment': 'off',     // 允许使用 @ts-* 注释
    '@typescript-eslint/ban-types': 'off',          // 允许使用被禁止的类型
    '@typescript-eslint/no-non-null-assertion': 'off', // 允许使用非空断言操作符
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 不强制模块边界类型
    '@typescript-eslint/no-unused-vars': 'off',     // 不检查未使用的变量
    '@typescript-eslint/no-use-before-define': 'off', // 允许在定义前使用

    // JavaScript 相关规则
    'no-use-before-define': 'off',                  // 允许在定义前使用变量
    'no-unused-vars': 'off',                        // 不检查未使用的变量
    'space-before-function-paren': 'off',           // 不强制函数括号前的空格

    // HTML 自闭合标签规则
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',                            // void 元素总是自闭合（如 <img />）
          normal: 'never',                           // 普通元素不自闭合（如 <div></div>）
          component: 'always'                        // 组件总是自闭合（如 <MyComponent />）
        },
        svg: 'always',                              // SVG 元素总是自闭合
        math: 'always'                              // MathML 元素总是自闭合
      }
    ],

    // 格式化相关规则
    'prettier/prettier': 'off',                     // 关闭 Prettier 规则（避免冲突）

    // UnoCSS 相关规则
    '@unocss/order': 'off',                         // 不强制 UnoCSS 类名顺序
    '@unocss/order-attributify': 'off'              // 不强制 UnoCSS 属性化顺序
  }
}
```

## 3 开发前检查清单

在开始开发前，请确保：

1. ✅ 已安装 VSCode 并配置上述插件
2. ✅ 已安装并配置 ESLint、Prettier、Stylelint等
3. ✅ 已配置 Git 钩子确保提交前代码检查(pnpm prepare)

## 4 常用快捷键

- `Ctrl + Shift + P` - 命令面板
- `Ctrl + Shift + F` - 全局搜索
- `Ctrl + P` - 快速打开文件
- `F12` - 跳转到定义
- `Alt + F12` - 查看定义
- `Shift + Alt + F` - 格式化代码
- `Ctrl + /` - 注释/取消注释
- `Alt + Shift + A` - 块注释

## 5 JavaScript 编码规范

### 5.1 编码风格

#### 5.1.1 缩进

- **强制** 使用 2 个空格缩进

  统一使用 2 个空格缩进，不要使用 4 个空格或 tab 缩进：

  ```js
  // bad
  function foo() {
      let name;
  }

  // good
  function foo() {
    let name;
  }
  ```

#### 5.1.2 分号

- **强制** 不使用分号

  根据项目 Prettier 配置，统一不使用分号结束语句：

  ```js
  // bad
  const luke = {};
  const leia = {};

  // good
  const luke = {}
  const leia = {}
  ```

#### 5.1.3 逗号

- **强制** 对于逗号分隔的多行结构，不使用行首逗号

  ```js
  // bad
  const story = [
      once
    , upon
    , aTime
  ];

  // good
  const story = [
    once,
    upon,
    aTime
  ];
  ```

- **强制** 对于逗号分隔的多行结构，不加上最后一个逗号

  根据项目 Prettier 配置 `"trailingComma": "none"`：

  ```js
  // bad
  const hero = {
    firstName: 'Dana',
    lastName: 'Scully',
  };

  // good
  const hero = {
    firstName: 'Dana',
    lastName: 'Scully'
  };
  ```

#### 5.1.4 块

- **推荐** 始终使用大括号包裹代码块

  ```js
  // bad
  if (foo)
    bar();
    baz(); // 这一行并不在 if 语句里

  // good
  if (foo) {
    bar();
    baz();
  }
  ```

#### 5.1.5 空格

- **强制** 空格风格

  块的左大括号 `{` 前有一个空格：

  ```js
  // bad
  function test(){
    console.log('test');
  }

  // good
  function test() {
    console.log('test');
  }
  ```

  控制语句（`if`、`while` 等）的左小括号 `(` 前有一个空格：

  ```js
  // bad
  if(isJedi) {
    fight();
  }

  // good
  if (isJedi) {
    fight();
  }
  ```

  小括号内部两侧无空格：

  ```js
  // bad
  function bar( foo ) {
    return foo;
  }

  // good
  function bar(foo) {
    return foo;
  }
  ```

  大括号内部两侧有空格：

  ```js
  // bad
  const foo = {clark: 'kent'};

  // good
  const foo = { clark: 'kent' };
  ```

  运算符两侧有空格：

  ```js
  // bad
  const x=y+5;

  // good
  const x = y + 5;
  ```

#### 5.1.6 空行

- **推荐** 在文件末尾保留一行空行

  ```js
  // good
  import { foo } from './Foo';
  // ...
  export default foo;

  ```

- **强制** 块的开始和结束不能是空行

  ```js
  // bad
  function bar() {

    console.log(foo);

  }

  // good
  function bar() {
    console.log(foo);
  }
  ```

#### 5.1.7 最大字符数

- **推荐** 单行最大字符数：100

  根据项目 Prettier 配置 `"printWidth": 100`：

  ```js
  // bad
  const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

  // good
  const foo = jsonData
    && jsonData.foo
    && jsonData.foo.bar
    && jsonData.foo.bar.baz
    && jsonData.foo.bar.baz.quux
    && jsonData.foo.bar.baz.quux.xyzzy;
  ```

### 5.2 语言特性

#### 5.2.1 变量声明

- **强制** 使用 const 或 let 声明变量

  ```js
  // bad
  var foo = 'foo';
  var bar;

  // good
  const foo = 'foo';
  let bar;
  ```

- **强制** 正确地使用 const 和 let

  声明变量时，应优先使用 `const`，只有当变量会被重新赋值时才使用 `let`：

  ```js
  // bad
  let flag = true;
  if (flag) {
    console.log(flag);
  }

  // good
  let flag = true;
  if (flag) {
    flag = false;
  }
  ```

- **强制** 一条声明语句声明一个变量

  ```js
  // bad
  const foo = 1,
        bar = 2;

  // good
  const foo = 1;
  const bar = 2;
  ```

#### 5.2.2 原始类型

- **强制** 不要使用 new Number/String/Boolean

  ```js
  // bad
  const num = new Number(0);
  const str = new String('foo');
  const bool = new Boolean(false);

  // good
  const num = 0;
  const str = 'foo';
  const bool = false;
  ```

- **推荐** 类型转换

  ```js
  // 数字转换
  const str = '1';
  const num = Number(str);
  const num2 = parseInt(str, 10);

  // 字符串转换
  const num = 1;
  const str = String(num);

  // 布尔值转换
  const age = 0;
  const hasAge = !!age;
  ```

#### 5.2.3 字符串

- **强制** 字符串优先使用单引号

  根据项目 Prettier 配置 `"singleQuote": true`：

  ```js
  // bad
  const name = "tod";
  const name = `tod`; // 模板字符串中应包含变量或换行，否则需用单引号

  // good
  const name = 'tod';
  ```

- **推荐** 使用模板字符串替代字符串拼接

  ```js
  // bad
  function getDisplayName({ nickName, realName }) {
    return nickName + ' (' + realName + ')';
  }

  // good
  function getDisplayName({ nickName, realName }) {
    return `${nickName} (${realName})`;
  }
  ```

#### 5.2.4 数组

- **强制** 使用字面量创建数组

  ```js
  // bad
  const a = new Array(1, 2, 3);
  const b = Array(1, 2, 3);

  // good
  const a = [1, 2, 3];
  ```

- **推荐** 使用扩展运算符 ... 处理数组

  ```js
  // 数组复制
  const array1 = [...array];

  // 数组拼接
  const array1 = [1, 2, ...array];

  // 替代 apply
  const args = [1, 2, 3, 4];
  Math.max(...args);
  ```

#### 5.2.5 对象

- **强制** 使用字面量创建对象

  ```js
  // bad
  const obj = new Object();

  // good
  const obj = {};
  ```

- **强制** 使用对象属性和方法的简写语法

  ```js
  const value = 'foo';

  // bad
  const atom = {
    value: value,
    addValue: function (value) {
      return value + ' added';
    }
  };

  // good
  const atom = {
    value,
    addValue(value) {
      return value + ' added';
    }
  };
  ```

- **推荐** 使用扩展运算符 ... 处理对象

  ```js
  // 对象浅拷贝
  const original = { a: 1, b: 2 };
  const copy = { ...original, c: 3 };

  // 获取排除某些属性的新对象
  const copy = { a: 1, b: 2, c: 3 };
  const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
  ```

#### 5.2.6 函数

- **强制** 不要用 Function 构造函数创建函数

  ```js
  // bad
  const sum = new Function('a', 'b', 'return a + b');

  // good
  const sum = (a, b) => (a + b);
  ```

- **强制** 使用箭头函数代替匿名函数

  ```js
  // bad
  [1, 2, 3].map(function (x) {
    const y = x + 1;
    return x * y;
  });

  // good
  [1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
  });
  ```

- **推荐** 箭头函数编码风格

  根据项目 Prettier 配置 `"arrowParens": "always"`：

  ```js
  // good - 参数始终加上小括号
  [1, 2, 3].map((number) => {
    const nextNumber = number + 1;
    return `A string containing the ${nextNumber}.`;
  });

  // good - 函数体只包含一条 return 语句时，可以省略大括号和 return
  [1, 2, 3].map((number) => `A string containing the ${number + 1}.`);
  ```

- **推荐** 使用默认参数语法

  ```js
  // bad
  const multiple = (a, b) => {
    a = a || 0;
    b = b || 0;
    return a * b;
  }

  // good
  const multiple = (a = 0, b = 0) => {
    return a * b;
  }
  ```

#### 5.2.7 类

- **推荐** 使用 class 语句声明类

  ```js
  // bad
  function Person() {
    this.age = 1;
  }
  Person.prototype.growOld = function () {
    this.age += 1;
  }

  // good
  class Person {
    constructor() {
      this.age = 1;
    }
    growOld() {
      this.age += 1;
    }
  }
  ```

#### 5.2.8 模块

- **推荐** 使用 ES6 modules

  ```js
  // bad
  const React = require('react');
  module.exports = React.Component;

  // good
  import React, { Component } from 'react';
  export default Component;
  ```

- **强制** 不要用多个 import 引入同一模块

  ```js
  // bad
  import React from 'react';
  import { Component } from 'react';

  // good
  import React, { Component } from 'react';
  ```

#### 5.2.9 操作符

- **推荐** 使用严格相等运算符

  ```js
  const id = '83949';

  // bad
  if (id == 83949) {
    // do something
  }

  // good
  if (Number(id) === 83949) {
    // do something
  }
  ```

- **强制** 不要使用一元自增自减运算符

  ```js
  let num = 1;

  // bad
  num++;
  --num;

  // good
  num += 1;
  num -= 1;
  ```

#### 5.2.10 控制语句

- **强制** switch 语句中的 case 需要以 break 结尾

  ```js
  // bad
  switch(foo) {
    case 1:
      doSomething();
    case 2:
      doSomethingElse();
    default:
      doSomething();
  }

  // good
  switch(foo) {
    case 1:
      doSomething();
      break;
    case 2:
      doSomethingElse();
      break;
    default:
      doSomething();
  }
  ```

### 5.3 注释

- **推荐** 单行注释使用 //

  ```js
  // bad
  const active = true;  // is current tab

  // good
  // is current tab
  const active = true;
  ```

- **推荐** 多行注释使用 /** ... */

  ```js
  // bad
  // make() returns a new element
  // based on the passed in tag name
  function make(tag) {
    // ...
    return element;
  }

  // good
  /**
   * make() returns a new element
   * based on the passed-in tag name
   */
  function make(tag) {
    // ...
    return element;
  }
  ```

- **强制** 注释内容和注释符之间需要有一个空格

  ```js
  // bad
  //is current tab
  const active = true;

  // good
  // is current tab
  const active = true;
  ```

### 5.4 命名

#### 5.4.1 文件夹命名

- **强制** 使用小写字母命名文件夹

  ```bash
  # bad
  components/
  UserProfile/
  user_profile/

  # good
  components/
  userprofile/
  user-profile/
  ```

- **推荐** 使用连字符（kebab-case）分隔单词

  ```bash
  # bad
  userprofile/
  user_profile/

  # good
  user-profile/
  user-auth/
  data-management/
  ```

- **强制** 避免使用中文、特殊字符和空格

  ```bash
  # bad
  用户管理/
  user management/
  user@profile/

  # good
  user-management/
  userprofile/
  user_profile/
  ```

#### 5.4.2 文件命名

- **强制** 使用小写字母命名文件

  ```bash
  # bad
  UserProfile.vue
  UserProfile.js
  USER_PROFILE.vue

  # good
  user-profile.vue
  userprofile.js
  userProfile.vue
  ```

- **推荐** 组件文件使用 PascalCase 命名

  ```bash
  # Vue 组件文件
  UserProfile.vue
  NavigationBar.vue
  ProductCard.vue

  # 页面组件文件
  HomePage.vue
  UserDetailPage.vue
  ```

- **推荐** 工具类、配置文件使用 kebab-case 命名

  ```bash
  # 工具类文件
  date-utils.js
  string-helper.js
  api-client.js

  # 配置文件
  eslint-config.js
  webpack.config.js
  vite.config.js
  ```

- **推荐** 样式文件使用 kebab-case 命名

  ```bash
  # 样式文件
  main-style.css
  component-styles.scss
  global-variables.css
  ```

- **强制** 文件扩展名使用小写

  ```bash
  # bad
  UserProfile.VUE
  config.JS
  style.CSS

  # good
  UserProfile.vue
  config.js
  style.css
  ```

#### 5.4.3 变量和函数命名

- **强制** 使用小驼峰（camelCase）命名原始类型、对象、函数、实例

  ```js
  // bad
  const this_is_my_string = 'foo';
  const this_is_my_object = {};
  function this_is_my_function() {}

  // good
  const thisIsMyString = 'foo';
  const thisIsMyObject = {};
  function thisIsMyFunction() {}
  ```

- **强制** 使用大驼峰（PascalCase）命名类和构造函数

  ```js
  // bad
  function user(options) {
    this.name = options.name;
  }

  // good
  class User {
    constructor(options) {
      this.name = options.name;
    }
  }
  ```

- **强制** 命名不要以下划线开头或结尾

  ```js
  // bad
  this.__firstName__ = 'Panda';
  this.firstName_ = 'Panda';
  this._firstName = 'Panda';

  // good
  this.firstName = 'Panda';
  ```

#### 5.4.4 常量命名

- **推荐** 常量使用 UPPER_SNAKE_CASE 命名

  ```js
  // 全局常量
  const API_BASE_URL = 'https://api.example.com';
  const MAX_RETRY_COUNT = 3;
  const DEFAULT_TIMEOUT = 5000;

  // 枚举值
  const USER_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending'
  };
  ```

#### 5.4.5 组件命名

- **强制** Vue 组件使用 PascalCase 命名

  ```js
  // 组件定义
  export default {
    name: 'UserProfile',
    // ...
  }

  // 组件使用
  <UserProfile />
  <user-profile />
  ```

- **推荐** 页面组件以 Page 结尾

  ```js
  // 页面组件
  HomePage.vue
  UserDetailPage.vue
  ProductListPage.vue
  ```

- **推荐** 功能组件以功能描述命名

  ```js
  // 功能组件
  NavigationBar.vue
  ProductCard.vue
  SearchInput.vue
  ModalDialog.vue
  ```

## 6 CSS 编码规范

### 6.1 Stylelint 配置

项目根目录下 `stylelint.config.js`：

```javascript
module.exports = {
  root: true,                        // 标记为根配置文件，停止向上查找其他配置文件
  plugins: ['stylelint-order'],      // 使用 stylelint-order 插件来规范 CSS 属性顺序
  customSyntax: 'postcss-html',      // 使用 postcss-html 语法解析器支持 Vue 单文件组件
  extends: ['stylelint-config-standard'], // 继承 stylelint 标准配置
  rules: {
    // 允许未知的伪类选择器（用于 Vue 的 :deep 和 :global）
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'deep']
      }
    ],
    // 允许未知的 at 规则（用于 Sass/Less 等预处理器）
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin', 'extend']
      }
    ],
    'media-query-no-invalid': null,  // 关闭媒体查询无效检查
    'function-no-unknown': null,     // 关闭未知函数检查
    'no-empty-source': null,         // 允许空样式文件
    'named-grid-areas-no-invalid': null, // 关闭网格区域名称无效检查
    'no-descending-specificity': null,   // 关闭选择器特异性降序检查
    'font-family-no-missing-generic-family-keyword': null, // 关闭字体族缺少通用关键字检查
    
    // 规则前空行配置
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'] // 注释后和第一个嵌套规则前不强制空行
      }
    ],
    // 允许未知单位（用于小程序 rpx 单位）
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx']
      }
    ],
    // CSS 属性顺序配置
    'order/order': [
      [
        'dollar-variables',          // Sass 变量
        'custom-properties',         // CSS 自定义属性
        'at-rules',                  // @ 规则
        'declarations',              // 普通声明
        {
          type: 'at-rule',
          name: 'supports'           // @supports 规则
        },
        {
          type: 'at-rule',
          name: 'media'              // @media 规则
        },
        'rules'                      // 嵌套规则
      ],
      {
        severity: 'warning'          // 设置为警告级别
      }
    ],
    // CSS 属性详细顺序配置
    'order/properties-order': [
      'position',                    // 定位属性
      'top', 'right', 'bottom', 'left', 'z-index',
      'display', 'float',            // 布局属性
      'width', 'height', 'max-width', 'max-height', 'min-width', 'min-height',
      'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', // 内边距
      'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', // 外边距
      'margin-collapse', 'margin-top-collapse', 'margin-right-collapse', 'margin-bottom-collapse', 'margin-left-collapse',
      'overflow', 'overflow-x', 'overflow-y', 'clip', 'clear', // 溢出和清除
      'font', 'font-family', 'font-size', 'font-smoothing', 'osx-font-smoothing', 'font-style', 'font-weight', 'hyphens', 'src', // 字体
      'line-height', 'letter-spacing', 'word-spacing', // 文本间距
      'color', 'text-align', 'text-decoration', 'text-indent', 'text-overflow', 'text-rendering', 'text-size-adjust', 'text-shadow', 'text-transform', // 文本样式
      'word-break', 'word-wrap', 'white-space', 'vertical-align', // 文本换行和对齐
      'list-style', 'list-style-type', 'list-style-position', 'list-style-image', // 列表样式
      'pointer-events', 'cursor', // 交互
      'background', 'background-attachment', 'background-color', 'background-image', 'background-position', 'background-repeat', 'background-size', // 背景
      'border', 'border-collapse', 'border-top', 'border-right', 'border-bottom', 'border-left', // 边框
      'border-color', 'border-image', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color', // 边框颜色
      'border-spacing', 'border-style', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style', // 边框样式
      'border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width', // 边框宽度
      'border-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius', 'border-top-left-radius', // 圆角
      'border-radius-topright', 'border-radius-bottomright', 'border-radius-bottomleft', 'border-radius-topleft',
      'content', 'quotes', // 内容
      'outline', 'outline-offset', // 轮廓
      'opacity', 'filter', 'visibility', // 透明度、滤镜、可见性
      'size', 'zoom', // 尺寸和缩放
      'transform', // 变换
      'box-align', 'box-flex', 'box-orient', 'box-pack', // 弹性盒子
      'box-shadow', 'box-sizing', // 阴影和盒模型
      'table-layout', // 表格布局
      'animation', 'animation-delay', 'animation-duration', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'animation-fill-mode', // 动画
      'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', // 过渡
      'background-clip', 'backface-visibility', // 背景裁剪和背面可见性
      'resize', 'appearance', 'user-select', // 调整大小、外观、用户选择
      'interpolation-mode', 'direction', 'marks', 'page', 'set-link-source', 'unicode-bidi', 'speak' // 其他属性
    ]
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'], // 忽略 JavaScript/TypeScript 文件
  overrides: [
    {
      files: ['*.vue', '**/*.vue', '*.html', '**/*.html'], // 针对 Vue 和 HTML 文件的特殊配置
      extends: ['stylelint-config-recommended', 'stylelint-config-html'], // 继承推荐配置和 HTML 配置
      rules: {
        'keyframes-name-pattern': null, // 关闭关键帧名称模式检查
        'selector-class-pattern': null, // 关闭类选择器模式检查
        'no-duplicate-selectors': null, // 关闭重复选择器检查
        // Vue 深度选择器支持
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['deep', 'global']
          }
        ],
        // Vue 伪元素支持
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted']
          }
        ]
      }
    }
  ]
}
```

### 6.2 CSS 编码风格

![示例代码标注图](https://img.alicdn.com/tfs/TB1TOLiTpP7gK0jSZFjXXc5aXXa-753-427.svg)

上图是一张符合规约要求编码风格的速览图，详细规则如下：

#### 6.2.1 基础编码规范

- **强制** 所有声明都应该以分号结尾，不能省略

  ```css
  /* bad */
  .selector {
    margin-top: 10px;
    padding-left: 15px
  }

  /* good */
  .selector {
    margin-top: 10px;
    padding-left: 15px;
  }
  ```

- **推荐** 使用 2 个空格缩进，不要使用 4 个空格或 tab 缩进

  ```css
  /* bad */
  .selector {
      padding-left: 15px;
  }

  /* good */
  .selector {
    padding-left: 15px;
  }
  ```

- **推荐** 选择器和 `{` 之间保留一个空格

  ```css
  /* bad */
  .selector{
    padding-left: 15px;
  }

  /* good */
  .selector {
    padding-left: 15px;
  }
  ```

- **推荐** 属性名和 `:` 之前无空格，`:` 和属性值之间保留一个空格

  ```css
  /* bad */
  .selector {
    margin-top : 10px;
    padding-left:15px;
  }

  /* good */
  .selector {
    margin-top: 10px;
    padding-left: 15px;
  }
  ```

- **推荐** `>`、`+`、`~` 等组合器前后各保留一个空格

  ```css
  /* bad */
  .selector>.children {
    padding-left: 15px;
  }
  .selector+.brother {
    padding-left: 15px;
  }

  /* good */
  .selector > .children {
    padding-left: 15px;
  }
  .selector + .brother {
    padding-left: 15px;
  }
  ```

- **推荐** 在使用 `,` 分隔的属性值中，`,` 之后保留一个空格

  ```css
  /* bad */
  .selector {
    background-color: rgba(0,0,0,0.5);
    box-shadow: 0px 1px 2px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.5);
  }

  /* good */
  .selector {
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
  ```

- **推荐** 注释内容和注释符之间留有一个空格

  ```css
  /* bad */
  .selector {
    /*comment*/
    /*  comment  */
    /**
     *comment
     */
    padding-left: 15px;
  }

  /* good */
  .selector {
    /* comment */
    /**
     * comment
     */
    padding-left: 15px;
  }
  ```

- **推荐** 声明块的右大括号 `}` 应单独成行

  ```css
  /* bad */
  .selector {
    padding-left: 15px;}

  /* good */
  .selector {
    padding-left: 15px;
  }
  ```

- **推荐** 属性声明应单独成行

  ```css
  /* bad */
  .selector {
    padding-left: 15px;  margin-left: 10px;
  }

  /* good */
  .selector {
    padding-left: 15px;
    margin-left: 10px;
  }
  ```

- **推荐** 单行代码最多不要超过 100 个字符

  ```css
  /* bad */
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.04, rgb(88, 94, 124)), color-stop(0.52, rgb(115, 123, 162)));

  /* good */
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.04, rgb(88, 94, 124)),
    color-stop(0.52, rgb(115, 123, 162))
  );
  ```

- **参考** 使用多个选择器时，每个选择器应该单独成行

  ```css
  /* bad */
  .selector, .selector-secondary, .selector-third {
    padding: 15px;
    margin-bottom: 15px;
  }

  /* good */
  .selector,
  .selector-secondary,
  .selector-third {
    padding: 15px;
    margin-bottom: 15px;
  }
  ```

- **参考** 声明块内只有一条语句时，也应该写成多行

  ```css
  /* bad */
  .selector { padding-left: 15px; }

  /* good */
  .selector {
    padding-left: 15px;
  }
  ```

- **参考** 注释行上方需留有一行空行，除非上一行是注释或块的顶部

  ```css
  /* bad */
  .selector {

    /* comment */
    padding-left: 15px;
    /* comment */
    padding-right: 15px;
  }

  /* good */
  .selector {
    /* comment */
    padding-left: 15px;

    /* comment */
    padding-right: 15px;
  }
  ```

#### 6.2.2 选择器规范

- **参考** 不要使用 id 选择器

  id 会带来过高的选择器优先级，使得后续很难进行样式覆盖。

  ```css
  /* bad */
  .normal {
    padding: 10px;
  }
  #special {
    padding: 15px;
  }

  /* good */
  .normal {
    padding: 10px;
  }
  .normal.special {
    padding: 15px;
  }
  ```

- **参考** 属性选择器的值始终用双引号包裹

  ```css
  /* bad */
  input[type=text] {
    height: 20px;
  }

  /* good */
  input[type="text"] {
    height: 20px;
  }
  ```

- **参考** 使用 CSS 选择器时，应注意以下性能问题：

  - 使用 class 而不是原生元素标签
  - 减少在经常出现的组件中使用个别属性选择器（如 `[class^="..."]`）
  - 控制选择器的长度，每个组合选择器内的条目尽量不超过 3 个

  > 只从效率的角度来看，CSS 选择器从高（高效率）到低（低效率）的顺序是：
  >
  > - ID 选择器， 比如 `#header`
  > - 类选择器，比如 `.header`
  > - 标签（元素）选择器，比如 `div`
  > - 相邻兄弟选择器，比如 `h2 + p`
  > - 子选择器，比如 `ul > li`
  > - 后代选择器，比如 `ul a`
  > - 通配符选择器，比如 `*`
  > - 属性选择器，比如 `[class^="grid-"]`
  > - 伪类（伪元素）选择器，比如 `a:hover`、`a::before`

#### 6.2.3 选择器命名

- **强制** 使用 kebab-case 命名类选择器

  ```css
  /* bad */
  .userProfile { }
  .user_profile { }
  .UserProfile { }

  /* good */
  .user-profile { }
  .user-avatar { }
  .navigation-bar { }
  ```

- **推荐** 使用 BEM 命名规范

  ```css
  /* Block */
  .card { }

  /* Element */
  .card__title { }
  .card__content { }

  /* Modifier */
  .card--featured { }
  .card__title--large { }
  ```

#### 6.2.4 属性和属性值

- **推荐** 使用尽可能短的十六进制值

  ```css
  /* bad */
  .selector {
    color: #ffffff;
  }

  /* good */
  .selector {
    color: #fff;
  }
  ```

- **推荐** 不要使用 !important 重写样式

- **推荐** 十六进制值统一使用小写字母

  ```css
  /* bad */
  .selector {
    color: #FEFEFE;
  }

  /* good */
  .selector {
    color: #fefefe;
  }
  ```

- **推荐** 长度值为 0 时，省略掉长度单位

  ```css
  /* bad */
  .selector {
    margin-top: 0px;
    font-size: 0em;
  }

  /* good */
  .selector {
    margin-top: 0;
    font-size: 0;
  }
  ```

- **参考** 保留小数点前的 0

  ```css
  /* bad */
  .selector {
    opacity: .5;
    left: -.5px;
  }

  /* good */
  .selector {
    opacity: 0.5;
    left: -0.5px;
  }
  ```

- **推荐** 适时使用简写属性

  ```css
  /* bad */
  .selector {
    margin: 0 0 10px;
  }

  /* good */
  .selector {
    margin-bottom: 10px;
  }
  ```

#### 6.2.5 属性顺序

- **强制** 按照 Stylelint 配置的属性顺序排列

  相关联的属性声明最好写成一组，并按如下顺序排序：

  1. **定位**：如 position、left、right、top、bottom、z-index
  2. **盒模型**：如 display、float、width、height、margin、padding、border
  3. **文字排版**：如 font、color、line-height、text-align
  4. **外观**：如 background
  5. **其他属性**

  ```css
  /* good - 按照配置的顺序 */
  .example {
    /* 定位 */
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;

    /* 盒模型 */
    display: flex;
    width: 100px;
    height: 100px;
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;

    /* 文字排版 */
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    text-align: center;

    /* 外观 */
    background-color: #fff;

    /* 其他 */
    opacity: 1;
    transform: translateX(10px);
  }
  ```

#### 6.2.6 其他规范

- **推荐** 不要使用 CSS 的 @import

  与 `<link>` 相比，`@import` 会在关键渲染路径上增加更多的往返，这样会导致浏览器处理 CSS 文件速度变慢。

  ```css
  <!-- bad -->
  <style>
    @import url("more.css");
  </style>

  <!-- good -->
  <link rel="stylesheet" href="more.css">
  ```

### 6.3 Sass 和 Less 规范

> 对于 CSS 而言，可以在新项目中尝试放弃使用 Sass、Less 这样的处理器语言，因为：
>
> * 这些处理器语言是在一定历史条件下的产物，虽然这些产物在一定程度上提高开发者的开发效率，但不同的处理器语言也同时增加了项目的维护成本（特别是多人协作，多团队协作的时候）。
> * 更建议使用 PostCSS 处理器，它类似于 CSS 中的 Babel，不但具备 Sass 和 Less 的功能，而且社区繁荣，同时还可以根据自己的需求扩展相关的插件。
> * 随着 CSS 的一些新特性出现，Sass 和 Less 以往的优势也会慢慢消失。

#### 6.3.1 基础规范

- **推荐** 四则运算符两侧各保留一个空格

  ```css
  /* bad */
  .selector {
    width: $default-width/2;
  }

  /* good */
  .selector {
    width: $default-width / 2;
  }
  ```

- **推荐** Mixin 名称和括号 `()` 间无空格，在拥有多个参数的表达式中， `,` 之前无空格，`,` 之后保留一个空格

  ```css
  /* bad */
  .selector {
    .size(30px,20px);
    .clearfix ();
  }

  /* good */
  .selector {
    .size(30px, 20px);
    .clearfix();
  }
  ```

#### 6.3.2 代码组织

- **推荐** 按如下顺序组织 Sass / Less 代码：

  - `@import` 语句
  - 全局变量声明
  - 样式声明

  ```css
  @import 'common/theme.scss';

  $color-red: #f0f0f0;

  .selector {
    color: $color-red;
  }
  ```

- **推荐** 对于 Sass 和 Less，块内的属性声明按如下顺序排序：

  - 标准属性声明：除了 mixin 调用、extend 子级选择器的声明，其他属性声明的顺序与「属性声明的顺序」章节的规则一致
  - mixin 调用：Sass 的 `@include` 声明、Less 的 mixin 调用
  - 嵌套的子级选择器：将嵌套的选择器放到块的末尾，并且在其上方保留一行空行

  ```css
  .btn {
    background: #ccc;
    font-weight: bold;
    @include transition(background 0.5s ease);

    .icon {
      margin-right: 10px;
    }
  }
  ```

#### 6.3.3 嵌套规范

- **推荐** 嵌套选择器的深度不要超过 3 层，否则可能带来一些副作用：

  - 与 HTML 结构强耦合，难以复用
  - 过高的选择器优先级

  ```css
  .container {
    .header {
      .user-name {
        // STOP！不要再嵌套更深选择器
      }
    }
  }
  ```

#### 6.3.4 注释规范

- **推荐** 可以使用双斜杠注释。但需要注意的是，编译为 CSS 后，代码中的双斜杠注释会被删除，而 `/* */` 会被保留。

  ```css
  // 单行注释
  .selector-a {
    padding-left: 15px;
  }

  /*
   * 多行注释
   * 多行注释
   */
  .selector-b {
    margin-left: 15px;
  }
  ```

  编译为 CSS 后，双斜杠注释会被删除：

  ```css
  .selector-a {
    padding-left: 15px;
  }

  /*
   * 多行注释
   * 多行注释
   */
  .selector-b {
    margin-left: 15px;
  }
  ```

#### 6.3.5 Mixin 使用

- **推荐** 使用 Mixin (@mixin 和 @include 指令) 来让代码遵循 DRY 原则（Don't Repeat Yourself）、增加抽象性和降低复杂度。

  应避免使用 @extend 指令，它不够直观且具有潜在风险，尤其是在嵌套选择器中。即使继承的是顶层选择器，如果选择器的顺序发生变化，也可能引起问题（比如，如果它们存在于其他文件，而加载顺序发生了变化）。

  Extend 相比 Mixin 的好处是，如果无参数的 mixin 被多处使用，编译后会输出多段重复的代码。这时如果使用 @extend，可以避免这个问题。但是 gzip 等压缩工具就可以解决重复代码的问题，因此大多数情况下，你只需要使用 mixin 来让代码符合 DRY 原则。

### 6.4 Vue 单文件组件样式

#### 6.4.1 作用域样式

- **推荐** 使用 scoped 属性

  ```vue
  <style scoped>
  .user-profile {
    padding: 20px;
  }
  </style>
  ```

#### 6.4.2 深度选择器

- **推荐** 使用 :deep() 语法

  ```vue
  <style scoped>
  .parent {
    color: red;
  }

  .parent :deep(.child) {
    color: blue;
  }
  </style>
  ```

#### 6.4.3 全局样式

- **推荐** 使用 :global() 语法

  ```vue
  <style>
  :global(.global-class) {
    color: green;
  }
  </style>
  ```

### 6.5 响应式设计

#### 6.5.1 媒体查询

- **推荐** 使用移动优先的方法

  ```css
  /* 基础样式（移动端） */
  .container {
    width: 100%;
    padding: 10px;
  }

  /* 平板端 */
  @media (min-width: 768px) {
    .container {
      width: 750px;
      margin: 0 auto;
    }
  }

  /* 桌面端 */
  @media (min-width: 1024px) {
    .container {
      width: 1000px;
    }
  }
  ```

#### 6.5.2 弹性布局

- **推荐** 使用 Flexbox 和 Grid

  ```css
  /* Flexbox 布局 */
  .flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* Grid 布局 */
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  ```

## 7 Vue 开发规范

### 7.1 开发前约束

- **强制** VSCode 插件，以及husky钩子准备（上述），git pull 模式统一成 rebase 或默认的 merge 模式。

### 7.2 组件及文件夹命名规范

- **强制** 参考上述规则

### 7.3 组件属性配置

- **强制** 每个 SFC 组件，都需要有其 name 属性。name 用处：

  - 在组件自己的模板中递归引用自己时
  - 在 Vue 开发者工具中的组件树显示时
  - 在组件抛出的警告追踪栈信息中显示时
  - 使用 KeepAlive，通过该属性来匹配需要缓存的组件时

### 7.4 路由命名规范

- **强制** vue-router 的 route name 命名规则通常是使用首字母大写驼峰或 kebab-case（短横线分隔式）。例如，`MyRoute` 或 `my-route`。

### 7.5 样式规范

- **强制** 为组件样式去设置 scope 作用域，修改 UI 框架的相关 CSS 代码在全局 styles 里面去进行样式重写(@public/styles/index.scss)。

- **强制** 颜色等样式变量，尽量使用 CSS 变量或者 element-plus 的变量，与设计沟通必要情况下在 `var.css` 中自定义 CSS 变量，避免损坏切换颜色、字体、主题的系统功能。

### 7.6 数据流规范

- **强制** 不得破坏 Vue 的单向数据流，举例：子组件修改父组件 prop 传过来的值。通常情况下，可以使用 v-model 配合 computed set 组合去修改适配上述场景，或者使用本地状态，一次性的 emit 修改父属性去处理。

### 7.7 API 使用规范

- **推荐** 使用组合式 API、避免选项式 API，使用第三方库等时，尽量选择按需引入的，如 lodash-es 和 lodash 选择 lodash-es，最大化 tree-shaking 的效果。

- **推荐** 处理函数异步使用 async + await，并且用上 try catch 去捕获错误。

### 7.8 生命周期规范

- **推荐** 不要在 onMounted 钩子上去调用异步后端接口，理论上这个钩子只处理跟 DOM 相关的逻辑，由于 setup 语法糖可以完成 Vue2 created 钩子的工作，因此在 setup 中直接调用后端异步接口即可。

### 7.9 响应式数据规范

- **推荐** 在对 Vue3 响应式和 reactive 了解不深的情况下，统一使用 ref 去进行响应式定义。比如：

  - 当你对 reactive 创建的响应式对象进行解构操作时，你会丢失响应性
  - 与解构类似，如果你对 reactive 创建的响应式对象进行展开操作（例如，使用 ... 操作符创建一个新对象），也会丢失响应性
  - 如果你使用 toRefs 或 toRaws 之类的函数将 reactive 创建的响应式对象转换为普通对象，也会丢失响应性

- **推荐** 减少大型不可变数据的响应性开销，如处理表格渲染时不关注，数组对象里面对象 key 值的变化，只需要初始赋值渲染，可以使用 shallowRef 去替代 ref，这样可以减少大量的响应性开销。

### 7.10 异步处理规范

- **推荐** 多个请求并发时，尽量用 Promise.allSettled 替代 Promise.all，Promise.allSettled 会将成功和失败的结果都返回，可以更好的处理失败的情况。

### 7.11 内存管理规范

- **推荐** 避免内存泄漏，在组件 onUnmounted 中往往需要给 bus.on，定时器等代码给上终止的操作。

### 7.12 TypeScript 规范

- **推荐** 公共组件或者重要模块需要严格配置 TS，一是静态检查，二是方便他人阅读。

### 7.13 代码分割规范

- **推荐** 灵活使用代码分割，如在 vue-router 上，如使用 defineAsyncComponent 按需加载组件上，如方法里：

  ```js
  return import('./lazy.js')
  ```

  加载 js 上，以上方式都会让打包被拆分到一个单独的文件中，只在调用或渲染时才被加载，可以有效减少打包体积，加快单页或者首页的加载速度。

### 7.14 Props 优化规范

- **推荐** 保持 props 的稳定，在 Vue 之中，一个子组件只会在其至少一个 props 改变时才会更新，比如 `:active-id="activeId"` 可用 `:active="item.id === activeId"` 取代，保持 props 的稳定，可以避免不必要的更新。

### 7.15 渲染优化规范

- **推荐** 灵活使用 v-memo，如渲染海量 v-for 列表，当组件的 selected 状态改变，默认会重新创建大量的 vnode，尽管绝大部分都跟之前是一模一样的，这时可使用：

  ```vue
  <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
  ```

  来优化渲染。
