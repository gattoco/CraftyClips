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

  const enrichedClips = await enrichClipsWithExtraDetails(allClips);

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

const fetchTeamDetails = async (
  pTeamName: string
): Promise<TwitchTeam | null> => {
  try {
    await getTwitchAuthToken();

    const [team] = await getDataFromApi<TwitchTeam>(
      TwitchApiEndpoints.TEAMS,
      {
        name: pTeamName,
      }
    );
    console.log("Team", team);
    return team ? team[0] : null;

  } catch (error) {
    console.error("Error fetching Twitch data:", error);
    return null;
  }
};

const fetchTeamMembers = async (
  pTeamMemberIds: string[]
): Promise<any[]> => {
  try {
    await getTwitchAuthToken();

    const userIdParams = pTeamMemberIds.map(id => `user_login=${id}`).join("&");
    const urlWithParams = `${TwitchApiEndpoints.STREAMS}?${userIdParams}`;
    console.log("pids", pTeamMemberIds);
    console.log("User ID Params", userIdParams);
    const [memberStreams] = await getDataFromApi<any>(
      urlWithParams,
      {
        type: "all",
        first: 100
      },
    );

    return memberStreams;
  } catch (error) {
    console.error("Error fetching Twitch data:", error);
    return [];
  }
};


export { fetchClipById, fetchClips, fetchUsers, fetchTeamDetails, fetchTeamMembers };
