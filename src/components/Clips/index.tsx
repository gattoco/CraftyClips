import { createSignal, onMount, Show, For } from 'solid-js';
import { useState } from '../../store';
import { fetchClips, fetchUsers } from '../util';

import ClipsList from './List';
import { FaSolidArrowUp, FaSolidArrowDown, FaSolidSpinner } from 'solid-icons/fa';
import { VsRefresh } from 'solid-icons/vs'


const UserSearch = () => {
    const [usersName, setUsersName] = createSignal<string>("");
    const [userResult, setUserResult] = createSignal<TwitchUser>();
    const getUserResults = async () => {
        const user = await fetchUsers(usersName());
        if (!user) {
          return;
        }
        setUserResult(user);
      };

    return (
        <div class="mb-6 relative">
            <input
            type="text"
            placeholder="Enter broadcaster name"
            value={usersName()}
            onInput={(e) => setUsersName(e.currentTarget.value)}
            class="p-2 border rounded mr-2"
            />
            <button
            class="py-1 px-3 rounded-full bg-green-500 text-white"
            onClick={getUserResults}
            >
            Search for Broadcaster
            </button>
            <Show when={userResult()} >
                <div class="flex items-center space-x-4 absolute bg-white p-2 hover:bg-grey">
                    <img src={userResult()?.profile_image_url} alt={userResult()?.display_name} class="w-12 h-12 rounded-full" />
                    <div>
                    <p class="font-semibold">{userResult()?.display_name}</p>
                    </div>
                </div>
            </Show>
        </div>
    )
}

const Clips = () => {
  const { state, setState } = useState();
  const [filteredClips, setFilteredClips] = createSignal<TwitchClip[]>([]); 
  const [loading, setLoading] = createSignal<boolean>(true); 
  const [sortField, setSortField] = createSignal<string>("created_at"); 
  const [sortOrder, setSortOrder] = createSignal<string>("desc"); 
  const [filterGameId, setFilterGameId] = createSignal<string>(""); 



  // Function to sort and filter clips
  const resetFilters = (clips?:TwitchClip[]) => {
    if (!clips) {
      clips = state.clips;
    }
    const sortedClips = sortClips(clips, sortField(), 'desc');
    setFilteredClips(sortedClips);
    setSortField('created_at');
    setSortOrder('desc');
    setFilterGameId('');
  };

  const refreshClips = async () => {
    setLoading(true);
    const clips = await fetchClips();
    if (clips) {
        setState('clips', clips);
        setState("clipsUpdated", Date.now()); // Store the current timestamp
    }
    setLoading(false);
  };
  const shouldRefreshStaleData = () => {
    const ONE_HOUR = 3600 * 1000; 
    const lastUpdated = state.clipsUpdated;

    return !lastUpdated || Date.now() - lastUpdated > ONE_HOUR
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
      if (field === "created_at" || field === "duration") {
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







  return (
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold mb-4">Clips</h2>
          <Show when={state.clipsUpdated}>
              <div>
                Last updated: {state.clipsUpdated ? new Date(state.clipsUpdated).toLocaleString() : 'Never'}{' '}
                <button
                  class="py-1 px-3 rounded-full bg-blue-500 text-white"
                  onClick={refreshClips}
                >
                  <VsRefresh />
                </button>
              </div>
          </Show>
      </div>

        <UserSearch />

      <div class="mb-6">
        <span class="font-semibold block mb-2">Filters</span>
        <div class="flex flex-wrap items-center space-x-4">
          <div class="flex space-x-2">
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
                  new Set(state.clips.map((clip) => clip.game?.name))
                )}
              >
                {(game) => <option value={game}>{game}</option>}
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

      <Show
        when={!loading()}
        fallback={
          <div class="flex justify-center items-center">
            <FaSolidSpinner class="animate-spin text-3xl" />
          </div>
        }
      >
        <ClipsList clips={filteredClips()} />
      </Show>
    </div>
  );
};

export default Clips;
