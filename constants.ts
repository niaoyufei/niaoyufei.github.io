import { AppFeature, TeaserProject } from './types';

export const APP_NAME = "自定义清单";
export const APP_TAGLINE = "你的生活，井井有条";
export const APP_DESCRIPTION = "一款极简主义的微信小程序，专注于帮你记录、排序和分享生活中的一切清单。无论是购物列表、待办事项还是旅行计划，都能轻松搞定。";

export const APP_FEATURES: AppFeature[] = [
  {
    id: 'f1',
    title: '极简录入',
    subtitle: '告别繁琐，一键添加',
    description: '采用创新的交互设计，支持语音输入与智能文本识别。只需简单的打字或说话，系统自动识别时间与重要性，让记录变得像呼吸一样自然。',
    mediaUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop', // Placeholder: Writing/List
    mediaType: 'image',
    iconName: 'List'
  },
  {
    id: 'f2',
    title: '自由排序',
    subtitle: '我的清单我做主',
    description: '打破传统列表限制，支持长按拖拽任意排序。你可以按照优先级、时间或是心情随意调整条目顺序，真正实现个性化管理。',
    mediaUrl: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2076&auto=format&fit=crop', // Placeholder: Organization
    mediaType: 'image',
    iconName: 'SortDesc'
  },
  {
    id: 'f3',
    title: '一键分享',
    subtitle: '好友协作，效率倍增',
    description: '生成的清单可以生成精美卡片分享至朋友圈，或者直接邀请微信好友协作编辑。无论是家庭购物还是团队任务，同步不再是难题。',
    mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop', // Placeholder: Sharing/Network
    mediaType: 'image',
    iconName: 'Share2'
  },
  {
    id: 'f4',
    title: '云端同步',
    subtitle: '数据安全，永不丢失',
    description: '依托微信云开发能力，所有数据实时同步至云端。更换设备、删除小程序，你的珍贵记录依然安然无恙，随时随地触手可及。',
    mediaUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', // Placeholder: Cloud/Tech
    mediaType: 'image',
    iconName: 'Cloud'
  }
];

export const MYSTERY_TEASER: TeaserProject = {
  title: "Project: TimeFlow",
  description: "一个结合番茄工作法与白噪音的深度专注工具。正在开发中，敬请期待...",
  releaseDate: "2024 Winter"
};

export const AI_SYSTEM_INSTRUCTION = `
You are an intelligent AI portfolio assistant for Alex, the developer of the WeChat Mini Program "Custom List" (自定义清单).
Your goal is to explain the features of "Custom List" to visitors.
The app features include: Simple Entry, Custom Sorting, One-click Sharing, and Cloud Sync.
Be polite, professional, and enthusiastic.
Respond in Chinese (Simplified).

If asked about upcoming projects, mention "Project: TimeFlow" which is a focus tool coming in Winter 2024.
If asked about contact info, say Alex prefers email at alex@example.com.
`;
