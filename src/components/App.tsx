import { Show, createSignal, onMount } from 'solid-js';
import { useState } from '../store';

import { enrichClipsWithGameDetails, getDataFromApi } from '../api/twitch';
import { getTwitchAuthToken } from '../store/config';
import ClipsList from './Clips/List';

const App = () => {
  const { state, setState } = useState();
 

  const clipByBroadcaster = { broadcaster_id: 985378831, first: 50 };

  onMount(async () => {
    await getTwitchAuthToken();
    try {
      const allClips = await getDataFromApi(import.meta.env.VITE_TWITCH_CLIPS, clipByBroadcaster);
      console.log("All clips", allClips);
      const enrichedClips = await enrichClipsWithGameDetails(allClips);
      console.log('Enriched Clips:', enrichedClips);
      
      setState('clips', enrichedClips);
 
    } catch (error) {
      console.error('Error fetching Twitch data:', error);
    }
  });

  return (
    <div>
      <h1 class="text-xl">Crafty clips</h1>
        <ClipsList clips={state.clips} />
        
    </div>
  );
};

export default App;
