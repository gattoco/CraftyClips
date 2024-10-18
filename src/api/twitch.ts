import axios from "axios";
import { twitchAuthState, getTwitchAuthToken } from "../store/config";
import { TwitchApiEndpoints } from "../store/config";

interface TwitchApiResponse<T> {
  data: T[];
  pagination?: {
    cursor?: string;
  };
}
const getTwitchAuth = async () => {
  try {
    const response = await axios.post(TwitchApiEndpoints.AUTH, null, {
      params: {
        client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
        client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
        grant_type: "client_credentials",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};

const getDataFromApi = async <T>(
  url: string,
  params: any,
  fetchAll: boolean = false,
  initialCursor?: string | undefined
): Promise<[T[], string | undefined]> => {
  try {
    await getTwitchAuthToken();

    let allData: T[] = [];
    let cursor: string | undefined = initialCursor;

    do {
      const response = await axios.get<TwitchApiResponse<T>>(url, {
        headers: {
          "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
          Authorization: `Bearer ${twitchAuthState.access_token}`,
        },
        params: {
          ...params,
          after: cursor,
        },
      });

      const responseData = response.data.data;
      const pagination = response.data.pagination;

      allData = [...allData, ...responseData];
      cursor = pagination?.cursor || undefined;

      if (!fetchAll) {
        break;
      }
    } while (cursor);

    return [allData, cursor];
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
};

const gameDetailsCache = new Map<string, TwitchGame>();

const enrichClipsWithExtraDetails = async (
  clips: TwitchClip[]
): Promise<TwitchClip[]> => {
  const enrichedClips = await Promise.all(
    clips.map(async (clip) => {
      if (clip.game_id) {
        clip.game = await fetchGameDetails(clip.game_id);
      }
      clip.added_at = clip.created_at;
      return clip;
    })
  );

  return enrichedClips;
};

const fetchGameDetails = async (
  gameId: string
): Promise<TwitchGame | undefined> => {
  try {
    if (gameDetailsCache.has(gameId)) {
      return gameDetailsCache.get(gameId);
    }

    const [games] = await getDataFromApi<TwitchGame>(TwitchApiEndpoints.GAMES, {
      id: gameId,
    });

    if (games?.length) {
      gameDetailsCache.set(gameId, games[0]);
      return games[0];
    }

    return undefined;
  } catch (error) {
    console.error(`Error fetching game details for game ID: ${gameId}`, error);
    return undefined;
  }
};

export {
  getTwitchAuth,
  getDataFromApi,
  enrichClipsWithExtraDetails,
  fetchGameDetails,
};
