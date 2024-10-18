import { createSignal, For, Show } from "solid-js";
import { useState } from "../../store";
import ClipsList from "../Clips/List";
import { getDataFromApi } from "../../api/twitch";
import { generateUUID, TwitchApiEndpoints } from "../../store/config";

const ClipManager = () => {
  const { state, setState } = useState();
  const [queues, setQueues] = createSignal<ClipQueue[]>(state.clipQueue ?? []);
  const [selectedQueueId, setSelectedQueueId] = createSignal<string | null>("all"); 
  const [newQueueName, setNewQueueName] = createSignal('');
  const [showClipSelector, setShowClipSelector] = createSignal(false);
  const [newClipURL, setNewClipURL] = createSignal('');

  const getClipsForQueue = (queueId: string | null) => {
    if (queueId === "all") return state.clips;
    const queue = queues().find((q) => q.id === queueId); 
    return queue
      ? queue.clips
          .map((id) => state.clips.find((clip) => clip.id === id))
          .filter((clip): clip is TwitchClip => Boolean(clip))
      : [];
  };

  const toggleClipInQueue = (clipId: string, queueId: string) => {
    setQueues((prev) =>
      prev.map((queue) =>
        queue.id === queueId
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
      setQueues([...queues(), { name, clips: [], id: generateUUID() }]);
      setNewQueueName('');
    }
  };

  const fetchClipByURL = async (url: string) => {
    try {
      const clipId = extractClipIdFromURL(url);
      const [clipData] = await getDataFromApi<TwitchClip>(TwitchApiEndpoints.CLIPS, { id: clipId });
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
    <div class="container mx-auto p-4">
      {/* Queue Selection */}
      <div class="mb-6">
        <h2 class="text-lg font-bold mb-2">Select a Queue</h2>
        <select
          class="p-2 border rounded w-full"
          onChange={(e) => setSelectedQueueId(e.currentTarget.value)}
        >
          <option value="all">All Clips</option>
          <For each={queues()}>
            {(queue) => (
              <option value={queue.id}>{queue.name}</option>
            )}
          </For>
        </select>
      </div>

      {/* Create New Queue */}
      <div class="mb-6">
        <input
          class="p-2 border rounded w-full mb-2"
          type="text"
          value={newQueueName()}
          onInput={(e) => setNewQueueName(e.currentTarget.value)}
          placeholder="New Queue Name"
        />
        <button
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={createClipQueue}
        >
          Create new queue
        </button>
      </div>

      {/* Add New Clip by URL */}
      <div class="mb-6">
        <h2 class="text-lg font-bold mb-2">Add New Clip by URL</h2>
        <input
          class="p-2 border rounded w-full mb-2"
          type="text"
          value={newClipURL()}
          onInput={(e) => setNewClipURL(e.currentTarget.value)}
          placeholder="Paste Twitch Clip URL"
        />
        <button
          class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={() => fetchClipByURL(newClipURL())}
        >
          Add Clip
        </button>
      </div>

      {/* Toggle Clip Selector */}
      <div class="mb-6">
        <button
          class="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          onClick={() => setShowClipSelector(!showClipSelector())}
        >
          {showClipSelector() ? "Hide Clip Selector" : "Show Clip Selector"}
        </button>
      </div>

      {/* Clip Selector */}
      <Show when={showClipSelector()}>
        <h2 class="text-lg font-bold mb-2">Select Clips to Add/Remove</h2>
        <div class="space-y-2">
          <For each={state.clips}>
            {(clip) => (
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={getClipsForQueue(selectedQueueId()).some((c) => c.id === clip.id)}
                  onChange={() => toggleClipInQueue(clip.id, selectedQueueId()!)}
                />
                <span>{clip.title}</span>
              </div>
            )}
          </For>
        </div>
      </Show>

      {/* Display Clips for Selected Queue */}
      <Show when={selectedQueueId() !== null}>
        <h2 class="text-lg font-bold mt-6">Clips</h2>
        <ClipsList clips={getClipsForQueue(selectedQueueId())} />
      </Show>
    </div>
  );
};

export default ClipManager;
