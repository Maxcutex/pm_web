import React, { useState } from 'react'

// styles
import useStyles from "./styles";

// components
import Widget from "../../../../components/Widget/Widget";
import { Typography } from "../../../../components/Wrappers/Wrappers";

import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';





const Summary = ({ title, profile_summary }) => {
  var classes = useStyles();
  const [open, setOpen] = useState(false);
  const fullWidth = true;
  const maxWidth = 'md';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Widget
      header={
        <div style={{ display: "flex" }}>
          <div className={classes.title}>
            <Typography variant="h5">{title}</Typography>
          </div>
          <div className={classes.addButton} onClick={handleClickOpen}>Edit</div>
        </div>

      }
      upperTitle
    // bodyClass={classes.fullHeightBody}
    // className={classes.card} disableWidgetMenu={true}
    >
      <div>
        <div>

          <div>
            {profile_summary}
          </div>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={maxWidth} fullWidth={fullWidth}>
            <DialogTitle id="form-dialog-title">Edit {title}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Update your personal summary about you
                            </DialogContentText>

              <TextField
                placeholder={profile_summary}
                multiline
                rows={4} fullWidth
                rowsMax={9} value={profile_summary}
              >{profile_summary}</TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
                            </Button>
              <Button onClick={handleClose} color="primary">
                Update
                            </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>

    </Widget>
  );
}

export default Summary; 