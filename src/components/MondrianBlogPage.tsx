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

            {/* Article 2 - Latest */}
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
              <span style={{ fontFamily: 'JetBrains Mono', opacity: 0.3, fontSize: '0.85rem' }}>// 2 Articles //</span>
              <span className="nav-link" style={{ opacity: 0.3, cursor: 'default' }}>更多文章即将更新</span>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default MondrianBlogPage;
