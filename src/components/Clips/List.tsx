import { useState } from '../../store';


const ClipsList = () => {
    const { state, setState } = useState();

  return (
    <ul class="flex items-center justify-between flex-wrap w-full gap-1">
        {state.clips.map((clip: TwitchClip) => (
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
