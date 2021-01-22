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

import { postUserSummary } from '../../../../api/postUserDetailsApi';





const Summary = ({ id, title, profile_summary }) => {
  var classes = useStyles();
  const [open, setOpen] = useState(false);
  const [profileSummary, setProfileSummary] = useState(profile_summary);
  const fullWidth = true;
  const maxWidth = 'md';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    var formData = {
      profile_summary: profileSummary,
    }
    console.log("this is profile summary", profileSummary)
    postUserSummary(id, formData)
      .then(data => {
        setOpen(false);
      })
      .catch(error => {
        console.log("error is in posting data effect", error)
      });

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
            {profileSummary}
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
                rowsMax={9} value={profileSummary} onChange={e => setProfileSummary(e.target.value)}
              ></TextField>
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