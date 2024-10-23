interface Page {
  name: string;
  url: string;
  component: () => JSX.Element;
  hidden?: boolean;
  redirectTo?: string;
  children?: Page[];
  layout?: string;
}

interface TwitchAuthInfo {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  expires_at: number;
}
interface TwitchClip {
  id: string;
  url: string;
  embed_url: string;
  broadcaster_id: string;
  broadcaster_name: string;
  creator_id: string;
  creator_name: string;
  video_id: string;
  game_id: string;
  game?: TwitchGame;
  language: string;
  title: string;
  view_count: number;
  created_at: string;
  added_at: string;
  thumbnail_url: string;
  duration: number;
  vod_offset: any;
  is_featured: any;
  visible?: boolean;
}
interface TwitchGame {
  box_art_url: string;
  id: string;
  name: string;
}

interface TwitchVideo {
  id: string;
  url: string;
  embed_url: string;
  user_id: string;
  user_name: string;
  language: string;
  title: string;
  view_count: number;
  created_at: string;
  thumbnail_url: string;
  duration: number;
}

interface TwitchUser {
  broadcaster_type: string;
  created_at: string;
  description: string;
  display_name: string;
  id: string;
  login: string;
  type: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  type: string;
}

interface ClipQueue {
  id: any;
  name: string;
  clips: string[];
}