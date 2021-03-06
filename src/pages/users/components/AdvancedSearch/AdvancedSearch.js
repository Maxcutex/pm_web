import React, { useState } from 'react';
import {
  TextField, Button,
} from '@material-ui/core';
import useStyles from "../../styles";
import { Search as SearchIcon } from '@material-ui/icons';
import classnames from "classnames";

const AdvancedSearch = ({ handleSearchShow }) => {
  const classes = useStyles();
  const [nameEmail, setNameEmail] = useState('');

  return (<div>
    <div style={{ display: "flex" }}>
      <div className={classnames(classes.searchHeaderTitle)}>Advanced Search</div>
      <div className={classnames(classes.searchHeaderLink)} onClick={() => {
        handleSearchShow("Simple");
      }}>Go to Simple</div>
    </div>
    <hr />
    <div style={{ display: "flex" }}>

      <div className={classnames(classes.formTextDiv)}>
        <TextField
          id="nameOrEmail"
          label="Name or Email" fullWidth required
          value={nameEmail}
          onChange={e => setNameEmail(e.target.value)}
        />
      </div>
      <div className={classnames(classes.formTextDiv)}>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<SearchIcon />}
        >
          Search
      </Button>

      </div>
    </div>
  </div>);
}

export default AdvancedSearch;