import React from "react";
import {
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCue from './AddCue'
const useStyles = makeStyles({
  root: {
    flexDirection: "column",
    // alignItems:"start",
    width: "100%",
    textAlign: "left",
    marginBottom:24,
    borderBottom:'2px dashed #ccc'
  },
  cueWraper: {
    borderTop: "1px solid #ccc",
    height: 48,
    display: "flex",
    width: "100%",
    alignItems: "center",
    paddingRight: 16,
    paddingLeft: 16,
    boxSizing: 'border-box'

  },
  timeLine:{
    flexGrow:1,
    background:'#eee',
    boxSizing: 'border-box',
    margin:8,
    position:"relative",
    height:8,
  },
  cueDuration:{
    position:"absolute",
    top:0,
    bottom:0,
    
    background:"red"
  }
});

export default function Cue({videoElement}) {
  const classes = useStyles();
  const [cueList, setCueList] = React.useState({});
  
  const onAddCue = (data) =>{
    if(cueList[data.name]){
      setCueList({
        ...cueList,
        [data.name]:[
          ...cueList[data.name],
          data
        ]
      })
    } else{
      setCueList({
        ...cueList,
        [data.name]:[data]
      })
    }
  }
  React.useEffect(() => {
  console.log(cueList)
  }, [cueList])
  return (
    <>
      <Box>
        <AddCue onAddCue={onAddCue} videoElement={videoElement} />
      </Box>
      <Box display="flex" className={classes.root}>
        <Typography ml={2} variant="h6">
          cue one
        </Typography>
        <Box className={classes.cueWraper}>
          <Box><time>01:09</time> - 01:30</Box>
          <Box className={classes.timeLine}>
            <div style={{left:"42%", width:"10%"}} className={classes.cueDuration}></div>
          </Box>
          <Box>
            <IconButton>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className={classes.cueWraper}>
          <Box><time>01:09</time> - 01:30</Box>
          <Box className={classes.timeLine}>
            <div style={{left:"50%", width:"20%"}} className={classes.cueDuration}></div>
          </Box>
          <Box>
            <IconButton>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      
    </>
  );
}
