import { useState } from "../../store";
import ClipsEmbed from "../Clips/Embed";
import { useParams } from "@solidjs/router";

const ClipQueue = () => {
  const { state, setState } = useState();
  const params = useParams();

  const getClipsForQueue = (queueId: string | null) => {
    if (!queueId) return state.clips;
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
      </div>
    </>
  );
};

export default ClipQueue;
