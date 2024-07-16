import { Show, createSignal, onMount } from 'solid-js';
import { useState } from '../store';

import { getDataFromApi } from '../api/twitch';
import { getTwitchAuthToken } from '../store/config';
import ClipsList from './Clips/List';

const App = () => {
    const { state, setState } = useState();

  const [clipData, setClipData] = createSignal([]);

  const clipByBroadcaster = { broadcaster_id: 985378831, first: 50 };

  onMount(async () => {
    await getTwitchAuthToken();
    try {
      const allClips = await getDataFromApi(import.meta.env.VITE_TWITCH_CLIPS, clipByBroadcaster);
      console.log(allClips);
      setClipData(allClips);
    } catch (error) {
      console.error('Error fetching Twitch data:', error);
    }
  });

  return (
    <div>
      <h1>All clips</h1>
      <Show when={clipData().length > 0}>
        <ClipsList clips={clipData()} />
    </Show>     
        
    </div>
  );
};

export default App;
