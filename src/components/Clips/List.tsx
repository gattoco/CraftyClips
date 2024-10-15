import { For } from 'solid-js';
import { useState } from '../../store';

interface ClipsListProps {
    clips: TwitchClip[]; 
  }
  
  const ClipsList = (props: ClipsListProps) => {
    return (
      <ul class="flex items-center justify-between flex-wrap w-full gap-1">
        <For each={props.clips}>
          {(clip) => (
            <li class="w-full flex justify-start">
              <div class="w-[30%]">
                <img src={clip.thumbnail_url} alt={clip.title} />
              </div>
              <p>
                {clip.title}
                <br />
                Playing {clip.game?.name}
                <br />
                Created {new Date(clip.created_at).toLocaleString()} by {clip.creator_name}
                <br />
                <a href={clip.url} target="_blank" rel="noreferrer">Watch on Twitch</a>
                <a href={clip.embed_url} target="_blank" rel="noreferrer">Embed</a>
              </p>
            </li>
          )}
        </For>
      </ul>
    );
  };
  
  export default ClipsList;
