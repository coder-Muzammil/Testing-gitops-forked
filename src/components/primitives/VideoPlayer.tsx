function VideoPlayer({ url, muted }: { url: string; muted: boolean }) {
  return (
    <video
      id="video-player"
      src={url}
      className="aspect-video w-full rounded-2xl bg-black"
      controls
      muted={muted}
    />
  );
}

export default VideoPlayer;
