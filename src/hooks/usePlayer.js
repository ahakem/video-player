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

  return {
    playerState,
    togglePlay,
  };
};

export default usePlayer;
