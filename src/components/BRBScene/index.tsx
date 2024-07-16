import { onMount } from "solid-js";
import { useState } from "../../store";
import { getTwitchAuthToken } from "../../store/config";
import { getDataFromApi } from "../../api/twitch";

const BRBScene = (props: any) => {
  const { state, setState } = useState();
  const clipByBroadcaster = { broadcaster_id: 985378831, first: 50 };

  onMount(async () => {
    await getTwitchAuthToken();
    try {
      const allClips = await getDataFromApi(
        import.meta.env.VITE_TWITCH_CLIPS,
        clipByBroadcaster
      );
      console.log(allClips);
      setState("clips", allClips);
    } catch (error) {
      console.error("Error fetching Twitch data:", error);
    }
  });
  return (
    <>
      <h1>brb scene dog - {state.clips.length}</h1>

      <div class="player w-full h-full">
      <iframe
        src="https://clips.twitch.tv/embed?clip=IncredulousAbstemiousFennelImGlitch&parent=localhost"
        height="100%"
        width="100%"
        allowfullscreen>
    </iframe>

      </div>
    </>
  );
};

export default BRBScene;
