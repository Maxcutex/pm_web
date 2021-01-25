import React, { useState, useEffect } from 'react'

// styles
import useStyles from "./styles";
import classnames from "classnames";

// components
import Widget from "../../../../components/Widget/Widget";
import { Typography } from "../../../../components/Wrappers/Wrappers";
import {
  TextField, Select, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Button, InputLabel, FormControl
} from '@material-ui/core';


import { postUserSkill } from '../../../../api/postUserDetailsApi';
import { getUserSkills } from '../../../../api/getUserDetailsApi';

const Skills = ({ id }) => {
  var classes = useStyles();
  const [
    userSkills,
    setUserSkills,
  ] = useState(null);
  const [status, setStatus] = useState(
    "IDLE"
  );
  const [error, setError] = useState('');
  const [skillId, setSkillId] = useState("");
  const [postedData, setPostedData] = useState("");
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [experienceYears, setExperienceYears] = useState(0);
  const [action, setAction] = useState("Add");
  const [years, setYears] = useState("");
  const [open, setOpen] = useState(false);
  const fullWidth = true;
  const maxWidth = 'sm';
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchEditData = (id) => {
    setAction("Edit");
    var singleSkillData = userSkills.find((e) => e.id === id)
    console.log(singleSkillData)
    setSkillName(singleSkillData.name)
    setSkillLevel(singleSkillData.skill_level)
    setExperienceYears(singleSkillData.years)

    handleClickOpen();
  }

  const resetData = () => {
    setSkillName('')
    setSkillLevel("")
    setExperienceYears("")
  }
  useEffect(() => {
    setStatus("LOADING");
    getUserSkills(id)
      .then(data => {
        setUserSkills(data.payload.user_skills);
        setStatus("SUCCESS");
      })
      .catch(error => {
        console.log("error is in use effect", error)
        setStatus("ERROR");
        setError(error.message);
      });
  }, [postedData]);

  return (
    <div>
      <Widget
        header={
          <div style={{ display: "flex" }}>
            <div className={classes.title}>
              <Typography variant="h5">Skills, Tools and Specializations</Typography>
            </div>
            <div className={classes.addButton} onClick={
              () => {
                setAction("Add");
                resetData()
                handleClickOpen()
              }
            }>+ Add Skill</div>
          </div>

        }
        upperTitle
        bodyClass={classes.fullHeightBody}
        className={classes.card} disableWidgetMenu={true}
      >
        <div >
          {status === "LOADING" ? <div> Loading ...</div> : null}
          {status === "ERROR" ? (
            <div>Oops! There was an Error. Try refreshing the page</div>
          ) : null}

          {status === "SUCCESS" && userSkills === undefined ? (
            <div>No Record Found</div>
          ) : null}

          {status === "SUCCESS" && userSkills !== null
            ? (
              <div style={{ display: "flex" }}>
                {userSkills.map((skill) => (
                  <div className={classes.skillsBadge} onClick={() => fetchEditData(skill.id)}>
                    <div>
                      <h5 className={classes.skillsBadgeSkillName}>{skill.name}</h5>
                    </div>
                    <p className={classes.skillLevel}>{skill.skill_level}, {skill.years}yrs</p>
                  </div>
                ))}
              </div>

            ) : null
          }
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={maxWidth} fullWidth={fullWidth}>
            <DialogTitle id="form-dialog-title">{
              action == "Add" ? "Add Skill" : skillName}</DialogTitle>
            <DialogContent>
              <div style={{ display: "flex" }}>
                <div className={classnames(classes.formTextDiv)}>

                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div className={classnames(classes.formTextDiv)}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="skillLevel-label">Skill Level</InputLabel>
                    <Select
                      labelId="skillLevel-label"
                      id="skillLevel" fullWidth
                      value={skillLevel}
                      onChange={e => setSkillLevel(e.target.value)}
                    >
                      <option aria-label="None" value="" />
                      <option value={"expert"}>Expert</option>
                      <option value={"intermediate"}>Intermediate</option>
                      <option value={"beginner"}>Beginner</option>
                    </Select>
                  </FormControl>
                </div>
                <div className={classnames(classes.formTextDiv)}>
                  <TextField
                    id="expYears"
                    label="Yrs Experience" fullWidth required
                    value={experienceYears} onChange={e => setExperienceYears(e.target.value)}
                  />

                </div>
              </div>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
                            </Button>
              <Button onClick={handleClose} color="primary">
                Update
                            </Button>
              <Button onClick={handleClose} color="primary">
                Delete
                            </Button>
            </DialogActions>
          </Dialog>


        </div>
      </Widget>

    </div>
  );
}

export default Skills;