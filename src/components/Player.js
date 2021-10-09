import React, {useRef, useEffect, useState} from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Container,
} from "@mui/material";
import usePlayer from "../hooks/usePlayer";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';

export default function Player() {
  const theme = useTheme();
  const videoElement = useRef(null);
  const {
    playerState,
    togglePlay,
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
          controls
          ref={videoElement}
          src="https://s3.eu-west-1.amazonaws.com/reviewchallenge.proctorexam.com/webm/sample.webm"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}></CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="slow down">
              <FastRewindIcon />
            </IconButton>
            <IconButton onClick={togglePlay} aria-label="play/pause">
              {!playerState.isPlaying ? 
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              :<PauseIcon sx={{ height: 38, width: 38 }} />
            }
            </IconButton>
            <IconButton onClick={getCurrentTime} aria-label="speed up">
              <FastForwardIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
