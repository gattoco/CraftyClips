import { createStore } from "solid-js/store";
import { getTwitchAuth } from "../api/twitch";

export const TwitchApiEndpoints = {
  AUTH: "https://id.twitch.tv/oauth2/token",
  CLIPS: "https://api.twitch.tv/helix/clips",
  GAMES: "https://api.twitch.tv/helix/games",
  USERS: "https://api.twitch.tv/helix/users",
};

export const [twitchAuthState, setTwitchAuthState] =
  createStore<TwitchAuthInfo>({
    access_token: "",
    token_type: "",
    expires_in: 0,
    expires_at: 0,
    scope: "",
  });

export const getTwitchAuthToken = async () => {
  const currentTime = Math.floor(Date.now() / 1000); 
  if (
    !twitchAuthState.access_token ||
    twitchAuthState.expires_at <= currentTime
  ) {
    const tokenResponse = await getTwitchAuth();
    if (tokenResponse) {
      const expirationTime = currentTime + tokenResponse.expires_in; 

      setTwitchAuthState({
        access_token: tokenResponse.access_token,
        token_type: tokenResponse.token_type,
        expires_in: tokenResponse.expires_in,
        expires_at: expirationTime, 
      });
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
