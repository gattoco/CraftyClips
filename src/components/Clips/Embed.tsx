import { createSignal, onCleanup, onMount } from "solid-js";

interface ClipsEmbedProps {
  clips: TwitchClip[];
}

const ClipsEmbed = (props: ClipsEmbedProps) => {
  const [currentClipIndex, setCurrentClipIndex] = createSignal(0);

  const currentClip = () => props.clips[currentClipIndex()];
  const nextClip = () =>
    currentClipIndex() < props.clips.length - 1
      ? props.clips[currentClipIndex() + 1]
      : null;

  const handleNextClip = () => {
    if (currentClipIndex() < props.clips.length - 1) {
      setCurrentClipIndex(currentClipIndex() + 1);
    } else {
      console.log("End of queue.");
    }
  };

  const extractVideoUrl = (thumbnailUrl: string): string => {
    return thumbnailUrl.replace("-preview-480x272.jpg", ".mp4");
  };

  const setupClipEndListener = () => {
    const videoElement = document.getElementById("video-player") as HTMLVideoElement;
    if (videoElement) {
      videoElement.addEventListener("ended", handleNextClip);
      videoElement.addEventListener("error", handleNextClip); 
    }
  };

  const preloadNextClip = () => {
    const nextClipUrl = nextClip() ? extractVideoUrl(nextClip()!.thumbnail_url) : null;
    if (nextClipUrl) {
      const preloadLink = document.createElement("link");
      preloadLink.rel = "preload";
      preloadLink.as = "video";
      preloadLink.href = nextClipUrl;
      document.head.appendChild(preloadLink);

      onCleanup(() => {
        document.head.removeChild(preloadLink);
      });
    }
  };

  onMount(() => {
    setupClipEndListener();
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
        <>
          <video
            id="video-player"
            style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: -1;"
            src={extractVideoUrl(currentClip().thumbnail_url)}
            autoplay
            controls={false}
            muted={false}
            onLoadedData={preloadNextClip} 
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ClipsEmbed;
