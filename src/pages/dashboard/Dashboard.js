import React, { useState, useEffect } from "react";
import {
  Grid,

} from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";


// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import Summary from "./components/Summary/Summary"
import Employment from "./components/Employment/Employment"
import Education from "./components/Education/Education"
import { getToken } from "../../utils/common";
import decodeToken from "../../utils/jwtDecode";

//api
import { getUserProfile } from '../../api/getUserDetailsApi';

export default function Dashboard(props) {
  var classes = useStyles();
  // get current user details
  var token = getToken()
  var userInfo = decodeToken(token);
  // local
  const [userSummary, setUserSummary,] = useState(null);
  const [status, setStatus] = useState("IDLE");
  const [error, setError] = useState('');

  useEffect(() => {
    setStatus("LOADING");
    getUserProfile(userInfo.id, token)
      .then(data => {
        setUserSummary(data.payload.user);
        setStatus("SUCCESS");
      })
      .catch(error => {
        setStatus("ERROR");
        setError("Oops! There was an Error. Try refreshing the page");
      });
  }, []);

  return (
    <>
      <div className={classes.main_header}>
        {status === "LOADING" ? <div> Loading ...</div> : null}
        {status === "ERROR" ? (
          <div>{error}</div>
        ) : null}

        {status === "SUCCESS" && userSummary === undefined ? (
          <div>No Record Found</div>
        ) : null}

        {status === "SUCCESS" && userSummary !== null
          ? (
            <div style={{ display: "flex" }}>
              <div className={classes.image}>
                picture
                        </div>
              <div className={classes.main_description}>
                <div className={classes.main_description_name}>{userSummary.first_name} {userSummary.last_name}</div>
                <div className={classes.main_description_position}>{userSummary.job_title} .{userSummary.experience_years} yrs engineering experience . Started on {userSummary.employment_date_formatted} </div>
                <div className={classes.main_description_contacts}><i>Primary Email: {userSummary.email}. Personal Email: {userSummary.personal_email}. Phone: {userSummary.phone} </i></div>
                <div>Logos</div>
              </div>
              <div className={classes.buttonEdit}>
                <button className={classes.buttonEditIcon2}><EditIcon /></button>
              </div>
            </div>

          )
          : null}
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {status === "LOADING" ? <div> Loading ...</div> : null}
          {status === "ERROR" ? (
            <div>Oops! There was an Error. Try refreshing the page</div>
          ) : null}

          {status === "SUCCESS" && userSummary === undefined ? (
            <div>No Record Found</div>
          ) : null}

          {status === "SUCCESS" && userSummary !== null
            ? (

              <Summary
                title="Profile Summary"

                profile_summary={userSummary.profile_summary}

              />


            )
            : null}



        </Grid>

        <Grid item xs={12}>
          <Widget
            title="Professional Skills Overview"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card} disableWidgetMenu={true}
          >

          </Widget>
        </Grid>

        <Grid item xs={12}>
          <Employment title="Work History"
            id={userInfo.id}
            token={token} />

        </Grid>
        <Grid item xs={12}>

          <Education title="Education"
            id={userInfo.id}
            token={token} />
        </Grid>
        <Grid item xs={6}>
          <Widget
            title="Hobbies"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card} disableWidgetMenu={true}
          >

          </Widget>
        </Grid>
        <Grid item xs={6}>
          <Widget
            title="Interests"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card} disableWidgetMenu={true}
          >

          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

