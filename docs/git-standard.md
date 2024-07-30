# Git 规约

以下是对 git 代码仓库管理、commit message 编写的一些规范。

## git 代码仓库管理

基于 Git Flow 工作流，略加改造制定的一套分支模型。采用 Git Flow 的主要思想,即为不同的目的设定不同的分支，包括主分支、仿真分支、功能分支、发布分支和修复分支。

介绍分支模型前的准备工作：
1. 首先，设置仓库保护分支，以下模型需设master、rc俩分支为受保护分支，允许合并者为maintainer，
  允许推送者为 No one即不允许任何人直接推送代码到者俩分支
2. 其次，如果你的合并请求需要不需要merge commit，即每一条commit都是干净的，对应某个功能或者bugfix而不需要
  git 自动生成的，可以在Merge request中设置Merge method为Fase-forward merge，这样可以保证commit历史记录的清晰和完整。(建议设置)
3. 若采取了第二种 commit 清晰模式，那你则需要再设置Git pull，使其模式为rebase模式，git config pull.rebase true，当你运行 git pull 命令时，Git 会执行 git fetch 后跟 git rebase，将当前分支的提交应用到远程分支的更新之上，而不是创建一个新的合并提交。

(ps:上述2、3点建立在对rebase有足够了解的情况下，使用 rebase 模式的优点是它可以保持你的 Git 历史记录更加清晰和线性。但是，如果你不熟悉 rebase 的工作方式，你可能会遇到一些复杂的问题，例如合并冲突。因此，在使用 rebase 模式之前，确保你理解了它的工作原理和可能的风险)

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

5.可综合代码质量与效率的考虑，去进行代码评审的人员分配，通常建议mr需要一半以上开发人员review、fix commen、approve后才可合并回rc

6.若rc上commit log与dev上commit log相差很大，通常为准备发准生产时，合并回rc后与dev相差较大，
  此时可知会组内人员，push origin --delete删除远程dev分支，于最新rc上checkout出一个新的dev
  更新到远程origin上。此时不需上rc需上dev的分支需再次merge一遍。

7.推荐gitlab管理上对master和rc只支持mr合并，no one push推送

针对以上git flow的管理，举例几个常见现象

1.出现紧急线上bug、需从master checkout 出一个hotfix的分支，与上面解决bug问题，dev merge后
  更新dev环境去验证修复，修复无误后直接mr合并到master上（合并完成后rc分支需及时 rebase master）

2.一周内需上线的功能或者bug或者优化，从rc上checkout分支出来，于上面修改，
  修改完成后于dev merge在dev上验证，验证无误后提mr 合并回rc。

3.多周的功能，从rc上checkout分支出来，于上面开发修改，只在dev merge后提到dev去
  验证修复，等到需要更新时再去提mr合并到rc。
````