import { useState, useEffect } from "react";

const usePlayer = (videoElement) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    speed: 1,
    progress: 0,
    duration:null
    
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
      duration: videoElement.current.duration
    });
  };

  useEffect(() => {
    playerState.isPlaying
      ? videoElement.current.play()
      : videoElement.current.pause();
  }, [playerState.isPlaying, videoElement]);

  const handleSpeed = (speed) => {
    const videoSpeed = playerState.speed * (speed === "plus" ? 2 : .5);
    videoElement.current.playbackRate = videoSpeed;
      setPlayerState({
        ...playerState,
        speed: videoSpeed,
      });
  };
  const handleLiveProgress = () => {
    const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress: progress,
    });
  };

  const handleUpdateProgress = (value) => {
    debugger
    const currentTime = (value * videoElement.current.duration) / 100;
    videoElement.current.currentTime = currentTime
    setPlayerState({
      ...playerState,
      progress: value,
    });
  };
  
  return {
    playerState,
    togglePlay,
    handleSpeed,
    handleLiveProgress,
    handleUpdateProgress
  };
};

export default usePlayer;
