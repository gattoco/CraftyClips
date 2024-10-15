import { createStore } from "solid-js/store";
import { getTwitchAuth } from "../api/twitch";

export const TwitchApiEndpoints = {
    AUTH: "https://id.twitch.tv/oauth2/token",
    CLIPS: "https://api.twitch.tv/helix/clips",
    GAMES: "https://api.twitch.tv/helix/games",
}

export const [twitchAuth, setTwitchAuth] = createStore<TwitchAuthInfo>({
    access_token: "",
    token_type: "",
    scope: ""
});

export const getTwitchAuthToken = async () => {
    const token = await getTwitchAuth();
    if (token && twitchAuth.access_token !== token.access_token) {
        setTwitchAuth( token );
    }
}
    