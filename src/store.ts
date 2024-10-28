import { createContextProvider } from "@solid-primitives/context";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";

interface AppState {
  show: boolean;
  clips: TwitchClip[];
  clipsUpdated: number | null;
  clipsCursor: string | undefined;
  clipQueue: ClipQueue[];
  broadcaster_id: string;
}

export const INITIAL_STATE: AppState = {
  show: false,
  clips: [],
  clipQueue: [],
  clipsUpdated: null,
  clipsCursor: undefined,
  broadcaster_id: "985378831",
};

const devData: Partial<AppState> = {
  show: true,
  clipQueue: [
    {
      name: "test",
      clips: [
        "FlaccidIntelligentBisonHumbleLife-CP0eLCrk9la_kzfu",
        "HungryDrabMarjoramCharlietheUnicorn-KbfYLQCg9DI3jK3K",
      ],
      id: "0f37b791-a231-4933-953c-74a1b080f2e9",
    },
  ],
  broadcaster_id: "985378831", // craftingchaosgaming hardcoded. will do something proper with auth later
};

function persistStateToLocalStorage(state: AppState) {
  localStorage.setItem("state", JSON.stringify(state));
}

function loadStateFromLocalStorage(): AppState | null {
  const storedState = localStorage.getItem("state");
  return storedState ? JSON.parse(storedState) : null;
}

export const [ContextProvider, useState] = createContextProvider(() => {
  const storedState = loadStateFromLocalStorage();
  
  const initialState = import.meta.env.MODE === "development"
    ? { ...INITIAL_STATE, ...devData }
    : storedState || INITIAL_STATE;

  const [state, setState] = createStore<AppState>(initialState);

  createEffect(() => {
    persistStateToLocalStorage(state);
  });

  return {
    state,
    setState,
  };
},
{
  state: INITIAL_STATE,
  setState: () => {}
});


// clips: [{
//     "id": "StormyDrabInternPartyTime-3IaQrlGNRsscQU08",
//     "url": "https://clips.twitch.tv/StormyDrabInternPartyTime-3IaQrlGNRsscQU08",
//     "embed_url": "https://clips.twitch.tv/embed?clip=StormyDrabInternPartyTime-3IaQrlGNRsscQU08",
//     "broadcaster_id": "985378831",
//     "broadcaster_name": "craftingchaosgaming",
//     "creator_id": "985378831",
//     "creator_name": "craftingchaosgaming",
//     "video_id": "",
//     "game_id": "1864374139",
//     "language": "en",
//     "title": "Tamagotchi Crafty receives snacks for good performance.",
//     "view_count": 161,
//     "created_at": "2024-03-01T14:22:32Z",
//     "thumbnail_url": "https://clips-media-assets2.twitch.tv/rZvX7tyGkK5RjUbLHEFNPA/43723038315-offset-8196-preview-480x272.jpg",
//     "duration": 30,
//     "vod_offset": null,
//     "is_featured": true
// }],
