// src/constants.ts

export const APP_NAME = "Huang Zeze";
export const APP_TAGLINE = "独立开发者 & 产品思考者";
export const APP_DESCRIPTION = "专注于打造极致体验的 iOS 应用与微信小程序。我相信好的工具应该像空气一样，存在由于无形，使用时自然而然。";

// 这是一个“神秘预告”板块，你可以写你正在开发的下一个 App
export const MYSTERY_TEASER = {
  title: "Project: Endless Maze",
  description: "一个没有尽头、只有心流的数字迷宫。即将来到 iOS。",
  releaseDate: "2025 Winter"
};

export const APP_FEATURES = [
  {
    id: 1,
    title: "极简清单 (Quick List)",
    subtitle: "微信小程序",
    description: "抛弃繁琐的分类与设置，打开即写，点击即完成。支持独创的“分享码”机制，多人协作从未如此简单。",
    iconName: "List", // 对应 App.tsx 里的图标名字
    // 这里放你的演示视频链接 (MP4) 或者 GIF 动图
    mediaType: "video", 
    mediaUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" 
  },
  {
    id: 2,
    title: "智能排序算法",
    subtitle: "核心技术",
    description: "基于用户习惯的自动排序，未完成的重要事项始终置顶，已完成的自动下沉，让你的注意力永远集中在当下。",
    iconName: "SortDesc",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "无缝协作",
    subtitle: "云端同步",
    description: "无论是在 iPhone, Android 还是 iPad 上，通过微信一键登录，你的数据时刻保持同步。",
    iconName: "Cloud",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80"
  }
];