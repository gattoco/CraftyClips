import { enrichClipsWithGameDetails, getDataFromApi } from "../api/twitch";
import { getTwitchAuthToken, TwitchApiEndpoints } from "../store/config";

const clipByBroadcaster = { broadcaster_id: 985378831, first: 50 };
const FETCH_NUMBER_OF_CLIPS = 100;

const fetchClipById = async (clipId: string) => {
  try {
    await getTwitchAuthToken();
    const clip = await getDataFromApi(TwitchApiEndpoints.CLIPS, { id: clipId });
    return clip;
  } catch (error) {
    console.error("Error fetching Twitch data:", error);
    return null;
  }
};

const fetchClips = async (
  pBroadcasterId: number = 985378831,
  pNumberOfClips: number = FETCH_NUMBER_OF_CLIPS
) => {
  try {
    await getTwitchAuthToken();

    const allClips = await getDataFromApi(TwitchApiEndpoints.CLIPS, {
      broadcaster_id: pBroadcasterId,
      first: pNumberOfClips,
    });
    const enrichedClips = await enrichClipsWithGameDetails(allClips);

    return enrichedClips;
  } catch (error) {
    console.error("Error fetching Twitch data:", error);
    return null;
  }
};

const fetchUsers = async (pBroadcasterName: string) => {
  try {
    await getTwitchAuthToken();

    const broadcaster = await getDataFromApi(TwitchApiEndpoints.USERS, {
      login: pBroadcasterName,
    });

    return broadcaster[0];
  } catch (error) {
    console.error("Error fetching Twitch data:", error);
    return null;
  }
};

export { fetchClipById, fetchClips, fetchUsers };
