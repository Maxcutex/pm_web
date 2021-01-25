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
import decodeToken from "../../utils/jwtDecode";

//api
import { getUserProfile } from '../../api/getUserDetailsApi';
import Banner from "./components/Banner/Banner";
import Skills from "./components/Skills/Skills";

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
    getUserProfile(userInfo.id)
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
            <Banner userSummary={userSummary}
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
                id={userInfo.id}
                profile_summary={userSummary.profile_summary}
                isOwner={false}

              />


            )
            : null}



        </Grid>

        <Grid item xs={12}>
          <Skills id={userInfo.id} isOwner={false} />
        </Grid>

        <Grid item xs={12}>
          <Employment title="Work History"
            id={userInfo.id} isOwner={false}
            token={token} />

        </Grid>
        <Grid item xs={12}>

          <Education title="Education"
            id={userInfo.id} isOwner={false}
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
