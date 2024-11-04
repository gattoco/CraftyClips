import { createSignal, Show } from "solid-js";
import { useState } from "../../store";
import { fetchTeamDetails, fetchTeamMembers } from "../util";

const Teams = () => {
  const { state, setState } = useState();
  const [teamName, setTeamName] = createSignal("");
  const [teamDetails, setTeamDetails] = createSignal<TwitchTeam>();



  const getTeam = async (teamName: string) => {
    const team = await fetchTeamDetails(teamName);

    if (team) {
      setTeamDetails(team);
    }
  };

  const getMemberStreams = async () => {

    const memberIds = teamDetails()?.users.map((user) => user.user_login);
    if (!memberIds) return;
    const members = await fetchTeamMembers(memberIds);

    if (members) {

    }

    console.log(members);
  }

  return (
    <>
      <input
        type="text"
        name="teamName"
        placeholder="Enter team name"
        required
        value={teamName()}
        onInput={(e) => setTeamName(e.currentTarget.value)}
      />
      <button type="button" onClick={() => getTeam(teamName())}>
        Get Team
      </button>

      <Show when={teamDetails()}>
        <div>
          <h2>{teamDetails()?.team_display_name}</h2>
          <button type="button" onClick={() => getMemberStreams()}>
            Get Streams
        </button>
        </div>
      </Show>
    </>
  );
};

export default Teams;
