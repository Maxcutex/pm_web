import React, { useEffect, useState } from 'react'
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";

// styles
import useStyles from "./styles";
import classnames from "classnames";
// components
import Widget from "../../../../components/Widget/Widget";
import { Typography } from "../../../../components/Wrappers/Wrappers";
import {
  TextField, Select, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Button, InputLabel
} from '@material-ui/core';

import FormControl from '@material-ui/core/FormControl';


//types
import { getUserEmployments } from '../../../../api/getUserDetailsApi';
import DateWithCalendarPicker from '../../../../components/DatePicker/DateWithCalendarPicker';
import CheckBoxWithLabel from '../../../../components/CheckBoxes/CheckBoxWithLabel';



const Employment = ({ title, id, token }) => {
  var classes = useStyles();
  const [
    userEmployment,
    setUserEmployment,
  ] = useState(null);

  const [status, setStatus] = useState(
    "IDLE"
  );
  const [error, setError] = useState('');
  const [actionId, setActionId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [open, setOpen] = useState(false);
  const [tokenValue, setTokenValue] = useState(token);
  const [action, setAction] = useState("Add");
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date('2004-01-18T21:11:54'));
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date('2021-01-18T21:11:54'));
  const [institutionName, setInstitutionName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [institutionUrl, setInstitutionUrl] = useState("");
  const [institutionCity, setInstitutionCity] = useState("");
  const [institutionCountry, setInstitutionCountry] = useState("");
  const [institutionSize, setInstitutionSize] = useState("");
  const [workSummary, setWorkSummary] = useState("");
  const [accomplishments, setAccomplishments] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);

  const handleCheckBoxChange = (event) => {
    setIsCurrent(event.target.checked);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  const handleEmployTypeChange = (event) => {
    setEmploymentType(event.target.value);
  };
  const handleEmploySizeChange = (event) => {
    setInstitutionSize(event.target.value);
  };
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };
  const fetchEditData = (id) => {
    setAction("Edit");
    var singleEmploymentData = userEmployment.find((e) => e.id === id)
    console.log(singleEmploymentData)
    setInstitutionName(singleEmploymentData.institution_name)
    setJobTitle(singleEmploymentData.job_title)
    setEmploymentType(singleEmploymentData.employment_type)
    setInstitutionUrl(singleEmploymentData.institution_url)
    setInstitutionCity(singleEmploymentData.institution_city)
    setInstitutionCountry(singleEmploymentData.institution_country)
    setInstitutionSize(singleEmploymentData.institution_size)
    setWorkSummary(singleEmploymentData.work_summary)
    setAccomplishments(singleEmploymentData.accomplishments)
    setIsCurrent(singleEmploymentData.is_current)
    setSelectedStartDate(singleEmploymentData.start_date)
    setSelectedEndDate(singleEmploymentData.end_date)
    setActionId(id)
    setIsCurrent(singleEmploymentData.is_current)
    setUserId(singleEmploymentData.user_id)
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
      job_title: jobTitle,
      employment_type: employmentType,
      institution_url: institutionUrl,
      institution_city: institutionCity,
      institution_country: institutionCountry,
      institution_size: institutionSize,
      work_summary: workSummary,
      accomplishments: accomplishments,
      start_date: selectedStartDate,
      end_date: selectedEndDate,
      is_current: isCurrent,
    }
    setOpen(false);
  }


  useEffect(() => {
    setStatus("LOADING");
    getUserEmployments(id, token)
      .then(data => {
        setUserEmployment(data.payload.user_employments);
        setStatus("SUCCESS");
      })
      .catch(error => {
        console.log("error is in use effect", error)
        setStatus("ERROR");
        setError(error.message);
      });
  }, []);
  return (
    <Widget
      header={
        <div style={{ display: "flex" }}>
          <div className={classes.title}>
            <Typography variant="h5">{title}</Typography>
          </div>
          <div className={classes.addButton} onClick={handleClickOpen}>+ Add New</div>
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

        {status === "SUCCESS" && userEmployment === undefined ? (
          <div>No Record Found</div>
        ) : null}

        {status === "SUCCESS" && userEmployment !== null
          ? (

            <div>

              {userEmployment.map(employment => (
                <div key={employment.id} style={{ display: "flex", marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "0.1rem solid #cecece" }} className={classnames(classes.employ_container)}>
                  <div className={classnames(classes.employ_work_summary)}>
                    <div className={classnames(classes.institution_name)}>{employment.institution_name}</div>
                    <div >{employment.institution_url}</div>
                    <div className={classnames(classes.institution_city_country)}>{employment.institution_city}, {employment.institution_country}</div>
                    <div className={classnames(classes.institution_period)}>{employment.start_date_formatted} - {employment.end_date_formatted} * {employment.duration}</div>
                    <div className={classnames(classes.institution_period)}>{employment.institution_size}</div>

                  </div>
                  <div className={classnames(classes.employ_work_details)}>
                    <div className={classnames(classes.employ_job_title)}>{employment.job_title} ({employment.employment_type})</div>
                    <div>{employment.work_summary}</div>
                    <br />
                    <div className={classnames(classes.txtSubHeader)}>Accomplishments</div>

                    <div>{employment.accomplishments}</div>
                    <br />
                    <div className={classnames(classes.txtSubHeader)}>Skills, Tools, Specializations</div>
                    <div style={{ display: "flex", }}>
                      {employment.skills.map(skill => (
                        <div key={employment.id + skill.name} className={classnames(classes.employment_skill)}>{skill.name}</div>
                      ))}
                    </div>

                  </div>
                  <div className={classnames(classes.employ_actions)}>
                    <div style={{ display: "flex" }} onClick={() => fetchEditData(employment.id)}><EditIcon /> <Typography className={classes.materialIconText}>Edit</Typography></div>
                    <div style={{ display: "flex" }}><DeleteIcon /> <Typography className={classes.materialIconText}>Delete</Typography></div>
                  </div>




                </div>

              ))}
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={maxWidth} fullWidth={fullWidth}>
                <DialogTitle id="form-dialog-title">{action} {title}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Fill in the information partaining to this employment.
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
                        id="jobTitle"
                        label="Job Title" fullWidth required
                        value={jobTitle}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex" }}>
                    <div className={classnames(classes.formTextDiv)}>
                      <TextField
                        id="url"
                        label="Website Url" fullWidth required
                        value={institutionUrl}
                      />

                    </div>
                    <div className={classnames(classes.formTextDiv)}>
                      <div style={{ marginTop: "1.2rem" }}>
                        <CheckBoxWithLabel onChange={handleCheckBoxChange} name={"Is current"} id={"is_current"} isChecked={isCurrent} />
                      </div>

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
                        id="workSummary"
                        label="Work Summary" required

                        multiline
                        rows={4} fullWidth value={workSummary}
                        rowsMax={9} onChange={e => setWorkSummary(e.target.value)}
                      />

                    </div>
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
                      <FormControl className={classes.formControl}>
                        <InputLabel id="institutionSize-label">Institution Size</InputLabel>
                        <Select
                          labelId="institutionSize-label"
                          id="institutionSize"
                          value={institutionSize}
                          onChange={handleEmploySizeChange}
                        >
                          <option aria-label="None" value="" />
                          <option value={"1 - 10 Employees"}>1 - 10 Employees</option>
                          <option value={"11 - 50 Employees"}>11 - 50 Employees</option>
                          <option value={"50 - 200 Employees"}>50 - 200 Employees</option>
                          <option value={"201 - 500 Employees"}>201 - 500 Employees</option>
                          <option value={"501 - 1000 Employees"}>501 - 1000 Employees</option>
                        </Select>
                      </FormControl>

                    </div>
                    <div className={classnames(classes.formTextDiv)}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="employmentType-label">Employment Type</InputLabel>
                        <Select
                          labelId="employmentType-label"
                          id="employmentType" fullWidth
                          value={employmentType}
                          onChange={handleEmployTypeChange}
                        >
                          <option aria-label="None" value="" />
                          <option value={"full"}>Full</option>
                          <option value={"part"}>Part-Time</option>
                          <option value={"contract"}>Contract</option>
                        </Select>
                      </FormControl>
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

export default Employment; 