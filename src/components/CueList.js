import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCue from "./AddCue";
const useStyles = makeStyles({
  root: {
    flexDirection: "column",
    // alignItems:"start",
    width: "100%",
    textAlign: "left",
    marginBottom: 24,
    borderBottom: "2px dashed #ccc",
  },
  cueWraper: {
    borderTop: "1px solid #ccc",
    height: 48,
    display: "flex",
    width: "100%",
    alignItems: "center",
    paddingRight: 16,
    paddingLeft: 16,
    boxSizing: "border-box",
  },
  timeLine: {
    flexGrow: 1,
    background: "#eee",
    boxSizing: "border-box",
    margin: 8,
    position: "relative",
    height: 8,
    cursor: 'pointer'
  },
  cueDuration: {
    position: "absolute",
    top: 0,
    bottom: 0,
    background: "red",
    borderRadius:10
  },
  time:{
    width:100,
    cursor: 'pointer'
  }
});
export default function CueList({ videoElement }) {
  const classes = useStyles();
  const [cueList, setCueList] = React.useState({});

  const onAddCue = (data) => {
    if (cueList[data.name]) {
      setCueList({
        ...cueList,
        [data.name]: [...cueList[data.name], {
          ...data,
          key: `cue-child-${new Date().getTime()}`,
        }],
      });
    } else {
      setCueList({
        ...cueList,
        [data.name]: [
          {
            ...data,
            key: `cue-child-${new Date().getTime()}`,
          },
        ],
      });
    }
  };
  const getPointerLocation = (pointer) => {
    return (pointer * 100) / videoElement.current.duration
  }
const OnSelectingCue = (target) =>{
  videoElement.current.currentTime = target
}

const OnDeletingCue = (group, cueKey) =>{
  const temp = {...cueList}
  if(temp[group].length === 1){
    delete temp[group]
  }else{
    const cueIndex = temp[group].findIndex((cue) => cue.key === cueKey);
    temp[group].splice(cueIndex, 1); 
  }
  setCueList({...temp})
}
  
  return (
    <>
      <Box>
        <AddCue onAddCue={onAddCue} videoElement={videoElement} />
      </Box>
      {Object.keys(cueList).map((group) => (
        <Box key={group} display="flex" className={classes.root}>
          <Typography ml={2} variant="h6">
            {group}
          </Typography>
          {cueList[group].map((cue) => (
            <Box key={cue.key} className={classes.cueWraper}>
              <Box onClick={()=>{OnSelectingCue(cue.currentTime)}} className={classes.time}>
                <time>{cue.start}</time> - <time>{cue.end}</time>
              </Box>
              <Box onClick={()=>{OnSelectingCue(cue.currentTime)}} className={classes.timeLine}>
                <div
                  style={{ left: `${getPointerLocation(cue.currentTime)}%`, width: 20}}
                  className={classes.cueDuration}
                ></div>
              </Box>
              <Box>
                <IconButton onClick={()=>{OnDeletingCue(group, cue.key)}}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
}
