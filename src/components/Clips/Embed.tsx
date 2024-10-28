import { createSignal, onCleanup, onMount, createEffect } from "solid-js";

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
      console.log("End of queue, restarting from the first clip.");
      setCurrentClipIndex(0); // Reset to the first clip after finishing
    }
  };

  //https://clips-media-assets2.twitch.tv/Dx4uv0SdHNvL6Crcgv8fiw/41446584199-offset-976.mp4

//   This clip
//   https://clips.twitch.tv/WisePoisedPuppySoonerLater-RUs-XBUmGK5A7HxH
//   Uses this thumbnail
//   https://clips-media-assets2.twitch.tv/YYpyL0VLPlwVJhiuQOx8Rw/AT-cm%7CYYpyL0VLPlwVJhiuQOx8Rw-preview-480x272.jpg
//   Which I use to get the mp4 to play in the queue thingy (avoiding twitch video player itself)
//   https://clips-media-assets2.twitch.tv/YYpyL0VLPlwVJhiuQOx8Rw/AT-cm%7CYYpyL0VLPlwVJhiuQOx8Rw.mp4

//   But this clip 
//   https://clips.twitch.tv/SmallUglyAniseDoggo-aeF82fZNHgfm9WJV
//   Gives this thumbnail
//   https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/SmallUglyAniseDoggo-aeF82fZNHgfm9WJV/0e541f28-81a4-4a27-9e00-f42d36b6f8d5/preview-480x272.jpg
//   Which doesnt give us a nice way of finding the mp4.

  //https://production.assets.clips.twitchcdn.net/v2/media/SmallUglyAniseDoggo-aeF82fZNHgfm9WJV/0e541f28-81a4-4a27-9e00-f42d36b6f8d5/video.mp4
  //https://production.assets.clips.twitchcdn.net/v2/media/SmallUglyAniseDoggo-aeF82fZNHgfm9WJV/0e541f28-81a4-4a27-9e00-f42d36b6f8d5/video.mp4?sig=affc7a3a0e79043a5cd3cbcc2c2409132f6a1ec9&token=%7B%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22clip_uri%22%3A%22%22%2C%22clip_slug%22%3A%22SmallUglyAniseDoggo-aeF82fZNHgfm9WJV%22%2C%22device_id%22%3A%22eoeIGdlqsYNOWdqoQOS5PSFSywE72KJq%22%2C%22expires%22%3A1729878025%2C%22user_id%22%3A%2239358936%22%2C%22version%22%3A2%7D
  //https://production.assets.clips.twitchcdn.net/YYpyL0VLPlwVJhiuQOx8Rw/AT-cm%7CYYpyL0VLPlwVJhiuQOx8Rw.mp4?sig=2438980207579825ccc8ae60a507da3359b95dc9&token=%7B%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22clip_uri%22%3A%22https%3A%2F%2Fproduction.assets.clips.twitchcdn.net%2FYYpyL0VLPlwVJhiuQOx8Rw%2FAT-cm%257CYYpyL0VLPlwVJhiuQOx8Rw.mp4%22%2C%22clip_slug%22%3A%22WisePoisedPuppySoonerLater-RUs-XBUmGK5A7HxH%22%2C%22device_id%22%3A%22eoeIGdlqsYNOWdqoQOS5PSFSywE72KJq%22%2C%22expires%22%3A1729879126%2C%22user_id%22%3A%2239358936%22%2C%22version%22%3A2%7D
  const extractVideoUrl = (thumbnailUrl: string): string => {
    const videoUrl = thumbnailUrl.replace("-preview-480x272.jpg", ".mp4");
    console.log(`Extracted video URL: ${videoUrl}`);
    return videoUrl;
  };

  const setupClipEndListener = () => {
    const videoElement = document.getElementById("video-player") as HTMLVideoElement;
    if (videoElement) {
      videoElement.addEventListener("ended", handleNextClip);
      videoElement.addEventListener("error", (error) => {
        console.error(
          `Error loading video for clip ${currentClip()?.id} at index ${currentClipIndex()}:`,
          error
        );
        handleNextClip(); // Move to the next clip on error
      });
    }
  };

  const preloadNextClip = () => {
    const nextClipData = nextClip();
    const nextClipUrl = nextClipData ? extractVideoUrl(nextClipData.thumbnail_url) : null;
    if (nextClipUrl) {
      console.log(`Preloading next video URL: ${nextClipUrl}`);
      const preloadLink = document.createElement("link");
      preloadLink.rel = "preload";
      preloadLink.as = "video";
      preloadLink.href = nextClipUrl;
      document.head.appendChild(preloadLink);

      return () => {
        document.head.removeChild(preloadLink);
        console.log(`Removed preload for: ${nextClipUrl}`);
      };
    }
  };

  createEffect(() => {
    const currentClipData = currentClip();
    if (currentClipData) {
      console.log(`Playing clip at index ${currentClipIndex()}:`, currentClipData);
    }
    const cleanupPreload = preloadNextClip(); // Preload next clip and store cleanup function

    const videoElement = document.getElementById("video-player") as HTMLVideoElement;
    if (videoElement) {
      videoElement.src = extractVideoUrl(currentClip().thumbnail_url);
      videoElement.play().catch((err) => {
        console.error(`Error starting playback for clip ${currentClip()?.id}:`, err);
      });
    }

    return () => {
      cleanupPreload?.(); // Cleanup the preloaded link
    };
  });

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
          />
        </>
      ) : (
        <p>No clips to play.</p>
      )}
    </>
  );
};

export default ClipsEmbed;
