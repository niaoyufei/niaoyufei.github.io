// src/constants.ts
// src/constants.ts

export const APP_NAME = "我今天上架了我的app吗？";
export const APP_TAGLINE = "小白三个月内上架5个app是奢望吗？";
// 下面这个描述如果你想改也可以顺手改了，不想改就保留
export const APP_DESCRIPTION = "不仅仅是待办事项。我致力于打造能够承载生活厚度的清单工具。在这里，清单不是为了划掉，而是为了记录、分享与长久保存。";



export const MYSTERY_TEASER = {
  title: "Project: Endless Maze",
  description: "一个没有尽头、只有心流的数字迷宫。即将来到 iOS。",
  releaseDate: "2025 Winter"
};

// --- 统一数据格式 ---

export const APP_FEATURES = [
  {
    id: 'f1',
    title: "内容清单",
    subtitle: "从“待办”到“待阅”",
    description: "打破传统 Todo 的焦虑感。无论是百部必看电影，还是城市探店地图，支持图文混排，让清单成为你生活的精美目录。",
    iconName: "List", 
    mediaType: "video", 
    mediaUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" 
  },
  {
    id: 'f2',
    title: "广场与分享",
    subtitle: "连接同好",
    description: "你的清单也是别人的宝藏。一键发布到“清单广场”，支持“保存副本”，将别人的智慧存入你的个人库。",
    iconName: "Share2",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'f3',
    title: "沉淀与回顾",
    subtitle: "长期主义",
    description: "没有“过期”的清单。支持按时间轴、标签和完成度进行多维度检索。让清单成为你个人成长轨迹的数字化石。",
    iconName: "Cloud",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80"
  }
];

export const TARGET_AUDIENCE = [
  {
    id: 't1',
    title: "内容创作者",
    subtitle: "为博主打造",
    description: "用清单整理你的“探店地图”或“避坑指南”，生成精美卡片一键分享给粉丝，让干货更有条理。",
    iconName: "PenTool",
    // 为每个群体配了一张比较符合气质的图
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1499750310159-5298019773dd?auto=format&fit=crop&w=800&q=80" 
  },
  {
    id: 't2',
    title: "生活规划师",
    subtitle: "备婚 / 装修 / 待产",
    description: "面对长周期、数百项琐碎任务，你需要一个能稳定记录、随时回溯的长期清单，而不是便利贴。",
    iconName: "Map",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 't3',
    title: "知识收藏家",
    subtitle: "构建个人知识库",
    description: "不再让好文章、好电影在收藏夹里吃灰。通过结构化的清单管理你的精神食粮。",
    iconName: "Library",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80"
  }
];