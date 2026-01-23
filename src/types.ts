export interface AppFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  mediaUrl: string; // URL for image or video
  mediaType: 'image' | 'video';
  iconName: 'List' | 'SortDesc' | 'Share2' | 'Cloud' | 'Zap';
}

export interface TeaserProject {
  title: string;
  description: string;
  releaseDate: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  thumbnailUrl: string;
  tags: string[];
  gallery: string[];
  demoVideoUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  qrCodeUrl?: string;
}