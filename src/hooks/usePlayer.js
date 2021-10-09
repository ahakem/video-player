import { useState, useEffect } from "react";

const usePlayer = (videoElement) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    speed: 1,
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
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
  return {
    playerState,
    togglePlay,
    handleSpeed,
  };
};

export default usePlayer;
