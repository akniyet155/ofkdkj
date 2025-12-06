import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function Player({ url, t }) {
  const videoRef = useRef();

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      return () => { hls.destroy(); }
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
    }
  }, [url]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      width={480}
      height={270}
      onError={() => alert(t("playerError"))}
    />
  )
}
