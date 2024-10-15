interface Page {
  name: string;
  url: string;
  component: () => JSX.Element;
}

interface TwitchAuthInfo {
    access_token: string;
    token_type: string;
    scope: string;
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
  thumbnail_url: string;
  duration: number;
  vod_offset: any;
  is_featured: any;
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

interface ClipQueue {
  name: string;
  clips: string[];
}

