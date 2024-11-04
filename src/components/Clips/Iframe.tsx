import { createSignal, createEffect } from "solid-js";

interface ClipsIframeProps {
  clips: TwitchClip[];
}

const ClipsIframe = (props: ClipsIframeProps) => {
  const [currentClipIndex, setCurrentClipIndex] = createSignal(0);

  const currentClip = () => props.clips[currentClipIndex()];

  const handleNextClip = () => {
    console.log(currentClipIndex() < props.clips.length - 1, currentClipIndex(), props.clips.length - 1);
    // if (currentClipIndex() < props.clips.length - 1) {
    //   setCurrentClipIndex(currentClipIndex() + 1);
    // } else {
    //   setCurrentClipIndex(0); // Restart from the first clip
    // }
  };

  const getTwitchEmbedUrl = (clipId: string) => {
    return `https://clips.twitch.tv/embed?clip=${clipId}&autoplay=true&parent=${window.location.hostname}&preload=auto`;
  };



  createEffect(() => {
    const iframe = document.getElementById("twitch-embed") as HTMLIFrameElement;
    console.log(props.clips, iframe);
    if (iframe) {
      const onMessage = (event: MessageEvent) => {
        if (event.data.event === "video.ended") {
        console.log("Received message from Twitch:", event);

            console.log("Video ended, moving to the next clip.");
          handleNextClip();
        } else if (event.data.event === "player.error") {
          console.error("Player error:", event.data);
          handleNextClip(); // Skip on error
        }
      };

      window.addEventListener("message", onMessage);

      iframe.src = getTwitchEmbedUrl(currentClip().id);

      return () => {
        window.removeEventListener("message", onMessage);
      };
    }
  });

  return (
    <>
      {currentClip() ? (
        <iframe
          id="twitch-embed"
          style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"
          src={`https://clips.twitch.tv/embed?clip=${currentClip().id}&autoplay=true&parent=${window.location.hostname}&preload=auto`}
        />
      ) : (
        <p>No clips to play.</p>
      )}
    </>
  );
};

export default ClipsIframe;
