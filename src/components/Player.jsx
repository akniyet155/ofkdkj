import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function Player({ url, t }) {
  const videoRef = useRef();
  const containerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
      videoRef.current.addEventListener('loadeddata', () => setIsLoading(false));
    }
  }, [url]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="video-container" ref={containerRef}>
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
            fontWeight: '600',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
            {t("playerError") || "Loading..."}
          </div>
        )}
        <div className="video-overlay"></div>
        <video
          ref={videoRef}
          controls
          autoPlay
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setIsLoading(false)}
          style={{
            width: '100%',
            maxHeight: '60vh',
            display: 'block'
          }}
        />
        <button
          onClick={toggleFullscreen}
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '16px',
            background: 'rgba(102, 126, 234, 0.8)',
            border: 'none',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            zIndex: 20,
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(102, 126, 234, 1)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(102, 126, 234, 0.8)'}
        >
          {isFullscreen ? '⛶ Exit' : '⛶ Full'}
        </button>
      </div>
    </div>
  )
}
