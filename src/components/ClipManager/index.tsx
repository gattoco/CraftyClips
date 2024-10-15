import { createSignal, For, Show } from "solid-js";
import { useState } from "../../store";
import ClipsList from "../Clips/List";
import { getDataFromApi } from "../../api/twitch";

const ClipManager = () => {
  const { state, setState } = useState();
  const [queues, setQueues] = createSignal<ClipQueue[]>(state.clipQueue ?? []);
  const [selectedQueueName, setSelectedQueueName] = createSignal<string | null>("all");
  const [newQueueName, setNewQueueName] = createSignal('');
  const [showClipSelector, setShowClipSelector] = createSignal(false);
  const [newClipURL, setNewClipURL] = createSignal('');

  const getClipsForQueue = (queueName: string | null) => {
    if (queueName === "all") return state.clips;
    const queue = queues().find((q) => q.name === queueName);
    return queue
      ? queue.clips
          .map((id) => state.clips.find((clip) => clip.id === id))
          .filter((clip): clip is TwitchClip => Boolean(clip))
      : [];
  };

  const toggleClipInQueue = (clipId: string, queueName: string) => {
    setQueues((prev) =>
      prev.map((queue) =>
        queue.name === queueName
          ? {
              ...queue,
              clips: queue.clips.includes(clipId)
                ? queue.clips.filter((id) => id !== clipId)
                : [...queue.clips, clipId],
            }
          : queue
      )
    );
  };

  const createClipQueue = () => {
    const name = newQueueName().trim();
    if (name) {
      setQueues([...queues(), { name, clips: [] }]);
      setNewQueueName('');
    }
  };

  const fetchClipByURL = async (url: string) => {
    try {
      const clipId = extractClipIdFromURL(url);
      const clipData = await getDataFromApi(import.meta.env.VITE_TWITCH_CLIP, { id: clipId });
      if (clipData.length) {
        setState('clips', [...state.clips, clipData[0]]);
      }
    } catch (error) {
      console.error("Failed to fetch clip details:", error);
    }
  };

  const extractClipIdFromURL = (url: string) => {
    const match = url.match(/\/clip\/(\w+)/);
    return match ? match[1] : '';
  };

  return (
    <>
      <h1>Clip Manager</h1>

      <div>
        <h2>Select a Queue</h2>
        <select onChange={(e) => setSelectedQueueName(e.currentTarget.value)}>
          <option value="all">All Clips</option>
          <For each={queues()}>
            {(queue) => <option value={queue.name}>{queue.name}</option>}
          </For>
        </select>
      </div>

      <div>
        <input
          type="text"
          value={newQueueName()}
          onInput={(e) => setNewQueueName(e.currentTarget.value)}
          placeholder="New Queue Name"
        />
        <button onClick={createClipQueue}>Create new</button>
      </div>

      <div>
        <h2>Add New Clip by URL</h2>
        <input
          type="text"
          value={newClipURL()}
          onInput={(e) => setNewClipURL(e.currentTarget.value)}
          placeholder="Paste Twitch Clip URL"
        />
        <button onClick={() => fetchClipByURL(newClipURL())}>Add Clip</button>
      </div>

      <button onClick={() => setShowClipSelector(!showClipSelector())}>
        {showClipSelector() ? "Hide Clip Selector" : "Show Clip Selector"}
      </button>

      <Show when={showClipSelector()}>
        <h2>Select Clips to Add/Remove</h2>
        <For each={state.clips}>
          {(clip) => (
            <div>
              <input
                type="checkbox"
                checked={getClipsForQueue(selectedQueueName()).some(
                  (c) => c.id === clip.id
                )}
                onChange={() => toggleClipInQueue(clip.id, selectedQueueName()!)}
              />
              {clip.title}
            </div>
          )}
        </For>
      </Show>

      <Show when={selectedQueueName() !== null}>
        <h2>Clips</h2>
        <ClipsList clips={getClipsForQueue(selectedQueueName())} />
      </Show>
    </>
  );
};

export default ClipManager;
