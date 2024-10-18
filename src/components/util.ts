import { enrichClipsWithExtraDetails, getDataFromApi } from "../api/twitch";
import { getTwitchAuthToken, TwitchApiEndpoints } from "../store/config";

const FETCH_NUMBER_OF_CLIPS = 100;

const fetchClipById = async (clipId: string) => {
  try {
    await getTwitchAuthToken();
    const [clip] = await getDataFromApi<TwitchClip>(TwitchApiEndpoints.CLIPS, {
      id: clipId,
    });
    return clip;
  } catch (error) {
    console.error("Error fetching Twitch data:", error);
    return null;
  }
};

const fetchClips = async (
  pBroadcasterId: string = "985378831",
  pNumberOfClips: number = FETCH_NUMBER_OF_CLIPS,
  pCursor: string | undefined = undefined
): Promise<[TwitchClip[], string | undefined]> => {
  await getTwitchAuthToken();

  const [allClips, cursor] = await getDataFromApi<TwitchClip>(
    TwitchApiEndpoints.CLIPS,
    {
      broadcaster_id: pBroadcasterId,
      first: pNumberOfClips,
    },
    false,
    pCursor
  );

  const enrichedClips = await enrichClipsWithExtraDetails(allClips.reverse());

  return [enrichedClips, cursor];
};

const fetchUsers = async (
  pBroadcasterName: string
): Promise<TwitchUser | null> => {
  try {
    await getTwitchAuthToken();

    const [broadcasters] = await getDataFromApi<TwitchUser>(
      TwitchApiEndpoints.USERS,
      {
        login: pBroadcasterName,
      }
    );

    if (broadcasters && broadcasters.length > 0) {
      return broadcasters[0];
    }

    return null;
  } catch (error) {
    console.error("Error fetching Twitch data:", error);
    return null;
  }
};

export { fetchClipById, fetchClips, fetchUsers };
