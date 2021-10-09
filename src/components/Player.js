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

import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function Player() {
  const theme = useTheme();
  const videoElement = useRef(null);
  const [playing, setPlaying] = useState(false)
  const togglePlay = () => {
    setPlaying(!playing)
  };

  useEffect(() => {
    playing
      ? videoElement.current.play()
      : videoElement.current.pause();
  }, [playing, videoElement]);
  return (
    <Container>
      <Card sx={{ display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="video"
          ref={videoElement}
          src="https://s3.eu-west-1.amazonaws.com/reviewchallenge.proctorexam.com/webm/sample.webm"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}></CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              <SkipPreviousIcon />
            </IconButton>
            <IconButton onClick={togglePlay} aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="next">
              <SkipNextIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
