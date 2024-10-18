import { For, Show, splitProps } from "solid-js";
import { useState } from "../../store";
import Button from "../Shared/button";
import { FaSolidEye, FaSolidEyeSlash } from "solid-icons/fa";

interface ClipsListProps {
  clips: TwitchClip[];
  layout?: "grid" | "list";
  withButtons?: string[];
}

const ClipsList = (props: ClipsListProps) => {
  const [local] = splitProps(props, ["clips", "layout"]);
  const isGridLayout = local.layout === "grid";
  if (!props.clips.length) {
    return <p>No clips found</p>;
  }
  const { state, setState } = useState();

  // withButton functions
  const handleAddClip = (clip: TwitchClip) => {
    console.log("clip", clip);
    const clipAdded: TwitchClip = {
      ...clip,
      added_at: new Date().toISOString(),
    };

    setState("clips", [...state.clips, clipAdded]);
  };

  const handleRemoveClip = (clipId: string) => {
    const clipIndex = state.clips.findIndex((clip) => clip?.id === clipId);

    if (clipIndex !== -1) {
      setState(
        "clips",
        state.clips.filter((clip, index) => index !== clipIndex)
      );
    }
  };

  const handleVisibilityClip = (clipId: string) => {
    const clipIndex = state.clips.findIndex((clip) => clip?.id === clipId);

    if (clipIndex !== -1) {
      setState("clips", clipIndex, "visible", (visible) =>
        visible === false ? true : false
      );
    }
  };

  const clipExistsInState = (clipId: string) => {
    return state.clips.some((clip) => clip?.id === clipId);
  };

  return (
    <ul
      class={
        isGridLayout
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
          : "space-y-4 w-full"
      }
    >
      <For each={props.clips}>
        {(clip) => (
          <li
            class={`
              ${
                isGridLayout
                  ? "bg-white shadow-lg rounded-lg overflow-hidden group relative"
                  : "bg-white rounded-lg flex items-start overflow-hidden group relative"
              } 
              ${clip?.visible === false ? "opacity-50" : "opacity-100"}
            `}
          >
            <div class={isGridLayout ? "w-full" : "w-48"}>
              <img
                src={clip?.thumbnail_url}
                alt={clip?.title}
                class={
                  isGridLayout
                    ? "w-full h-auto object-cover"
                    : "w-full h-auto rounded-lg"
                }
              />
              <Show when={clip.broadcaster_id === state.broadcaster_id}>
                <button
                  class={`absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                    clip?.visible === false ? "opacity-100" : "opacity-0"
                  }`}
                  onClick={() => handleVisibilityClip(clip.id)}
                >
                  {clip.visible === false ? (
                    <FaSolidEyeSlash />
                  ) : (
                    <FaSolidEye />
                  )}
                </button>
              </Show>
            </div>
            <div class={isGridLayout ? "p-4" : "p-4 flex-1"}>
              <p class="font-semibold text-lg">{clip?.title}</p>
              <p class="text-sm text-gray-500">Playing {clip?.game?.name}</p>
              <p class="text-sm text-gray-500">
                Created {new Date(clip?.created_at).toLocaleString()} by{" "}
                {clip?.creator_name}
              </p>
              <p class="text-sm text-gray-500">
                Views {clip?.view_count} | Duration {clip?.duration} seconds
              </p>
              <div class="mt-2 space-x-2">
                <a
                  href={clip?.url}
                  target="_blank"
                  rel="noreferrer"
                  class="text-blue-500 hover:underline"
                >
                  Watch on Twitch
                </a>
                <a
                  href={clip?.embed_url}
                  target="_blank"
                  rel="noreferrer"
                  class="text-blue-500 hover:underline"
                >
                  Embed
                </a>
              </div>
              <div class="mt-2 space-x-2">
                <Show when={clip.broadcaster_id !== state.broadcaster_id}>
                  <Show when={!clipExistsInState(clip.id)}>
                    <Button
                      label="Add"
                      action={handleAddClip}
                      arg={clip}
                      color="bg-green-500"
                    />
                  </Show>
                  <Show when={clipExistsInState(clip.id)}>
                    <Button
                      label="Remove"
                      action={handleRemoveClip}
                      arg={clip.id}
                      color="bg-red-500"
                    />
                  </Show>
                </Show>
              </div>
            </div>
          </li>
        )}
      </For>
    </ul>
  );
};

export default ClipsList;
