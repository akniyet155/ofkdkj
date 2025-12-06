import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function Player({ url, t }) {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
      });
      
      return () => { 
        hls.destroy(); 
      }
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
      videoRef.current.addEventListener('loadeddata', () => setIsLoading(false));
    }
  }, [url]);

  return (
    <div className="video-container">
      <div className="video-wrapper">
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            color: '#fff',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            ⏳ Загрузка...
          </div>
        )}
        <div className="video-overlay"></div>
        <video
          ref={videoRef}
          controls
          autoPlay
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => alert(t("playerError"))}
          style={{
            width: '100%',
            maxHeight: '60vh',
            display: 'block'
          }}
        />
      </div>
    </div>
  )
}
