import React, { useState } from 'react';
import useStyles from '../../styles'
import { Edit as EditIcon } from "@material-ui/icons";
import classnames from "classnames";


import {
  TextField, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Button
} from '@material-ui/core';
import { postUserInfo } from '../../../../api/postUserDetailsApi';

const Banner = ({ userSummary }) => {

  var classes = useStyles();
  const [open, setOpen] = useState(false);
  // const [status, setStatus] = useState("IDLE");
  const [postedData, setPostedData] = useState("");
  const fullWidth = true;
  const maxWidth = 'md';
  const action = "Edit";

  const [firstName, setFirstName] = useState(userSummary.first_name);
  const [lastName, setLastName] = useState(userSummary.last_name);
  const [jobTitle, setJobTitle] = useState(userSummary.job_title);
  const [experienceYears, setExperienceYears] = useState(userSummary.experience_years);
  const [phone, setPhone] = useState(userSummary.phone);
  const [personalEmail, setPersonalEmail] = useState(userSummary.personal_email);
  const [git, setGit] = useState(userSummary.git_hub);
  const [linkedIn, setLinkedIn] = useState(userSummary.linked_in);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitData = (id) => {
    var formData = {
      first_name: firstName,
      last_name: lastName,
      job_title: jobTitle,
      experience_years: experienceYears,
      phone: phone,
      personal_email: personalEmail,
      git_hub: git,
      linked_in: linkedIn,
    }
    postUserInfo(id, formData)
      .then(data => {
        // setStatus("SUCCESS");
        setPostedData('posted')
        setOpen(false);

      })
      .catch(error => {
        console.log("error is in posting data effect", error)
        // setStatus("ERROR");
      });
  }

  return (<div>
    <div style={{ display: "flex" }}>
      <div className={classes.image}>
        picture
                        </div>
      <div className={classes.main_description}>
        <div className={classes.main_description_name}>{firstName} {lastName}</div>
        <div className={classes.main_description_position}>{jobTitle} .{experienceYears} yrs engineering experience . Started on {userSummary.employment_date_formatted} </div>
        <div className={classes.main_description_contacts}><i>Primary Email: {userSummary.email}. Personal Email: {personalEmail}. Phone: {phone} </i></div>
        <div>Social Link Logos</div>
      </div>
      <div className={classes.buttonEdit}>
        <button className={classes.buttonEditIcon2} onClick={handleClickOpen}><EditIcon /></button>
      </div>
    </div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={maxWidth} fullWidth={fullWidth}>
      <DialogTitle id="form-dialog-title">{action} Profile </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Update your profile.
                                    </DialogContentText>
        <div style={{ display: "flex" }}>
          <div className={classnames(classes.formTextDiv)}>
            <TextField
              id="firstName"
              label="First Name" fullWidth required
              value={firstName} onChange={setFirstName}
            />

          </div>
          <div className={classnames(classes.formTextDiv)}>
            <TextField
              id="lastName"
              label="Last Name" fullWidth required
              value={lastName} onChange={setLastName}
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className={classnames(classes.formTextDiv)}>
            <TextField
              id="jobTitle"
              label="Job Title" fullWidth required
              value={jobTitle} onChange={setJobTitle}
            />

          </div>
          <div className={classnames(classes.formTextDiv)}>
            <TextField
              id="expYears"
              label="Yrs Experience" fullWidth required
              value={experienceYears} onChange={setExperienceYears}
            />

          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className={classnames(classes.formTextDiv)}>
            <TextField
              id="personalEmail"
              label="Personal Email" fullWidth required
              value={personalEmail} onChange={setPersonalEmail}
            />

          </div>
          <div className={classnames(classes.formTextDiv)}>
            <TextField
              id="phone"
              label="Phone" fullWidth required
              value={phone} onChange={setPhone}
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className={classnames(classes.formTextDiv)}>
            <TextField
              id="git"
              label="Git" fullWidth required
              value={git} onChange={setGit}
            />

          </div>
          <div className={classnames(classes.formTextDiv)}>
            <TextField
              id="linkedIn"
              label="Linked In" fullWidth required
              value={linkedIn} onChange={setLinkedIn}
            />
          </div>
        </div>



      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
                    </Button>
        <Button onClick={() => submitData(userSummary.id)} color="primary">
          {action}
        </Button>
      </DialogActions>
    </Dialog>

  </div>);
}

export default Banner;