import React from 'react';

const MondrianBlogPage: React.FC = () => {
    const handleBack = () => {
        window.location.href = '/';
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;900&family=JetBrains+Mono:wght@400;700&display=swap');
        
        :root {
            /* Dark Mode Colors - Eye-friendly */
            --bg-dark: #1a1a1a;
            --bg-card: #242424;
            --bg-card-hover: #2a2a2a;
            --line-thick: 1px;
            --line-color: #333;
            --primary-red: #ff6b6b;
            --primary-yellow: #ffd93d;
            --primary-blue: #6bcfff;
            --text-main: #e8e8e8;
            --text-secondary: #b0b0b0;
            --text-muted: #808080;
            --transition-smooth: cubic-bezier(0.23, 1, 0.32, 1);
        }

        .blog-page-container {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .blog-page-body {
            background-color: var(--bg-dark);
            font-family: 'Inter', sans-serif;
            color: var(--text-main);
            line-height: 1.7;
            padding: 40px 20px;
            min-height: 100vh;
        }

        .grain-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.03;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .blog-container {
            max-width: 900px;
            margin: 0 auto;
        }

        .blog-header {
            background: var(--bg-card);
            padding: 60px 50px;
            margin-bottom: 40px;
            border: var(--line-thick) solid var(--line-color);
            border-radius: 8px;
            position: relative;
            overflow: hidden;
        }

        .blog-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 6px;
            height: 100%;
            background: linear-gradient(180deg, var(--primary-red), var(--primary-blue));
        }

        .blog-header h1 {
            font-size: clamp(2.5rem, 6vw, 4rem);
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: -3px;
            line-height: 0.9;
            margin-bottom: 20px;
            color: var(--text-main);
        }

        .blog-header p {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .article-card {
            background: var(--bg-card);
            border: var(--line-thick) solid var(--line-color);
            border-radius: 8px;
            margin-bottom: 40px;
            overflow: hidden;
            transition: all 0.3s var(--transition-smooth);
            animation: fadeInUp 0.6s var(--transition-smooth) backwards;
        }

        .article-card:hover {
            background: var(--bg-card-hover);
            border-color: #444;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .article-card:nth-child(1) { animation-delay: 0.1s; }
        .article-card:nth-child(2) { animation-delay: 0.2s; }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .article-header {
            padding: 40px 50px 30px;
            border-bottom: var(--line-thick) solid var(--line-color);
            position: relative;
        }

        .article-meta {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }

        .article-meta span {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .article-title {
            font-size: clamp(1.8rem, 4vw, 2.5rem);
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 15px;
            color: var(--text-main);
        }

        .article-excerpt {
            font-size: 1.1rem;
            color: var(--text-secondary);
            line-height: 1.6;
        }

        .article-content {
            padding: 50px;
        }

        .article-content p {
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
            line-height: 1.8;
            color: var(--text-secondary);
        }

        .article-content h3 {
            font-size: 1.6rem;
            font-weight: 900;
            margin-top: 40px;
            margin-bottom: 20px;
            color: var(--text-main);
        }

        .article-content strong {
            color: var(--text-main);
            font-weight: 700;
        }

        .article-content em {
            color: var(--primary-blue);
            font-style: normal;
            font-weight: 600;
        }

        /* Image Styles */
        .article-content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 30px 0;
            display: block;
            border: var(--line-thick) solid var(--line-color);
        }

        .article-content .img-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }

        .article-content .img-row img {
            margin: 0;
            width: 100%;
            object-fit: cover;
            aspect-ratio: 4/3;
        }

        .accent-bar {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 4px;
            width: 60%;
        }

        .accent-red { background: var(--primary-red); }
        .accent-blue { background: var(--primary-blue); }
        .accent-yellow { background: var(--primary-yellow); }

        .footer-nav {
            background: var(--bg-card);
            border: var(--line-thick) solid var(--line-color);
            border-radius: 8px;
            padding: 30px 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 60px;
        }

        .nav-link {
            font-family: 'JetBrains Mono', monospace;
            text-decoration: none;
            color: var(--text-secondary);
            font-weight: 700;
            font-size: 0.9rem;
            text-transform: uppercase;
            position: relative;
            padding: 10px;
            cursor: pointer;
            transition: color 0.3s;
        }

        .nav-link:hover {
            color: var(--primary-red);
        }

        @media (max-width: 768px) {
            .blog-page-body {
                padding: 20px 10px;
            }

            .blog-header,
            .article-header,
            .article-content,
            .footer-nav {
                padding: 30px 25px;
            }

            .article-meta {
                flex-direction: column;
                gap: 8px;
            }

            .footer-nav {
                flex-direction: column;
                gap: 20px;
                text-align: center;
            }

            .article-content .img-row {
                grid-template-columns: 1fr;
            }
        }
      `}</style>

            <div className="blog-page-container">
                <div className="blog-page-body">
                    <div className="grain-overlay"></div>

                    <div className="blog-container">
                        {/* Header */}
                        <header className="blog-header">
                            <h1>产品<br />日志</h1>
                            <p>Product Design & Development Journal</p>
                        </header>

                        {/* Article 4 - Spring Festival */}
                        <article className="article-card">
                            <div className="article-header">
                                <div className="article-meta">
                                    <span>📅 2026.02.12</span>
                                    <span>📂 春节限定</span>
                                    <span>👤 黄小桃</span>
                                </div>
                                <h2 className="article-title">🧨 不小心打造了一款既有“玄学”又有“科技感”的春节拜年神器？</h2>
                                <p className="article-excerpt">能量加油站日历春节限定版上线！指尖烟花、AR抓金币，用黑科技重新定义拜年仪式感。</p>
                                <div className="accent-bar accent-red"></div>
                            </div>
                            <div className="article-content">
                                <p>每到春节，群发短信那种毫无感情的“复制粘贴”？想给朋友送祝福，只是文字有点干巴巴，又或者是城市禁燃，少了一点“爆竹声中一岁除”的仪式感？</p>

                                <h3>✨ 黑科技加持：春节限定的“魔法”体验</h3>

                                <h3>🎆 玩法一：指尖烟花 (Fireworks) —— 随时随地，想放就放</h3>

                                <p><strong>交互设计：</strong></p>
                                <p><em>点击：</em>点哪里，哪里就绽放一朵烟花。</p>
                                <p><em>滑动：</em>从屏幕底部划过，留下一道道流光溢彩的尾迹，就像小时候玩的仙女棒。</p>
                                <p><em>蓄力长按：</em>这是一个隐藏彩蛋！长按屏幕，能量条蓄满后松手，会触发一次震撼全屏的超级烟花。</p>

                                <p><strong>情感彩蛋：</strong>这不仅仅是视觉特效。当烟花炸开时，你定制的那句祝福语（比如“祝爸妈身体健康”）会伴随着光影缓缓浮现。那一刻的感动，是任何静态图片都无法比拟的。</p>

                                <h3>🤲 玩法二：魔法双手 (Magic Hands) —— AR 抓金币</h3>
                                <p>这是今年的重头戏！利用 VKSession 和 WebGL 技术，我啥也不懂就背靠AI这座靠山，实现了一个仅靠手机摄像头就能玩的 AR 游戏。</p>

                                <p><strong>手势识别：</strong>摄像头实时捕捉你的手部动作。</p>
                                <p><strong>握拳抓取：</strong>当你看到屏幕上掉落金币，伸出手“握住”，手机会立刻震动反馈，金币上面的数字+n。这种“看得见摸得着”的反馈，让抢红包有了真实的体感。</p>
                                <p>
                                    <strong>集满100金币：</strong>又在张手握拳之间，金币浮尘化作满屏的粒子特效和最终的祝福语。
                                </p>
                            </div>
                        </article>

                        {/* Article 3 - Latest */}
                        <article className="article-card">
                            <div className="article-header">
                                <div className="article-meta">
                                    <span>📅 2026.01.23</span>
                                    <span>📂 产品发布</span>
                                    <span>👤 黄小桃</span>
                                </div>
                                <h2 className="article-title">⚡️ 能量加油站日历 - 让每一天都充满力量</h2>
                                <p className="article-excerpt">一款将温暖的鼓励语句写入手机日历，让你每天定时收获能量的治愈系小程序</p>
                                <div className="accent-bar accent-yellow"></div>
                            </div>
                            <div className="article-content">
                                <h3>🎯 一句话介绍</h3>
                                <p>一款将温暖的鼓励语句写入手机日历，让你每天定时收获能量的治愈系小程序。</p>

                                <h3>✨ 核心功能</h3>

                                <h3>📅 能量注入 - 让日历成为你的充电站</h3>
                                <p>厌倦了千篇一律的日程提醒？试试在日历里种下希望的种子吧！</p>

                                <p><strong>智能写入日历：</strong>一键将3天、7天或15天的能量语句写入你的手机日历</p>
                                <p><strong>随机时间推送：</strong>每天在9:00-21:00之间的随机时刻收到惊喜提醒</p>
                                <p><strong>倒计时提醒：</strong>实时显示能量剩余天数，最后一天自动提醒续油</p>
                                <p><strong>温馨收尾：</strong>最后一天的语句会自动添加续油提醒，贴心不断供</p>

                                <h3>🏷️ 个性化能量类型 - 你的心情你做主</h3>
                                <p>12种精选能量标签，300+句精心筛选的语录，总有一款击中你的心：</p>

                                <p><em>🌅 阳光</em> - 重启与希望，新的一天新的开始</p>
                                <p><em>💪 力量</em> - 掌控感满满，战胜一切挑战</p>
                                <p><em>❤️ 爱自己</em> - 温柔接纳，停止内耗</p>
                                <p><em>🌱 成长</em> - 每天进步一点点</p>
                                <p><em>✨ 治愈</em> - 抚平伤痛，温暖内心</p>
                                <p><em>🍃 平静</em> - 降低焦虑，回归当下</p>
                                <p><em>🔥 鼓励</em> - 加油打气，冲劲满满</p>
                                <p><em>🧸 可爱</em> - 俏皮卖萌，会心一笑</p>
                                <p><em>🏔️ 英雄主义</em> - 认清真相依然热爱</p>
                                <p><em>📖 内心的光</em> - 向内求索，自我觉醒</p>
                                <p><em>🍃 诗意</em> - 发现生活中的美</p>
                                <p><em>⏳ 哲思</em> - 岁月沉淀的智慧</p>

                                <h3>⛽️ 充油站 - 打造专属能量库</h3>
                                <p>你的话，才最懂你自己：</p>

                                <p><strong>自定义语句：</strong>添加专属于你的加油语句</p>
                                <p><strong>智能分类：</strong>自动区分"我的专属"、"收到的"、"送出的"句子</p>
                                <p><strong>灵活管理：</strong>随时删除不再需要的语句</p>

                                <h3>🎁 能量礼物 - 把温暖传递给TA</h3>
                                <p>好东西要分享，温暖也可以传染：</p>

                                <p><strong>精选句库：</strong>从300+句子中挑选，或自己输入</p>
                                <p><strong>智能搜索：</strong>快速找到想要的那句话</p>
                                <p><strong>动画加持：</strong>选择星星✨、爱心❤️或烟花🎆动画效果</p>
                                <p><strong>一键转发：</strong>直接分享给微信好友</p>

                                <h3>🎆 沉浸式动画 - 让祝福更有仪式感</h3>
                                <p>收到能量礼物时，不只是文字，还有视觉盛宴：</p>

                                <p><em>星光动画：</em>闪烁的星星、划过的流星、梦幻的闪光</p>
                                <p><em>爱心动画：</em>飘浮的爱心、脉动效果、粉色浪漫</p>
                                <p><em>烟花动画：</em>绚丽爆炸、多彩粒子、震撼视觉</p>

                                <h3>💡 使用场景</h3>

                                <p><strong>🌄 早起困难户：</strong>每天早上被突如其来的温暖鼓励叫醒，比闹钟更治愈</p>
                                <p><strong>📚 备考党/打工人：</strong>在你最需要动力的时候，日历提醒自动弹出一句"你可以的！"</p>
                                <p><strong>💔 情绪低落时：</strong>提前为自己准备好"治愈"和"平静"类型的能量，让未来的自己不那么孤单</p>
                                <p><strong>👨👩👧👦 关心家人朋友：</strong>给备考的朋友、焦虑的家人送一份能量礼物，用特别的方式说"我在你身边"</p>
                                <p><strong>🎯 习惯养成：</strong>把激励语句写入日历，每天定时提醒，坚持变得更容易</p>

                                <h3>🌟 产品亮点</h3>

                                <p><strong>✅ 无需额外App：</strong>直接写入系统日历，打开手机就能看到，原生体验零学习成本</p>
                                <p><strong>✅ 私密又温暖：</strong>不像朋友圈需要展示给所有人，这是只属于你的秘密能量站</p>
                                <p><strong>✅ 真正的陪伴感：</strong>不是冷冰冰的打卡工具，而是每天在随机时刻给你惊喜的贴心小伙伴</p>
                                <p><strong>✅ 可持续使用：</strong>用完自动提醒续油，形成正向循环，让温暖成为习惯</p>
                                <p><strong>✅ 社交属性：</strong>既能自用，也能送人，把温暖传递出去</p>

                                <h3>🎨 适合人群</h3>

                                <p>📱 手机日历重度用户 · 🌈 追求生活仪式感的年轻人 · 💪 需要正向激励的奋斗者 · 🎭 情绪敏感需要治愈的人群 · 👥 想用特别方式关心他人的暖心朋友</p>

                                <p><strong>"把温暖写进日历，让能量准时送达"</strong></p>
                                <p><strong>"每一天，都值得被温柔对待"</strong></p>
                                <p><strong>"在时间里种下希望，在日历中收获力量"</strong></p>
                            </div>
                        </article>

                        {/* Article 2 */}
                        <article className="article-card">
                            <div className="article-header">
                                <div className="article-meta">
                                    <span>📅 2025.12.03</span>
                                    <span>📂 产品更新</span>
                                    <span>👤 黄小桃</span>
                                </div>
                                <h2 className="article-title">宝藏小程序：截图拼图打勾，三步搞定图片清单！</h2>
                                <p className="article-excerpt">从碎片到整合，从计划到执行——拼图助手+图片清单，效率提升何止一倍！</p>
                                <div className="accent-bar accent-blue"></div>
                            </div>
                            <div className="article-content">
                                <p><strong>你是不是也总被各种碎片信息困扰？</strong></p>

                                <p>购物车商品、想看的书单、影单，小红书的图片笔记截图存了一堆，却乱到不想整理。</p>

                                <p>现在，用这款微信小程序：<strong>自定义清单by黄小桃</strong>，一切都变简单了：</p>

                                <h3>1️⃣ 使用内置拼图助手模块</h3>
                                <p>把分散的截图、商品图、书影封面，一键拼成一张整洁的大图。</p>

                                <h3>2️⃣ 使用内置图片清单模块</h3>
                                <p>在拼好的图上，直接点击添加勾选框，生成可交互清单。</p>

                                <h3>3️⃣ 直接使用这张图</h3>
                                <p>拿着这张图去购物、读书、打卡，完成一项勾掉一项！</p>

                                <h3>🌟 一个功能，N种场景：</h3>

                                <p><em>学习场景：</em>把资料截图拼成复习清单，逐项攻克。</p>

                                <p><em>购物场景：</em>把种草商品拼成采购图，逛街直接对照勾选。</p>

                                <p><em>旅行场景：</em>把攻略、酒店、景点图拼成计划表，行程一目了然。</p>

                                <p><em>追剧场景：</em>把想追的剧集海报拼成追番墙，记录观看进度。</p>

                                <p><strong>从碎片到整合，从计划到执行，只需要这一个小程序！</strong>效率提升何止一倍！快速清单有文本格式自动创建条目功能，还可以用分享码跨好友分享清单，各种宝藏功能快来试试吧。</p>
                            </div>
                        </article>

                        {/* Article 1 */}
                        <article className="article-card">
                            <div className="article-header">
                                <div className="article-meta">
                                    <span>📅 2025.07.29</span>
                                    <span>📂 产品开发</span>
                                    <span>👤 黄小桃</span>
                                </div>
                                <h2 className="article-title">告别繁琐输入！支持图片勾选、文本秒转，清单还能这样玩？</h2>
                                <p className="article-excerpt">在谷歌Gemini的帮助下，开发了一款轻量化清单小程序——简化输入、方便分享。</p>
                                <div className="accent-bar accent-red"></div>
                            </div>
                            <div className="article-content">
                                <p><strong>在谷歌Gemini的大力帮助下，最近开发了一款轻量化的清单小程序。</strong>聚焦清单本身，研究了两件事：一个是简化输入，一个是方便分享。</p>

                                <h3>1、简化输入</h3>

                                <p><strong>1.1 快速输入。</strong>传统型的一条条输入很麻烦，必须先点按到文本框里再输入，于是做了一个快速输入文本框，以逗号区隔的都可以快速变成各条目。</p>

                                <p><em>使用场景：</em>比如记录今天要去超市买的物品，帮几个同事带咖啡奶茶等，买了就勾选，就不会漏掉。</p>

                                <p>还可以整段文本复制粘贴过来，改变标点，也可以快速变成各条目。</p>

                                <p><em>使用场景：</em>微博里看到各色武汉早点想做个美食清单，直接全部复制过来，发现是顿号标注也没关系，除了一个个改成逗号，还有个小技巧，在deepseek里直接让AI帮你替换掉。</p>

                                <p><strong>1.2 不输入。</strong>尤其是像小红书，微博这类经常分享的都是图片型笔记，能够直接在图片上勾选是最方便的，于是可以添加图片后在上面直接添加可勾选删除的勾选框。</p>

                                <p><em>使用场景：</em>小红书上母婴要用到的待产包图片笔记保存下来，想购买的就添加勾选框，淘宝时就照着买照着勾就行了。</p>

                                <h3>2、方便分享</h3>

                                <p>本来清单创建好后很容易分享给好友，但是如果不是好友，怎么能查看到分享的清单呢？</p>

                                <p>于是创建了分享码功能（目前只在传统清单和快速清单里），清单生成分享码后分享出去，任何人可以在小程序里输入分享码直接获取清单。</p>

                                <p><em>使用场景：</em>社交媒体上要是发文比如十部人生必看的电影，博主直接创建好电影清单，分享分享码，想看的就可以到小程序里输入分享码获取该清单，照着打卡就行了。</p>
                            </div>
                        </article>

                        {/* Footer Navigation */}
                        <nav className="footer-nav">
                            <a onClick={handleBack} className="nav-link">← 返回首页</a>
                            <span style={{ fontFamily: 'JetBrains Mono', opacity: 0.3, fontSize: '0.85rem' }}>// 4 Articles //</span>
                            <span className="nav-link" style={{ opacity: 0.3, cursor: 'default' }}>更多文章即将更新</span>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MondrianBlogPage;
