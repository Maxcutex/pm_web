import React, { useState } from 'react';
import {
  TextField, Button,
} from '@material-ui/core';
import useStyles from "../../styles";
import { Search as SearchIcon } from '@material-ui/icons';
import classnames from "classnames";

const SimpleSearch = () => {
  const classes = useStyles();
  const [nameEmail, setNameEmail] = useState('');

  return (<div>
    <div style={{ display: "flex" }}>
      <div>[Simple Search]</div>
      <div>Go to Advanced</div>
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

export default SimpleSearch;