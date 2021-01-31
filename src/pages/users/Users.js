import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

// components
import Widget from "../../components/Widget";
import UsersTable from "./UsersTable";
import {
  TextField, Select, Dialog, DialogActions, Fade, Typography,
  DialogContent, DialogContentText, DialogTitle, Button, InputLabel
} from '@material-ui/core';
import DateWithCalendarPicker from '../../components/DatePicker/DateWithCalendarPicker';
import CheckBoxWithLabel from '../../components/CheckBoxes/CheckBoxWithLabel';

import FormControl from '@material-ui/core/FormControl';
//api
import { getAllUsers, getCheckEmail } from '../../api/getUserDetailsApi';
import { postUserProfile } from '../../api/postUserDetailsApi';
// styles
import useStyles from "./styles";
import SimpleSearch from "./components/SimpleSearch/SimpleSearch";
import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch";
import classnames from "classnames";



export default function Users() {
  const classes = useStyles();
  const [postedData, setPostedData] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [users, setUsers] = useState(null);
  const [searchType, setSearchType] = useState('Simple');
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [action, setAction] = useState("Add");
  const [actionId, setActionId] = useState(0);
  const fullWidth = true;
  const maxWidth = 'md';

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState(null);
  const [location, setLocation] = useState(null);
  const [selectedEmployDate, setEmployDate] = useState(null);
  const [selectedBirthDate, setBirthDate] = useState(null);

  const handleSearchShow = (search) => {
    console.log("search type bout to be")
    setSearchType(search)
    console.log("search type has been set;")
  };
  const checkEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      getCheckEmail(email)
        .then(data => {
          setErrorMsg(data.msg)
          console.log("success result", data.payload)
          if (data.payload.useable == true) {
            console.log("success logged")
            setEmailSuccess(true)
            setError(false)
          } else {
            setError(true)
            setEmailSuccess(false)
          }

        })
        .catch(error => {
          setError(true)
          console.log("error email", error)
          setErrorMsg(error.message);
        });
    } else {
      setError(true)
      setErrorMsg("Email is Invalid!!")
    }

  }
  useEffect(() => {
    setStatus("LOADING");
    getAllUsers()
      .then(data => {
        setUsers(data.payload.users);
        setStatus("SUCCESS");
      })
      .catch(error => {
        setStatus("ERROR");
        setError(true)
        setErrorMsg(error.message);
      });
  }, [postedData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadEditInfo = (id) => {
    setActionId(id)
    setAction("Edit")
  }

  const resetData = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setGender('')
    setBirthDate('')
    setEmployDate('')
    setIsAdmin(false)
  }

  const submitData = (action, id) => {
    var formData = {
      user_id: id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      gender: gender,
      location_id: location,
      role_id: isAdmin == true ? 1 : 2,
      date_of_birth: selectedBirthDate,
      password: action == "Add" ? "123456" : "",
      employment_date: selectedEmployDate,
    }
    postUserProfile(action, id, formData)
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


  return (
    <>
      <div className={classes.main_header2}>
        <div style={{ display: "flex" }}>
          <div><h3>Users</h3></div>
          <div style={{ marginLeft: "auto", paddingTop: "1rem" }}>
            <button className={classnames(classes.btn, classes.btnSuccess)} onClick={
              () => {
                setAction("Add");
                resetData()
                handleClickOpen()
              }
            }>Create New User</button>
          </div>
        </div>
        <div className={classes.search_form}>

          {searchType == 'Simple' ? (
            <SimpleSearch handleSearchShow={handleSearchShow} />
          ) : (
              <AdvancedSearch handleSearchShow={handleSearchShow} />
            )}

        </div>
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget upperTitle noBodyPadding bodyClass={classes.tableOverflow} disableWidgetMenu={true}>
            {status === "LOADING" ? <div> Loading ...</div> : null}
            {status === "ERROR" ? (
              <div>Oops! There was an Error. Try refreshing the page</div>
            ) : null}

            {status === "SUCCESS" && users === undefined ? (
              <div>No Record Found</div>
            ) : null}

            {status === "SUCCESS" && users !== null
              ? (
                <div>
                  {console.log("users=>", users)}
                  <UsersTable data={users} />
                </div>
              ) : null}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={maxWidth} fullWidth={fullWidth}>
              <DialogTitle id="form-dialog-title">{action} User</DialogTitle>
              <DialogContent>
                <input type='hidden' value='higer' />
                <DialogContentText>
                  Fill in the information partaining to this employment.
                    </DialogContentText>
                <div style={{ display: "flex" }}>
                  <div className={classnames(classes.formTextDiv)}>
                    <TextField
                      id="firstName"
                      label="First Name" fullWidth required
                      value={firstName} onChange={e => setFirstName(e.target.value)}
                    />

                  </div>
                  <div className={classnames(classes.formTextDiv)}>
                    <TextField
                      id="lastName"
                      label="Last Name" fullWidth required
                      value={lastName} onChange={e => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <div className={classnames(classes.formTextDiv)}>
                    <TextField
                      id="email" autoComplete="new-password"
                      label="Email" fullWidth required

                      value={email} onChange={e => {
                        checkEmail(e.target.value)
                        setEmail(e.target.value)
                      }}
                    />
                    <Fade in={error}>
                      <Typography color="secondary" className={classnames(classes.errorMessage)}>
                        {errorMsg}
                      </Typography>
                    </Fade>
                    <Fade in={emailSuccess}>
                      <Typography color="primary" className={classnames(classes.successMessage)}>
                        {errorMsg}
                      </Typography>
                    </Fade>
                  </div>
                  <div className={classnames(classes.formTextDiv)}>
                    <div style={{ marginTop: "1.2rem" }}>
                      <CheckBoxWithLabel onChange={(event) => { setIsAdmin(event.target.checked) }} name={"Is Admin"} id={"is_admin"} isChecked={isAdmin} />
                    </div>

                  </div>
                </div>


                <div style={{ display: "flex" }}>
                  <div className={classnames(classes.formTextDiv)}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        labelId="gender-label"
                        id="gender"
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                      >
                        <option aria-label="None" value="" />
                        <option value={"male"}>Male</option>
                        <option value={"female"}>Female</option>
                      </Select>
                    </FormControl>

                  </div>
                  <div className={classnames(classes.formTextDiv)}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="locationId-label">Location</InputLabel>
                      <Select
                        labelId="locationId-label"
                        id="locationId" fullWidth
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                      >
                        <option aria-label="None" value="" />
                        <option value={1}>Lagos</option>
                        <option value={2}>Abuja</option>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div className={classnames(classes.formTextDiv)}>

                    <DateWithCalendarPicker id="date_of_birth"
                      label="Date of Birth" dateValue={selectedBirthDate} setOnChange={e => setBirthDate(e.target.value)} />

                  </div>
                  <div className={classnames(classes.formTextDiv)}>
                    <DateWithCalendarPicker id="employment_date"
                      label="Employment Date" dateValue={selectedEmployDate} setOnChange={e => setEmployDate(e.target.value)} />
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
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
