import { createSignal, onMount, createEffect, onCleanup } from "solid-js";
import { getDirectUrl } from "../../api/twitch";

interface ClipsEmbedProps {
  clips: TwitchClip[];
}

const ClipsEmbed = (props: ClipsEmbedProps) => {
  const [currentClipIndex, setCurrentClipIndex] = createSignal(0);
  const [nextClipUrl, setNextClipUrl] = createSignal<string | null>(null);

  const currentClip = () => props.clips[currentClipIndex()];
  const nextClip = () =>
    currentClipIndex() < props.clips.length - 1
      ? props.clips[currentClipIndex() + 1]
      : null;

  const handleNextClip = () => {
    if (currentClipIndex() < props.clips.length - 1) {
      setCurrentClipIndex(currentClipIndex() + 1);
    } else {
      console.log("End of queue, restarting from the first clip.");
      setCurrentClipIndex(0);
    }
  };

  const extractVideoUrl = async (clipId: string): Promise<string> => {
    const videoUrl = await getDirectUrl(clipId);
    return videoUrl || "";
  };

  const preloadNextClip = async () => {
    const nextClipData = nextClip();
    if (nextClipData) {
      const nextUrl = await extractVideoUrl(nextClipData.id);
      setNextClipUrl(nextUrl);
      console.log(`Preloading next video URL: ${nextUrl}`);
    }
  };

  createEffect(async () => {
    const clipData = currentClip();
    if (clipData) {
      const videoElement = document.getElementById("video-player") as HTMLVideoElement;
      if (videoElement) {
        videoElement.src = await extractVideoUrl(clipData.id);
        videoElement.muted = true; // Ensure autoplay works
        videoElement.play().catch((err) => {
          console.error(`Error starting playback for clip ${clipData.id}:`, err);
        });

        videoElement.addEventListener("loadeddata", preloadNextClip, { once: true });
      }
    }
  });

  onMount(() => {
    const videoElement = document.getElementById("video-player") as HTMLVideoElement;
    if (videoElement) {
      videoElement.addEventListener("ended", handleNextClip);
      videoElement.addEventListener("error", handleNextClip);
    }
  });

  onCleanup(() => {
    const videoElement = document.getElementById("video-player") as HTMLVideoElement;
    if (videoElement) {
      videoElement.removeEventListener("ended", handleNextClip);
      videoElement.removeEventListener("error", handleNextClip);
    }
  });

  return (
    <>
      {currentClip() ? (
        <video
          id="video-player"
          style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: -1;"
          autoplay
          controls={false}
          muted={true}
        />
      ) : (
        <p>No clips to play.</p>
      )}
    </>
  );
};

export default ClipsEmbed;
