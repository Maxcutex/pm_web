import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import UsersTable from "./UsersTable";

//api
import { getAllUsers } from '../../api/getUserDetailsApi';
import { getToken } from "../../utils/common";
// styles
import useStyles from "./styles";
import SimpleSearch from "./components/SimpleSearch/SimpleSearch";
import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch";
import classnames from "classnames";



export default function Users() {
  const classes = useStyles();
  const [postedData, setPostedData] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState(null);
  const [searchType, setSearchType] = useState('Simple');
  var token = getToken();
  useEffect(() => {
    setStatus("LOADING");
    getAllUsers(token)
      .then(data => {
        setUsers(data.payload.users);
        setStatus("SUCCESS");
      })
      .catch(error => {
        setStatus("ERROR");
        setError(error.message);
      });
  }, [postedData]);
  return (
    <>
      <div className={classes.main_header2}>
        <div style={{ display: "flex" }}>
          <div><h3>Users</h3></div>
          <div style={{ marginLeft: "auto", paddingTop: "1rem" }}>
            <button className={classnames(classes.btn, classes.btnSuccess)}>Create New User</button>
          </div>
        </div>
        <div className={classes.search_form}>
          <div>Use simple search or Advanced Search</div>
          {searchType == 'Simple' ? (
            <SimpleSearch />
          ) : (
              <AdvancedSearch />
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

          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
