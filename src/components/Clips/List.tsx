import { createSignal, onMount } from 'solid-js';
 

const ClipsList = (props: any) => {
    console.log(props);
    const [clipData, setClipData] = createSignal(props.clips);
  return (
    <ul class="flex items-center justify-between flex-wrap w-full gap-1">
        {clipData().map((clip: TwitchClip) => (
            <li class="w-[30%]">
                <div>
                    <img src={clip.thumbnail_url} alt={clip.title} />
                </div>
                <p>{clip.title}</p>
            </li>
        ))}
    </ul>
  );
};

export default ClipsList;
