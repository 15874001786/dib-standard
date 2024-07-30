# Git 规约

以下是对 git 代码仓库管理、commit message、版本发布 编写的一些规范。

## git 代码仓库管理

基于 Git Flow 工作流，略加改造制定的一套分支模型。采用 Git Flow 的主要思想,即为不同的目的设定不同的分支，包括主分支、仿真分支、功能分支、发布分支和修复分支。

介绍分支模型前的准备工作：
1. 首先，设置仓库保护分支，以下模型需设master、rc俩分支为受保护分支，允许合并者为maintainer，
  允许推送者为 No one即不允许任何人直接推送代码到者俩分支
2. 其次，如果你的合并请求需要不需要merge commit，即每一条commit都是干净的，对应某个功能或者bugfix而不需要
  git 自动生成的，可以在Merge request中设置Merge method为Fase-forward merge，这样可以保证commit历史记录的清晰和完整。(建议设置)
3. 若采取了第二种 commit 清晰模式，那你则需要再设置Git pull，使其模式为rebase模式，git config pull.rebase true，当你运行 git pull 命令时，Git 会执行 git fetch 后跟 git rebase，将当前分支的提交应用到远程分支的更新之上，而不是创建一个新的合并提交。

(ps:上述2、3点建立在对rebase有足够了解的情况下，使用 rebase 模式的优点是它可以保持你的 Git 历史记录更加清晰和线性。但是，如果你不熟悉 rebase 的工作方式，你可能会遇到一些复杂的问题，例如合并冲突。因此，在使用 rebase 模式之前，确保你理解了它的工作原理和可能的风险)

### 分支模型介绍

````md
1.master为生产稳定分支，要做到无论何时，master上的代码都是稳定可靠、能发生产的。

2.rc为仿真环境分支，用于更新仿真环境，通常为在dev上测试验收无误之后提mr代码评审后合并回rc分支
  的代码所发的环境分支，为发生产前的测试全量回归环境，

3.dev为开发分支，用于更新开发环境，如功能分支或修复分支开发完成后，切到dev分支，执行
  dev merge feature/xxx，将你分支的commit merge到了 dev上，更新开发环境，给测试验收。
  因此dev分支可以说是脏分支，有着各种开发、问题修复以及测试的功能在上面，仅限测试。

4.功能分支或修复分支都应从rc分支checkout出来，改动完成后在dev上 merge它们，更新dev环境
  供测试验证，验证无误，在gitlab上提一个mr合并回rc分支，提mr的时候可以指派人，
  指派给本周发版负责人

5.可综合代码质量与效率的考虑，去进行代码评审的人员分配，通常建议mr需要一半以上开发人员
  review、在修复完所有的comment，开发人员大部分都approve后才可由owner合并回rc

6.在gitlab管理上master和rc应只支持mr合并，无人可直接推送
````

### 敏捷迭代流程

````
1.迭代的开始阶段，rc，master，dev分支应皆是同步的，即rc和Master保持commit一致，dev应是
  从最新rc checkout -b 出来的
2.开发人员从rc分支切出自己的feature 或者 fix分支
3.开发人员在feature或fix分支上开发，开发完成后，切到dev分支，merge自己的feature或fix分支，
  把改动的内容commit合并到dev分支上
4.合并到dev上后，发布开发测试环境，供测试验收
5.待测试验收通过，开发人员将自己的feature或fix分支在gitlab上提mr合并回rc分支，指派给仓库owner，
  待代码评审通过，由owner合并回rc
6.待大部分发版需要的功能或fix bug内容合并回rc后，由rc发布仿真环境
7.仿真环境验收无误后，由rc提mr合并回Master，master发布最终迭代产物
````

### 常见问题
#### 1.出现紧急bug如何做？

出现紧急线上bug、需从master checkout 出一个hotfix的分支，与上面解决bug问题，dev merge后更新dev环境去验证修复，修复无误后直接mr合并到master上（合并完成后rc分支需及时 rebase master）

