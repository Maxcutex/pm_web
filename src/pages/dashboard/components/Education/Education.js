import React, { useEffect, useState } from 'react'
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";

// styles
import useStyles from "./styles";
import classnames from "classnames";
// components
import Widget from "../../../../components/Widget/Widget";
import { Typography } from "../../../../components/Wrappers/Wrappers";

//types
import {
  TextField, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Button,
} from '@material-ui/core';

import { getUserEducations } from '../../../../api/getUserDetailsApi';
import { postUserEducation } from '../../../../api/postUserDetailsApi';
import DateWithCalendarPicker from '../../../../components/DatePicker/DateWithCalendarPicker';



const Education = ({ title, id }) => {
  var classes = useStyles();
  const fullWidth = true;
  const maxWidth = 'md';
  const [
    userEducation,
    setUserEducation,
  ] = useState(null);
  const [status, setStatus] = useState(
    "IDLE"
  );
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [postedData, setPostedData] = useState('');
  const [action, setAction] = useState("Add");
  const [actionId, setActionId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date('2004-01-18T21:11:54'));
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date('2021-01-18T21:11:54'));
  const [institutionName, setInstitutionName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [degreeEarned, setDegreeEarned] = useState("");
  const [institutionCity, setInstitutionCity] = useState("");
  const [institutionCountry, setInstitutionCountry] = useState("");
  const [accomplishments, setAccomplishments] = useState("");

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  useEffect(() => {
    setStatus("LOADING");
    getUserEducations(id)
      .then(data => {
        setUserEducation(data.payload.user_education);
        setStatus("SUCCESS");
      })
      .catch(error => {
        setStatus("ERROR");
        setError(error.message);
      });
  }, []);
  const fetchEditData = (id) => {
    setAction("Edit");
    var singleEducationData = userEducation.find((e) => e.id === id)
    console.log(singleEducationData)
    setInstitutionName(singleEducationData.institution_name)
    setCourseName(singleEducationData.course_name)
    setDegreeEarned(singleEducationData.degree_earned)
    setInstitutionCity(singleEducationData.institution_city)
    setInstitutionCountry(singleEducationData.institution_country)
    setAccomplishments(singleEducationData.accomplishments)
    setSelectedStartDate(singleEducationData.start_date)
    setSelectedEndDate(singleEducationData.end_date)
    setActionId(id)
    setUserId(singleEducationData.user_id)
    handleClickOpen();
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitData = (action, id) => {
    var formData = {
      user_id: userId,
      user_employment_id: id,
      institution_name: institutionName,
      course_name: courseName,
      degree_earned: degreeEarned,
      institution_city: institutionCity,
      institution_country: institutionCountry,
      accomplishments: accomplishments,
      start_date: selectedStartDate,
      end_date: selectedEndDate,
    }
    postUserEducation(action, id, formData)
      .then(data => {
        setStatus("SUCCESS");
        setPostedData('posted')
        resetData()
        setOpen(false);

      })
      .catch(error => {
        console.log("error is in posting data effect", error)
        setStatus("ERROR");
      });
  }
  const resetData = () => {
    setInstitutionName('')
    setCourseName('')
    setDegreeEarned('')
    setInstitutionCity('')
    setInstitutionCountry('')
    setAccomplishments('')
    setSelectedStartDate('')
    setSelectedEndDate('')
    setActionId(0)
    setUserId(0)
  }


  return (
    <Widget
      header={

        <div style={{ display: "flex" }}>
          <div className={classes.title}>
            <Typography variant="h5">{title}</Typography>
          </div>
          <div className={classes.addButton} onClick={
            () => {
              setAction("Add");
              resetData()
              handleClickOpen()
            }
          }>+ Add New</div>
        </div>

      }
      upperTitle
      // bodyClass={classes.fullHeightBody}
      // className={classes.card} disableWidgetMenu={true}
      disableWidgetMenu
    >
      <div>
        {status === "LOADING" ? <div> Loading ...</div> : null}
        {status === "ERROR" ? (
          <div>Oops! There was an Error. Try refreshing the page</div>
        ) : null}

        {status === "SUCCESS" && userEducation === undefined ? (
          <div>No Record Found</div>
        ) : null}

        {status === "SUCCESS" && userEducation !== null
          ? (

            <div>

              {userEducation.map(employment => (
                <div key={employment.id} style={{ display: "flex", marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "0.1rem solid #cecece" }} className={classnames(classes.employ_container)}>
                  <div className={classnames(classes.employ_work_summary)}>
                    <div className={classnames(classes.institution_name)}>{employment.institution_name}</div>
                    <div className={classnames(classes.institution_city_country)}>{employment.institution_city}, {employment.institution_country}</div>
                    <div className={classnames(classes.institution_period)}>{employment.start_date_formatted} - {employment.end_date_formatted} * {employment.duration}</div>

                  </div>
                  <div className={classnames(classes.employ_work_details)}>
                    <div className={classnames(classes.employ_job_title)}>{employment.course_name} ({employment.degree_earned})</div>
                    <div>{employment.work_summary}</div>
                    <br />
                    <div className={classnames(classes.txtSubHeader)}>Accomplishments</div>

                    <div>{employment.accomplishments}</div>
                    <br />


                  </div>
                  <div className={classnames(classes.employ_actions)}>
                    <div className={classnames(classes.employ_actions_buttons)} onClick={() => fetchEditData(employment.id)}><EditIcon /> <Typography className={classes.materialIconText}>Edit</Typography></div>
                    <div className={classnames(classes.employ_actions_buttons)} ><DeleteIcon /> <Typography className={classes.materialIconText}>Delete</Typography></div>
                  </div>




                </div>

              ))}

              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={maxWidth} fullWidth={fullWidth}>
                <DialogTitle id="form-dialog-title">{action} {title}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Fill in the information partaining to this academic institution attended.
                                    </DialogContentText>
                  <div style={{ display: "flex" }}>
                    <div className={classnames(classes.formTextDiv)}>
                      <TextField
                        id="institutionName"
                        label="Institution Name" fullWidth required
                        value={institutionName}
                      />

                    </div>
                    <div className={classnames(classes.formTextDiv)}>
                      <TextField
                        id="courseName"
                        label="Course Name" fullWidth required
                        value={courseName}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex" }}>
                    <div className={classnames(classes.formTextDiv)}>
                      <TextField
                        id="degreeEarned"
                        label="Degree Earned" fullWidth required
                        value={degreeEarned}
                      />

                    </div>

                  </div>

                  <div style={{ display: "flex" }}>

                    <div className={classnames(classes.formTextDiv)}>
                      <TextField
                        id="city"
                        label="City" fullWidth required
                        value={institutionCity}
                        onChange={e => setInstitutionCity(e.target.value)}
                      />
                    </div>
                    <div className={classnames(classes.formTextDiv)}>
                      <TextField
                        id="country"
                        label="Country" fullWidth required
                        value={institutionCountry} onChange={e => setInstitutionCountry(e.target.value)}
                      />

                    </div>
                  </div>

                  <div style={{ display: "flex" }}>

                    <div className={classnames(classes.formTextDiv)}>
                      <TextField
                        id="accomplishments"
                        label="Accomplishments" required

                        multiline value={accomplishments}
                        rows={4} fullWidth onChange={e => setAccomplishments(e.target.value)}
                        rowsMax={9}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex" }}>
                    <div className={classnames(classes.formTextDiv)}>

                      <DateWithCalendarPicker id="start_date"
                        label="Start Date" dateValue={selectedStartDate} setOnChange={handleStartDateChange} />

                    </div>
                    <div className={classnames(classes.formTextDiv)}>
                      <DateWithCalendarPicker id="end_date"
                        label="End Date" dateValue={selectedEndDate} setOnChange={handleEndDateChange} />
                    </div>
                  </div>



                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                    </Button>
                  <Button onClick={() => submitData(action, actionId)} color="primary">
                    {action}
                  </Button>
                </DialogActions>
              </Dialog>

            </div>


          )
          : null}
      </div>
    </Widget>
  );
}

export default Education; 