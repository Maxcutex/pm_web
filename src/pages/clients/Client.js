import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

// components
import Widget from "../../components/Widget";
import ClientsTable from "./ClientsTable";
import {
  TextField, Select, Dialog, DialogActions, Fade, Typography,
  DialogContent, DialogContentText, DialogTitle, Button, InputLabel
} from '@material-ui/core';
import DateWithCalendarPicker from '../../components/DatePicker/DateWithCalendarPicker';

import FormControl from '@material-ui/core/FormControl';
//api
import { getAllClients, } from '../../api/getUserDetailsApi';
import { postUserProfile } from '../../api/postUserDetailsApi';
// styles
import useStyles from "./styles";
import SimpleSearch from "./components/SimpleSearch/SimpleSearch";
import classnames from "classnames";


const Client = () => {
  const classes = useStyles();
  const history = useHistory();
  const [postedData, setPostedData] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);
  const [institutionName, setInstitutionName] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [clients, setClients] = useState(null);
  const [searchType, setSearchType] = useState('Simple');
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("Add");
  const [errorDisplay, setErrorDisplay] = useState("");
  const [successDisplay, setSuccessDisplay] = useState("");
  const [actionId, setActionId] = useState(0);
  const fullWidth = true;
  const maxWidth = 'md';

  const [institutionSize, setInstitutionSize] = useState(null);
  const [institutionCity, setInstitutionCity] = useState(null);
  const [institutionCountry, setInstitutionCountry] = useState(null);
  const [institutionUrl, setInstitutionUrl] = useState(null);
  const [institutionStatus, setInstitutionStatus] = useState(null);
  const [selectedStartDate, setselectedStartDate] = useState(null);

  const handleSearchShow = (search) => {
    setSearchType(search)
  };
  const handleView = (id) => {
    let path = `/app/Engineer/${id}`
    history.push(path);
  }
  const handleSearch = (search) => {
    getAllClients(search)
      .then(data => {
        setClients(data.payload.clients);
        setStatus("SUCCESS");
      })
      .catch(error => {
        setStatus("ERROR");
        setError(true)
        setErrorMsg(error.message);
      });
  };


  useEffect(() => {
    setStatus("LOADING");
    handleSearch('')
  }, [postedData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetData()
    setOpen(false);
  };

  const loadEditInfo = (id) => {
    setActionId(id)
    setAction("Edit")
  }

  const resetData = () => {
    setInstitutionName('')
    setInstitutionCity('')
    setInstitutionCountry('')
    setInstitutionSize('')
    setInstitutionUrl('')
    setselectedStartDate('')
    setInstitutionStatus('')
    setStatus(false)
    setError(null)
    setErrorMsg('');
  }

  const submitData = (action, id) => {
    var formData = {
      client_id: id,
      institution_name: institutionName,
      institution_city: institutionCity,
      institution_country: institutionCountry,
      institution_size: institutionSize,
      institution_url: institutionUrl,
      start_date: selectedStartDate,
      status: status,
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
          <div><h3>Client</h3></div>
          <div style={{ marginLeft: "auto", paddingTop: "1rem" }}>
            <button className={classnames(classes.btn, classes.btnSuccess)} onClick={
              () => {
                setAction("Add");
                resetData()
                handleClickOpen()
              }
            }>Create New Client</button>
          </div>
        </div>
        <div className={classes.search_form}>


          <SimpleSearch handleSearch={handleSearch} />

        </div>
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget upperTitle noBodyPadding bodyClass={classes.tableOverflow} disableWidgetMenu={true}>
            {status === "LOADING" ? <div> Loading ...</div> : null}
            {status === "ERROR" ? (
              <div>Oops! There was an Error. Try refreshing the page</div>
            ) : null}

            {status === "SUCCESS" && clients === undefined ? (
              <div>No Record Found</div>
            ) : null}

            {status === "SUCCESS" && clients !== null
              ? (
                <div>
                  <ClientsTable data={clients} handleEdit={loadEditInfo} handleDelete={loadEditInfo} handleView={handleView} />
                </div>
              ) : null}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={maxWidth} fullWidth={fullWidth}>
              <DialogTitle id="form-dialog-title">{action} Client</DialogTitle>
              <DialogContent>
                <input type='hidden' value='higer' />
                <DialogContentText>
                  Fill in the information partaining to this Client.
                    </DialogContentText>
                <div style={{ display: "flex" }}>
                  <div className={classnames(classes.formTextDiv)}>
                    <TextField
                      id="institutionName"
                      label="Institution Name" fullWidth required
                      value={institutionName} onChange={e => setInstitutionName(e.target.value)}
                    />

                  </div>
                  <div className={classnames(classes.formTextDiv)}>
                    <TextField
                      id="institutionCity"
                      label="City" fullWidth required
                      value={institutionCity} onChange={e => setInstitutionCity(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <div className={classnames(classes.formTextDiv)}>
                    <TextField
                      id="institutionCountry" autoComplete="new-password"
                      label="Country" fullWidth required

                      value={institutionCountry} onChange={e => {
                        setInstitutionCountry(e.target.value)
                      }}
                    />

                  </div>
                  <div className={classnames(classes.formTextDiv)}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="institutionSize-label">Institution Size</InputLabel>
                      <Select
                        labelId="institutionSize-label"
                        id="institutionSize"
                        value={institutionSize}
                        onChange={e => {
                          setInstitutionSize(e.target.value)
                        }}
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
                </div>


                <div style={{ display: "flex" }}>

                  <div className={classnames(classes.formTextDiv)}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="institutionStatusLabel">Location</InputLabel>
                      <Select
                        labelId="institutionStatusLabel"
                        id="institutionStatus" fullWidth
                        value={institutionStatus}
                        onChange={e => setInstitutionStatus(e.target.value)}
                      >
                        <option aria-label="None" value="" />
                        <option value={"lead"}>Lead</option>
                        <option value={"closed"}>Closed</option>
                        <option value={"rejected"}>Rejected</option>
                      </Select>
                    </FormControl>
                  </div>
                  <div className={classnames(classes.formTextDiv)}>

                    <DateWithCalendarPicker id="startDate"
                      label="Start Date" dateValue={selectedStartDate} setOnChange={e => setselectedStartDate(e.target.value)} />

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

export default Client;