import { createStore } from "solid-js/store";
import { getTwitchAuth } from "../api/twitch";

export const TwitchApiEndpoints = {
  AUTH: "https://id.twitch.tv/oauth2/token",
  CLIPS: "https://api.twitch.tv/helix/clips",
  GAMES: "https://api.twitch.tv/helix/games",
  USERS: "https://api.twitch.tv/helix/users",
};

export const [twitchAuth, setTwitchAuth] = createStore<TwitchAuthInfo>({
  access_token: "",
  token_type: "",
  scope: "",
});

export const getTwitchAuthToken = async () => {
  if (!twitchAuth.access_token) {
    const token = await getTwitchAuth();
    if (token) {
      setTwitchAuth(token);
    }
  }
};

export const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
