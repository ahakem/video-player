import React, { useRef } from "react";
import {
  Box,
  Card,
  CardMedia,
  IconButton,
  Container,
  Slider,
} from "@mui/material";
import usePlayer from "../hooks/usePlayer";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import SpeedIcon from "@mui/icons-material/Speed";
import CueList from "./CueList";

export default function Player() {
  const videoElement = useRef(null);
  const {
    playerState,
    togglePlay,
    handleSpeed,
    handleLiveProgress,
    handleUpdateProgress,
  } = usePlayer(videoElement);

  return (
    <Container maxWidth="md">
      <Card sx={{ display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="video"
          ref={videoElement}
          onTimeUpdate={handleLiveProgress}
          src="https://s3.eu-west-1.amazonaws.com/reviewchallenge.proctorexam.com/webm/sample.webm"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Slider
            aria-label="time-indicator"
            size="small"
            value={playerState.progress}
            min={0}
            step={1}
            max={100}
            onChange={(_, value) => {
              handleUpdateProgress(value);
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pl: 1,
              pb: 1,
            }}
          >
            <Box>
              <IconButton
                disabled={playerState.speed === 0.5}
                onClick={() => {
                  handleSpeed("mins");
                }}
                aria-label="slow down"
              >
                <FastRewindIcon />
              </IconButton>
              <IconButton onClick={togglePlay} aria-label="play/pause">
                {!playerState.isPlaying ? (
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                ) : (
                  <PauseIcon sx={{ height: 38, width: 38 }} />
                )}
              </IconButton>
              <IconButton
                disabled={playerState.speed === 4}
                onClick={() => {
                  handleSpeed("plus");
                }}
                aria-label="speed up"
              >
                <FastForwardIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton>
                <SpeedIcon /> {playerState.speed} x
              </IconButton>
            </Box>
          </Box>
        </Box>
        <CueList videoElement={videoElement} />
      </Card>
    </Container>
  );
}
