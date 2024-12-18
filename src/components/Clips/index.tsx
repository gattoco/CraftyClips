import { createSignal, onMount, Show, For, createEffect } from "solid-js";
import { useState } from "../../store";
import { fetchClips, fetchUsers, fetchClipById } from "../util";
import ClipsList from "./List";
import {
  FaSolidArrowUp,
  FaSolidArrowDown,
  FaSolidSpinner,
} from "solid-icons/fa";
import { BsGrid3x3Gap, BsList } from "solid-icons/bs"; //listing layout for laters
import { VsRefresh } from "solid-icons/vs";
import Modal from "@lutaok/solid-modal";

const ClipSearchModal = () => {
  const [usersName, setUsersName] = createSignal<string>("");
  const [userResult, setUserResult] = createSignal<TwitchUser>();
  const [clipUrl, setClipUrl] = createSignal<string>("");
  const [clipResult, setClipResult] = createSignal<TwitchClip[]>();
  const [clipsCursor, setClipsCursor] = createSignal<string | null | undefined>(
    null
  );
  const [buttonLoading, setButtonLoading] = createSignal<boolean>(false);

  const [type, setType] = createSignal<string>("url");
  const getUserResults = async () => {
    const user = await fetchUsers(usersName());
    console.log(user);
    if (!user) {
      return;
    }
    setUserResult(user);
  };

  const getIdFromUrl = (url: string) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 1];
  };

  const clipSearch = async () => {
    const clip = await fetchClipById(getIdFromUrl(clipUrl()));
    if (!clip) {
      return;
    }
    setClipResult(clip);
  };

  return (
    <div class="mb-6 relative p-4 w-[30rem]">
      <h2 class="font-bold mb-2">Add clips by:</h2>
      <div class="flex items-center space-x-4 mb-4">
        <label
          class={`cursor-pointer py-1 px-4 rounded-full ${
            type() === "url"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <input
            type="radio"
            name="type"
            value="url"
            class="hidden"
            checked={type() === "url"}
            onChange={() => {
              setType("url");
              setClipResult();
            }}
          />
          URL
        </label>
        <label
          class={`cursor-pointer py-1 px-4 rounded-full ${
            type() === "broadcaster"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <input
            type="radio"
            name="type"
            value="broadcaster"
            class="hidden"
            checked={type() === "broadcaster"}
            onChange={() => {
              setType("broadcaster");
              setClipResult();
            }}
          />
          Broadcaster
        </label>
      </div>
      <Show when={type() === "url"}>
        <div class="mb-4">
          <input
            type="text"
            placeholder="Enter clip URL"
            value={clipUrl()}
            onInput={(e) => setClipUrl(e.currentTarget.value)}
            class="p-2 border rounded mr-2 w-full"
          />
          <button
            class="py-1 px-4 my-2 rounded-full bg-green-500 text-white"
            onClick={clipSearch}
          >
            Search for Clip
          </button>

          <Show when={clipResult() && clipResult()!.length > 0}>
            <ClipsList
              clips={clipResult() ? [clipResult()?.[0] as TwitchClip] : []}
              layout="list"
              withButtons={["add", "remove"]}
            />
          </Show>
        </div>
      </Show>

      <Show when={type() === "broadcaster"}>
        <div class="mb-4">
          <input
            type="text"
            placeholder="Enter broadcaster name"
            value={usersName()}
            onInput={(e) => setUsersName(e.currentTarget.value)}
            class="p-2 border rounded mr-2 w-full"
          />
          <button
            class="py-1 px-4 my-2 rounded-full bg-green-500 text-white"
            onClick={getUserResults}
          >
            Search for Broadcaster
          </button>

          <Show when={userResult()}>
            <div class="flex items-center space-x-4 bg-white p-2 hover:bg-gray-200 rounded-lg">
              <img
                src={userResult()?.profile_image_url}
                alt={userResult()?.display_name}
                class="w-12 h-12 rounded-full"
              />
              <div>
                <p class="font-semibold">{userResult()?.display_name}</p>
              </div>
              <div class="buttons">
                <a
                  class="py-1 px-4 rounded-full bg-purple-500 text-white"
                  href={`https://www.twitch.tv/${userResult()?.login}`}
                  target="_blank"
                >
                  View on Twitch
                </a>
                <button
                  class="py-1 px-4 rounded-full bg-green-500 text-white"
                  onClick={async () => {
                    if (!userResult()?.id) return;
                    setButtonLoading(true);
                    const [clips, cursor] = await fetchClips(userResult()?.id);
                    if (clips) {
                      setClipsCursor(cursor);
                      setClipResult(clips);
                    }
                    setButtonLoading(false);
                  }}
                >
                  {buttonLoading() ? (
                    <FaSolidSpinner class="animate-spin text-xl" />
                  ) : (
                    "Get Clips"
                  )}
                </button>
              </div>
            </div>
            <Show when={clipResult() && clipResult()!.length > 0}>
              <div class="flex max-h-[22rem] overflow-auto">
                <ClipsList
                  clips={clipResult()!}
                  layout="list"
                  withButtons={["add", "remove"]}
                />
              </div>
            </Show>
          </Show>
        </div>
      </Show>
    </div>
  );
};

const Clips = () => {
  const { state, setState } = useState();
  const [filteredClips, setFilteredClips] = createSignal<TwitchClip[]>([]);
  const [loading, setLoading] = createSignal<boolean>(true);
  const [sortField, setSortField] = createSignal<string>("added_at");
  const [sortOrder, setSortOrder] = createSignal<string>("desc");
  const [filterGameId, setFilterGameId] = createSignal<string>("");
  const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false);
  const [layoutType, setLayoutType] = createSignal<"grid" | "list">("grid");

  const resetFilters = (clips?: TwitchClip[]) => {
    if (!clips) {
      clips = state.clips;
    }
    const sortedClips = sortClips(clips, sortField(), "desc");
    setFilteredClips(sortedClips);
    setSortField("added_at");
    setSortOrder("desc");
    setFilterGameId("");
  };

  const refreshClips = async () => {
    setLoading(true);
    const [clips, cursor] = await fetchClips(state.broadcaster_id, 50);

    const weirdclips = clips?.filter((clip) => clip.thumbnail_url.includes("static-cdn.jtvnw.net"));

    console.log("weird clips", weirdclips);

    if (clips) {
      setState((prevState) => ({
        clipsCursor: cursor,
        clips: [...prevState.clips, ...clips],
        clipsUpdated: Date.now(),
      }));
    }
    filterAndSortClips();

    setLoading(false);
  };

  const shouldRefreshStaleData = () => {
    const ONE_HOUR = 3600 * 1000;
    const lastUpdated = state.clipsUpdated;

    return !lastUpdated || Date.now() - lastUpdated > ONE_HOUR;
  };

  onMount(() => {
    if (!state.clips.length && shouldRefreshStaleData()) {
      refreshClips();
    } else {
      resetFilters();
      setLoading(false);
    }
  });

  const sortClips = (clips: TwitchClip[], field: string, order: string) => {
    return [...clips].sort((a, b) => {
      let comparison = 0;
      if (
        field === "added_at" ||
        field === "created_at" ||
        field === "duration"
      ) {
        comparison =
          new Date(a[field] as string).getTime() -
          new Date(b[field] as string).getTime();
      } else if (field === "view_count") {
        comparison = a.view_count - b.view_count;
      }
      return order === "asc" ? comparison : -comparison;
    });
  };

  const filterAndSortClips = () => {
    let filtered = state.clips;
    if (filterGameId()) {
      filtered = filtered.filter((clip) => clip.game_id === filterGameId());
    }
    const sorted = sortClips(filtered, sortField(), sortOrder());
    setFilteredClips(sorted);
  };

  const handleSortChange = (value: string) => {
    setSortField(value);
    filterAndSortClips();
  };

  const handleGameIdFilterChange = (e: Event) => {
    setFilterGameId((e.target as HTMLSelectElement).value);
    filterAndSortClips();
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
    filterAndSortClips();
  };

  createEffect(() => {
    filterAndSortClips();
  }, [state.clips, sortField(), sortOrder(), filterGameId()]);

  return (
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center">
        <div class="flex gap-2">
          <h2 class="text-xl font-bold mb-4">Clips</h2>
          <button
            class="py-1 px-3 rounded-full bg-blue-500 text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Add clips
          </button>
        </div>
        <Show when={state.clipsUpdated}>
          <div>
            Last updated:{" "}
            {state.clipsUpdated
              ? new Date(state.clipsUpdated).toLocaleString()
              : "Never"}{" "}
            <button
              class="py-1 px-3 rounded-full bg-blue-500 text-white"
              onClick={refreshClips}
            >
              <VsRefresh />
            </button>
          </div>
        </Show>
      </div>
      <Show
        when={!loading()}
        fallback={
          <div class="flex justify-center items-center">
            <FaSolidSpinner class="animate-spin text-3xl" />
          </div>
        }
      >
        <div class="mb-6">
          <span class="font-semibold block mb-2">Filters</span>
          <div class="flex flex-wrap items-center space-x-4">
            <div class="flex space-x-2">
              <label
                class={`cursor-pointer py-1 px-3 rounded-full ${
                  sortField() === "added_at"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="sort"
                  value="added_at"
                  class="hidden"
                  checked={sortField() === "added_at"}
                  onChange={() => handleSortChange("added_at")}
                />
                Added At
              </label>
              <label
                class={`cursor-pointer py-1 px-3 rounded-full ${
                  sortField() === "created_at"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="sort"
                  value="created_at"
                  class="hidden"
                  checked={sortField() === "created_at"}
                  onChange={() => handleSortChange("created_at")}
                />
                Created At
              </label>
              <label
                class={`cursor-pointer py-1 px-3 rounded-full ${
                  sortField() === "view_count"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="sort"
                  value="view_count"
                  class="hidden"
                  checked={sortField() === "view_count"}
                  onChange={() => handleSortChange("view_count")}
                />
                View Count
              </label>
              <label
                class={`cursor-pointer py-1 px-3 rounded-full ${
                  sortField() === "duration"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="sort"
                  value="duration"
                  class="hidden"
                  checked={sortField() === "duration"}
                  onChange={() => handleSortChange("duration")}
                />
                Duration
              </label>
            </div>

            <div>
              <select
                id="gameFilter"
                onChange={handleGameIdFilterChange}
                class="p-2 border rounded"
              >
                <option value="">All Games</option>
                <For
                  each={Array.from(
                    new Map(
                      state.clips
                        .filter((clip) => clip.game?.id && clip.game?.name)
                        .map((clip) => [
                          clip.game?.id,
                          { id: clip.game?.id, name: clip.game?.name },
                        ])
                    ).values()
                  )}
                >
                  {(game) => <option value={game.id}>{game.name}</option>}
                </For>
              </select>
            </div>

            <div class="flex space-x-2 items-center">
              <button
                class="py-1 px-3 rounded-full flex items-center space-x-2 bg-blue-500 text-white"
                onClick={() =>
                  handleSortOrderChange(sortOrder() === "asc" ? "desc" : "asc")
                }
              >
                {sortOrder() === "asc" ? (
                  <>
                    <FaSolidArrowUp /> <span>Oldest</span>
                  </>
                ) : (
                  <>
                    <FaSolidArrowDown /> <span>Latest</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <ClipsList
          clips={filteredClips()}
          layout={layoutType()}
          withButtons={["visible"]}
        />
      </Show>

      <Modal
        isOpen={isModalOpen()}
        onCloseRequest={() => setIsModalOpen(false)}
        closeOnOutsideClick
      >
        <ClipSearchModal />
      </Modal>
    </div>
  );
};

export default Clips;
