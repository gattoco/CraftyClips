import { For, splitProps } from 'solid-js';

interface ClipsListProps {
  clips: TwitchClip[];
  layout?: 'grid' | 'list'; 
}

const ClipsList = (props: ClipsListProps) => {
  console.log("ClipsList props", props);
  const [local] = splitProps(props, ['clips', 'layout']); // Destructure props for reactivity
  const isGridLayout = local.layout === 'grid'; 

  return (
    <ul
      class={
        isGridLayout
          ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'
          : 'space-y-4 w-full' 
      }
    >
      <For each={props.clips}>
        {(clip) => (
          <li
            class={
              isGridLayout
                ? 'bg-white shadow-lg rounded-lg overflow-hidden'
                : 'bg-white shadow-lg rounded-lg flex items-start overflow-hidden' 
            }
          >
            <div class={isGridLayout ? 'w-full' : 'w-48'}>
              <img
                src={clip.thumbnail_url}
                alt={clip.title}
                class={isGridLayout ? 'w-full h-auto object-cover' : 'w-full h-auto rounded-lg'}
              />
            </div>
            <div class={isGridLayout ? 'p-4' : 'p-4 flex-1'}>
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
