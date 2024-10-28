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
//   clips: [
//     {
//         "id": "SmallUglyAniseDoggo-aeF82fZNHgfm9WJV",
//         "url": "https://clips.twitch.tv/SmallUglyAniseDoggo-aeF82fZNHgfm9WJV",
//         "embed_url": "https://clips.twitch.tv/embed?clip=SmallUglyAniseDoggo-aeF82fZNHgfm9WJV",
//         "broadcaster_id": "985378831",
//         "broadcaster_name": "CraftingChaosGaming",
//         "creator_id": "274844814",
//         "creator_name": "LostInTheSoundOfYou",
//         "video_id": "2239591650",
//         "game_id": "6959",
//         "language": "en",
//         "title": "Eco Creator wrap-up with the incredible w4stedspace",
//         "view_count": 29,
//         "created_at": "2024-09-01T09:32:54Z",
//         "thumbnail_url": "https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/SmallUglyAniseDoggo-aeF82fZNHgfm9WJV/0e541f28-81a4-4a27-9e00-f42d36b6f8d5/preview-480x272.jpg",
//         "duration": 38.6,
//         "vod_offset": 9218,
//         "is_featured": false,
//         "game": {
//             "id": "6959",
//             "name": "Eco",
//             "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/6959_IGDB-{width}x{height}.jpg",
//         },
//         "added_at": "2024-09-01T09:32:54Z"
//     },
//     {
//         "id": "WisePoisedPuppySoonerLater-RUs-XBUmGK5A7HxH",
//         "url": "https://clips.twitch.tv/WisePoisedPuppySoonerLater-RUs-XBUmGK5A7HxH",
//         "embed_url": "https://clips.twitch.tv/embed?clip=WisePoisedPuppySoonerLater-RUs-XBUmGK5A7HxH",
//         "broadcaster_id": "985378831",
//         "broadcaster_name": "CraftingChaosGaming",
//         "creator_id": "32523266",
//         "creator_name": "Krusherdom",
//         "video_id": "",
//         "game_id": "6959",
//         "language": "en",
//         "title": "The vibes are immaculate",
//         "view_count": 29,
//         "created_at": "2024-08-20T10:50:46Z",
//         "thumbnail_url": "https://clips-media-assets2.twitch.tv/YYpyL0VLPlwVJhiuQOx8Rw/AT-cm%7CYYpyL0VLPlwVJhiuQOx8Rw-preview-480x272.jpg",
//         "duration": 6,
//         "vod_offset": null,
//         "is_featured": true,
//         "game": {
//             "id": "6959",
//             "name": "Eco",
//             "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/6959_IGDB-{width}x{height}.jpg",
//         },
//         "added_at": "2024-08-20T10:50:46Z"
//     },
//     {
//         "id": "ObeseThoughtfulHerringOSsloth-fhKPd37k8tq5MfRA",
//         "url": "https://clips.twitch.tv/ObeseThoughtfulHerringOSsloth-fhKPd37k8tq5MfRA",
//         "embed_url": "https://clips.twitch.tv/embed?clip=ObeseThoughtfulHerringOSsloth-fhKPd37k8tq5MfRA",
//         "broadcaster_id": "985378831",
//         "broadcaster_name": "CraftingChaosGaming",
//         "creator_id": "621232065",
//         "creator_name": "minionprimenumber",
//         "video_id": "",
//         "game_id": "1864374139",
//         "language": "en",
//         "title": "Betrayal of Bass Reeves",
//         "view_count": 29,
//         "created_at": "2024-03-12T14:02:31Z",
//         "thumbnail_url": "https://clips-media-assets2.twitch.tv/6PQvCH4Sj3d-5PLauTH0QA/AT-cm%7C6PQvCH4Sj3d-5PLauTH0QA-preview-480x272.jpg",
//         "duration": 35.6,
//         "vod_offset": null,
//         "is_featured": false,
//         "game": {
//             "id": "1864374139",
//             "name": "Nightingale",
//             "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/1864374139_IGDB-{width}x{height}.jpg",
//         },
//         "added_at": "2024-03-12T14:02:31Z"
//     },
//     {
//         "id": "BumblingVictoriousChipmunkFutureMan-ZopCFrm4L4ethw6C",
//         "url": "https://clips.twitch.tv/BumblingVictoriousChipmunkFutureMan-ZopCFrm4L4ethw6C",
//         "embed_url": "https://clips.twitch.tv/embed?clip=BumblingVictoriousChipmunkFutureMan-ZopCFrm4L4ethw6C",
//         "broadcaster_id": "985378831",
//         "broadcaster_name": "CraftingChaosGaming",
//         "creator_id": "985378831",
//         "creator_name": "CraftingChaosGaming",
//         "video_id": "",
//         "game_id": "1864374139",
//         "language": "en",
//         "title": "New fr-enemy?",
//         "view_count": 29,
//         "created_at": "2024-02-28T11:16:38Z",
//         "thumbnail_url": "https://clips-media-assets2.twitch.tv/fLE61WaKQha5uC-HrYcOgg/43709744411-offset-3692-preview-480x272.jpg",
//         "duration": 26,
//         "vod_offset": null,
//         "is_featured": true,
//         "game": {
//             "id": "1864374139",
//             "name": "Nightingale",
//             "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/1864374139_IGDB-{width}x{height}.jpg",
//         },
//         "added_at": "2024-02-28T11:16:38Z"
//     }
//   ],
  clipQueue: [
    {
      name: "test",
      clips: [
        "SmallUglyAniseDoggo-aeF82fZNHgfm9WJV",
        "WisePoisedPuppySoonerLater-RUs-XBUmGK5A7HxH",
        "ObeseThoughtfulHerringOSsloth-fhKPd37k8tq5MfRA",
        "BumblingVictoriousChipmunkFutureMan-ZopCFrm4L4ethw6C",
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
