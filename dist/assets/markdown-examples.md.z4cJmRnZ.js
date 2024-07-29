import{_ as s,c as a,o as i,a2 as n}from"./chunks/framework.Cj9us_ix.js";const g=JSON.parse('{"title":"Git 规约","description":"","frontmatter":{},"headers":[],"relativePath":"markdown-examples.md","filePath":"markdown-examples.md"}'),e={name:"markdown-examples.md"},l=n(`<h1 id="git-规约" tabindex="-1">Git 规约 <a class="header-anchor" href="#git-规约" aria-label="Permalink to &quot;Git 规约&quot;">​</a></h1><p>以下是对 git 代码仓库管理、commit message 编写的一些规范。</p><h2 id="git-代码仓库管理" tabindex="-1">git 代码仓库管理 <a class="header-anchor" href="#git-代码仓库管理" aria-label="Permalink to &quot;git 代码仓库管理&quot;">​</a></h2><p>基于 Git Flow 工作流，略加改造制定的一套分支模型。采用 Git Flow 的主要思想,即为不同的目的设定不同的分支，包括主分支、仿真分支、功能分支、发布分支和修复分支。</p><p>介绍分支模型前的准备工作：</p><ol><li>首先，设置仓库保护分支，以下模型需设master、rc俩分支为受保护分支，允许合并者为maintainer， 允许推送者为 No one即不允许任何人直接推送代码到者俩分支</li><li>其次，如果你的合并请求需要不需要merge commit，即每一条commit都是干净的，对应某个功能或者bugfix而不需要 git 自动生成的，可以在Merge request中设置Merge method为Fase-forward merge，这样可以保证commit历史记录的清晰和完整。(建议设置)</li><li>若采取了第二种 commit 清晰模式，那你则需要再设置Git pull，使其模式为rebase模式，git config pull.rebase true，当你运行 git pull 命令时，Git 会执行 git fetch 后跟 git rebase，将当前分支的提交应用到远程分支的更新之上，而不是创建一个新的合并提交。</li></ol><p>(ps:上述2、3点建立在对rebase有足够了解的情况下，使用 rebase 模式的优点是它可以保持你的 Git 历史记录更加清晰和线性。但是，如果你不熟悉 rebase 的工作方式，你可能会遇到一些复杂的问题，例如合并冲突。因此，在使用 rebase 模式之前，确保你理解了它的工作原理和可能的风险)</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">1.master为生产稳定分支，要做到无论何时，master上的代码都是稳定可靠、能发生产的。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">2.rc为仿真环境分支，用于更新仿真环境，通常为在dev上测试验收无误之后提mr代码评审后合并回rc分支</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  的代码所发的环境分支，为发生产前的测试全量回归环境，</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">3.dev为开发分支，用于更新开发环境，如功能分支或修复分支开发完成后，切到dev分支，执行</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  dev merge feature/xxx，将你分支的commit merge到了 dev上，更新开发环境，给测试验收。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  因此dev分支可以说是脏分支，有着各种开发、问题修复以及测试的功能在上面，仅限测试。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">4.功能分支或修复分支都应从rc分支checkout出来，改动完成后在dev上 merge它们，更新dev环境</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  供测试验证，验证无误，在gitlab上提一个mr合并回rc分支，提mr的时候可以指派人，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  指派给本周发版负责人</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">5.可综合代码质量与效率的考虑，去进行代码评审的人员分配，通常建议mr需要一半以上开发人员review、fix commen、approve后才可合并回rc</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">6.若rc上commit log与dev上commit log相差很大，通常为准备发准生产时，合并回rc后与dev相差较大，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  此时可知会组内人员，push origin --delete删除远程dev分支，于最新rc上checkout出一个新的dev</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  更新到远程origin上。此时不需上rc需上dev的分支需再次merge一遍。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">7.推荐gitlab管理上对master和rc只支持mr合并，no one push推送</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">针对以上git flow的管理，举例几个常见现象</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">1.出现紧急线上bug、需从master checkout 出一个hotfix的分支，与上面解决bug问题，dev merge后</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  更新dev环境去验证修复，修复无误后直接mr合并到master上（合并完成后rc分支需及时 rebase master）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">2.一周内需上线的功能或者bug或者优化，从rc上checkout分支出来，于上面修改，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  修改完成后于dev merge在dev上验证，验证无误后提mr 合并回rc。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">3.多周的功能，从rc上checkout分支出来，于上面开发修改，只在dev merge后提到dev去</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  验证修复，等到需要更新时再去提mr合并到rc。</span></span></code></pre></div><p><strong>Output</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      msg: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Highlighted!&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="custom-containers" tabindex="-1">Custom Containers <a class="header-anchor" href="#custom-containers" aria-label="Permalink to &quot;Custom Containers&quot;">​</a></h2><p><strong>Input</strong></p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::: info</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">This is an info box.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::: tip</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">This is a tip.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::: warning</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">This is a warning.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::: danger</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">This is a dangerous warning.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::: details</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">This is a details blocThis is a details blocThis is a details blocThis is a details block.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:::</span></span></code></pre></div><p><strong>Output</strong></p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>This is an info box.</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>This is a tip.</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>This is a warning.</p></div><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>This is a dangerous warning.</p></div><details class="details custom-block"><summary>Details</summary><p>This is a details block.</p></details><h2 id="more" tabindex="-1">More <a class="header-anchor" href="#more" aria-label="Permalink to &quot;More&quot;">​</a></h2><p>Check out the documentation for the <a href="https://vitepress.dev/guide/markdown" target="_blank" rel="noreferrer">full list of markdown extensions</a>.</p>`,21),p=[l];function t(h,r,c,k,E,d){return i(),a("div",null,p)}const m=s(e,[["render",t]]);export{g as __pageData,m as default};