#### 2.一周内上线的功能/优化/bug如何做？

一周内需上线的功能或者bug或者优化，从rc上checkout分支出来，于上面修改，修改完成后于dev merge在dev上自测验证，自测验证通过后，合并到dev分支，测试和业务人员进行测试验证，验证无误后提mr 合并回rc。

#### 3.多周开发的功能如何做？

多周的功能，从rc上checkout分支出来，于上面开发修改，在dev merge后提到dev去联调和自测，自测通过后，合并到test分支，测试和业务人员进行测试，测试通过后，等到需要更新时再去提mr合并到rc。

#### 4.什么情况下需要重置dev分支

若rc上commit log与dev上commit log相差很大，通常为准备发准生产时，合并回rc后与dev相差较大(因为commit合并的关系)，此时需知会组内人员，push origin --delete删除远程dev分支，于最新rc上checkout出一个新的dev 更新到远程origin上。此时不需上rc需上dev的分支需再次merge一遍。

#### 5.如何合并commit记录

可在gitlab上线上合并，也可以在本地rebase -i合并成一条后提交上去，建议本地合并
https://www.cnblogs.com/vow007/p/18114699

## git 提交日志格式规约
基本的 message 格式

```
<type>[optional scope]: <subject>
[optional body]
[optional footer(s)]
```
其中 message header（即首行）必选，scope、body 和 footer 可选。

#### 1.字数限制

●header（首行）：只有一行，不超过 50 个字符

●body：每行不超过 72 个字符

●footer：每行不超过 72 个字符

#### 2.message header

type 用来描述本次提交的改动类型，可选值及对应含义如下：

●feat: 新增功能


●fix: 修复 bug

●docs: 文档相关的改动

●style: 对代码的格式化改动，代码逻辑并未产生任何变化(例如代码缩进，分号的移除和添加)

●test: 新增或修改测试用例

●refactor: 重构代码或其他优化举措

●chore: 项目工程方面的改动，代码逻辑并未产生任何变化

●revert: 恢复之前的提交

scope 用来描述本次提交所涉及到的改动范围（例如文书模块、中台模块）

subject 用来概括和描述本次提交的改动内容

#### 3.message body

日志的内容主体 body 用来描述详细的提交内容，可写可不写，需注意以下几点：

1.时态方面使用一般现在时，不要用过去时态。

2.句式视情况而定，一般使用祈使句式。

3.标点方面遵循一般的文档格式规约。

#### 4.message footer

footer 通常用于代码评审过程记录、作者签名等。例如：
```
Reported-by: User1 <user1@example.com>
Helped-by: User2 <user2@example.com>
Reviewed-by: User3 <user3@example.com>
Signed-off-by: Author <author@example.com>
```
## 版本发布，git tag命名规约
git tag 就是通过语义化的名称来给仓库标注一个个具体的节点。与此同时还可以根据标签名称来大致了解当前项目的兼容性和迭代情况。

命名格式为 v{semver}，semver是遵循https://semver.org/lang/zh-CN/的版本号，例如 v1.2.3。

版本号约定 vX.Y.Z
如带特殊环境如beta环境 则vX.Y.Z-beta.1

理论上敏捷迭代过程中，只有迭代结束上线的tag和迭代过程中的热补丁bug
针对迭代结束的上线tag 酌情考虑版本号是修改X还是Y具体参考上述的链接文章
针对热补丁bug 则在上周敏捷迭代的tag基础上Z+1

tag标签发布时，需要在message中严格记录下此tag的发布内容列表。另外，可以维护一个文档中心，文档中心md形式记录下tag号，时间，发布内容等。在tag标签发布说明中，给入文档中心的md或者链接地址(gitlab的标签发行说明支持md文件的拖动记录)

## 工具
可结合husky配合commitlint去校验commit的规范，

可使用git-flow-avh去增强git flow的使用校验
