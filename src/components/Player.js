import React, {useRef} from "react";
import {
  Box,
  Card,
  CardMedia,
  IconButton,
  Container,
} from "@mui/material";
import usePlayer from "../hooks/usePlayer";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import SpeedIcon from '@mui/icons-material/Speed';
import LinearProgress from '@mui/material/LinearProgress';

export default function Player() {
  const videoElement = useRef(null);
  const {
    playerState,
    togglePlay,
    handleSpeed,
    handleLiveProgress
  } = usePlayer(videoElement);

  const getCurrentTime = () => {
    // const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
    videoElement.current.currentTime = 100
    const currentTime = videoElement.current.currentTime;
  };

 
  return (
    <Container maxWidth="md">
      <Card sx={{ display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="video"
          // controls
          ref={videoElement}
          onTimeUpdate={handleLiveProgress}

          src="https://s3.eu-west-1.amazonaws.com/reviewchallenge.proctorexam.com/webm/sample.webm"
        />
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent:"space-between"}}>
          <LinearProgress style={{height:15,}} variant="determinate" value={playerState.progress} />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent:"center" , pl: 1, pb: 1 }}>
            <Box>
            <IconButton 
            disabled={playerState.speed === .5 } 
            onClick={()=>{handleSpeed("mins")}} aria-label="slow down">
              <FastRewindIcon />
            </IconButton>
            <IconButton onClick={togglePlay} aria-label="play/pause">
              {!playerState.isPlaying ? 
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              :<PauseIcon sx={{ height: 38, width: 38 }} />
            }
            </IconButton>
            <IconButton 
            disabled={playerState.speed === 4 } 
              onClick={()=>{handleSpeed("plus")}}
             aria-label="speed up">
              <FastForwardIcon />
            </IconButton>
            </Box>
            <Box> <IconButton><SpeedIcon/> {playerState.speed} x</IconButton></Box>
          </Box>

          
        </Box>
      </Card>
    </Container>
  );
}
