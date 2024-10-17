import { For } from 'solid-js';
import { useState } from '../../store';

interface ClipsListProps {
  clips: TwitchClip[];
}

const ClipsList = (props: ClipsListProps) => {
  return (
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      <For each={props.clips}>
        {(clip) => (
          <li class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="w-full">
              <img src={clip.thumbnail_url} alt={clip.title} class="w-full h-auto object-cover" />
            </div>
            <div class="p-4">
              <p class="font-semibold text-lg">{clip.title}</p>
              <p class="text-sm text-gray-500">Playing {clip.game?.name}</p>
              <p class="text-sm text-gray-500">
                Created {new Date(clip.created_at).toLocaleString()} by {clip.creator_name}
              </p>
              <p class="text-sm text-gray-500">
                Views {clip.view_count} | Duration {clip.duration} seconds
              </p>
              <div class="mt-2 space-x-2">
                <a
                  href={clip.url}
                  target="_blank"
                  rel="noreferrer"
                  class="text-blue-500 hover:underline"
                >
                  Watch on Twitch
                </a>
                <a
                  href={clip.embed_url}
                  target="_blank"
                  rel="noreferrer"
                  class="text-blue-500 hover:underline"
                >
                  Embed
                </a>
              </div>
            </div>
          </li>
        )}
      </For>
    </ul>
  );
};

export default ClipsList;
