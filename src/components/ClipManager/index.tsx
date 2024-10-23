import { createSignal, For, Show } from "solid-js";
import { useState } from "../../store";
import ClipsList from "../Clips/List";
import { generateUUID } from "../../store/config";

const ClipManager = () => {
  const { state, setState } = useState();
  const [queues, setQueues] = createSignal<ClipQueue[]>(state.clipQueue ?? []);
  const [selectedQueue, setSelectedQueue] = createSignal<ClipQueue | null>(null); 
  const [newQueueName, setNewQueueName] = createSignal("");
  const [showClipSelector, setShowClipSelector] = createSignal(false);

  const getClipsForQueue = (queue: ClipQueue | null) => {
    if (!queue) return state.clips;
    return queue.clips
      .map((id) => state.clips.find((clip) => clip.id === id))
      .filter((clip): clip is TwitchClip => Boolean(clip));
  };

  const toggleClipInQueue = (clipId: string) => {
    if (!selectedQueue()) return; 

    const updatedQueue = {
      ...selectedQueue()!,
      clips: selectedQueue()!.clips.includes(clipId)
        ? selectedQueue()!.clips.filter((id) => id !== clipId)
        : [...selectedQueue()!.clips, clipId],
    };

    setSelectedQueue(updatedQueue);
    setQueues((prev) =>
      prev.map((queue) => (queue.id === updatedQueue.id ? updatedQueue : queue))
    );
    setState("clipQueue", [...queues()]); 
  };

  const createClipQueue = () => {
    const name = newQueueName().trim();
    if (name) {
      const newQueue = { name, clips: [], id: generateUUID() };
      setQueues([...queues(), newQueue]);
      setNewQueueName("");
      setState("clipQueue", [...queues(), newQueue]); 
    }
  };

  const handleQueueSelection = (queueId: string) => {
    if (queueId === "all") {
      setSelectedQueue(null);
    } else {
      const queue = queues().find((q) => q.id === queueId) || null;
      setSelectedQueue(queue);
    }
  };

  return (
    <div class="container mx-auto p-4">
      <div class="mb-6">
        <h2 class="text-lg font-bold mb-2">Select a Queue</h2>
        <select
          class="p-2 border rounded w-full"
          onChange={(e) => handleQueueSelection(e.currentTarget.value)}
        >
          <option value="all">All Clips</option>
          <For each={queues()}>
            {(queue) => <option value={queue.id}>{queue.name}</option>}
          </For>
        </select>
      </div>

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

      <div class="mb-6">
        <button
          class="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          onClick={() => setShowClipSelector(!showClipSelector())}
        >
          {showClipSelector() ? "Hide Clip Selector" : "Show Clip Selector"}
        </button>
      </div>

      <Show when={showClipSelector()}>
        <h2 class="text-lg font-bold mb-2">Select Clips to Add/Remove</h2>
        <div class="space-y-2">
          <For each={state.clips}>
            {(clip) => (
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={getClipsForQueue(selectedQueue()).some((c) => c.id === clip.id)}
                  onChange={() => toggleClipInQueue(clip.id)}
                />
                <span>{clip.title}</span>
              </div>
            )}
          </For>
        </div>
      </Show>

      <Show when={selectedQueue() !== null || selectedQueue() === null}>
        <h2 class="text-lg font-bold mt-6">
          {selectedQueue() ? `Queue: ${selectedQueue()?.name}` : "All Clips"}
        </h2>
        <div class="mt-4">
          <a
            href={`/clips/clipmanager/${selectedQueue() ? selectedQueue()!.id : "all"}`}
            class="text-blue-500 underline"
          >
            View queue
          </a>
        </div>


        <ClipsList clips={getClipsForQueue(selectedQueue())} />
      </Show>
    </div>
  );
};

export default ClipManager;
