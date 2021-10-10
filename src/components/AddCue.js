import * as React from "react";
import Button from "@mui/material/Button";
import { TextField, Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddCue({ videoElement, onAddCue }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    start: "",
    end: "",
    currentTime: 0,
  });
  const generateCurrntTime = () => {
    const s = parseInt(videoElement.current.currentTime % 60);
    const m = parseInt((videoElement.current.currentTime / 60) % 60);
    const time = `${m}:${s}`;
    return time;
  };
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = () => {
    setFormData({
      name: "",
      end: "",
      start: generateCurrntTime(),
      currentTime: videoElement.current.currentTime,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    setOpen(false);
    onAddCue(formData);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Click to Add a Cue
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Cue</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            value={formData.name}
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleOnChange}
          />
          <Box>
            <TextField
              margin="dense"
              id="start"
              label="Start Time"
              value={formData.start}
              redonly
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="end"
              name="end"
              label="End Time"
              type="text"
              fullWidth
              variant="standard"
              value={formData.end}
              onChange={handleOnChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
