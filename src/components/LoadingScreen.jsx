import React, { useEffect, useRef } from "react";
import "./LoadingScreen.css";
import loadingVideo from "../assets/loading.mp4";

export default function LoadingScreen({ onFinish }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => onFinish?.();
    const handleError = () => onFinish?.();

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    // Set playback speed (1.5x = faster, 0.5x = slower, 1.0 = normal)
    video.playbackRate = 1.5;

    // Autoplay might be blocked on some browsers; try play once mounted
    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => onFinish?.());
    }

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [onFinish]);

  return (
    <div className="loading-screen">
      <video
        ref={videoRef}
        className="loading-video"
        src={loadingVideo}
        autoPlay
        muted
        playsInline
      />

     
    </div>
  );
}







