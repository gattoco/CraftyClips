import { useState } from "../../store";
import ClipsEmbed from "../Clips/Embed";
import ClipsIframe from "../Clips/Iframe";
import { useParams, useLocation } from "@solidjs/router";

const ClipQueue = () => {
  const { state, setState } = useState();
  const params = useParams();
  const location = useLocation();

  const path = location.pathname;

  const getClipsForQueue = (queueId: string | null) => {
    let qId;

    if (!queueId) return state.clips;
    qId = queueId;
    if (path.includes("brb")) {
      qId = "0f37b791-a231-4933-953c-74a1b080f2e9";
    }
    const queue = state.clipQueue.find((q) => q.id === queueId);
    if (!queue) return state.clips;
    return queue.clips
      .map((id) => state.clips.find((clip) => clip.id === id))
      .filter((clip): clip is TwitchClip => Boolean(clip));
  }

  return (
    <>
      <div>
        <ClipsEmbed clips={getClipsForQueue(params.id)} />
        {/* <ClipsIframe clips={getClipsForQueue(params.id)} /> */}

      </div>
    </>
  );
};

export default ClipQueue;
