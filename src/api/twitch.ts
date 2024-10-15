import axios from 'axios';
import { twitchAuth, TwitchApiEndpoints } from '../store/config';

const getTwitchAuth = async () => {
  try {
    const response = await axios.post(TwitchApiEndpoints.AUTH, null, {
      params: {
        client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
        client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
        grant_type: 'client_credentials'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

const getDataFromApi = async (url: string, params: any) => {
  try {
    if (!twitchAuth.access_token) {
      throw new Error('No access token available');
    }
    const response = await axios.get(url, {
      headers: {
        'Client-ID': import.meta.env.VITE_TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${twitchAuth.access_token}`
      },
      params: {
        ...params
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error;
  }
};

const enrichClipsWithGameDetails = async(clips: TwitchClip[]): Promise<TwitchClip[]> => {
  const gameDetailsCache: Record<string, TwitchGame> = {};

  const enrichedClips = await Promise.all(
    clips.map(async (clip) => {
      if (clip.game_id && !gameDetailsCache[clip.game_id]) {
        const gameDetails = await fetchGameDetails(clip.game_id);
        if (gameDetails) gameDetailsCache[clip.game_id] = gameDetails;
      }
      clip.game = gameDetailsCache[clip.game_id] || null;
      return clip;
    })
  );

  return enrichedClips;
}

// Fetch game details using the same getDataFromApi function
const fetchGameDetails = async(gameId: string): Promise<TwitchGame | null> => {
  try {
    const games = await getDataFromApi(TwitchApiEndpoints.GAMES, { id: gameId });
    return games.length ? games[0] : null;
  } catch (error) {
    console.error(`Error fetching game details for game ID: ${gameId}`, error);
    return null;
  }
}

export { getTwitchAuth, getDataFromApi, enrichClipsWithGameDetails, fetchGameDetails };
