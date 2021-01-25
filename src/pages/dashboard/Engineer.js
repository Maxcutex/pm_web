import React, { useState, useEffect } from "react";
import {
  Grid,

} from "@material-ui/core";



// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import Summary from "./components/Summary/Summary"
import Employment from "./components/Employment/Employment"
import Education from "./components/Education/Education"
import { getToken } from "../../utils/common";

//api
import { getUserProfile } from '../../api/getUserDetailsApi';
import Banner from "./components/Banner/Banner";

const Engineer = ({ props }) => {
  var classes = useStyles();
  // get current user details
  var token = getToken()
  // local
  const [userSummary, setUserSummary,] = useState(null);
  const [status, setStatus] = useState("IDLE");
  const [error, setError] = useState('');
  const id = props.match.params.id;
  useEffect(() => {
    setStatus("LOADING");
    getUserProfile(id)
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
            <Banner first_name={userSummary.first_name} last_name={userSummary.last_name} job_title={userSummary.job_title} experience_years={userSummary.experience_years}
              employment_date_formatted={userSummary.employment_date_formatted}
              email={userSummary.email} personal_email={userSummary.personal_email} phone={userSummary.phone} image_url={userSummary.image_url}
              isOwner={false}
            />
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
                id={id}
                profile_summary={userSummary.profile_summary}
                isOwner={false}

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
            id={id} isOwner={false}
            token={token} />

        </Grid>
        <Grid item xs={12}>

          <Education title="Education"
            id={id} isOwner={false}
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

export default Engineer;