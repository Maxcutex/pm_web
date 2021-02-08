import React, { useState } from 'react';
import {
  TextField, Button,
} from '@material-ui/core';
import useStyles from "../../styles";
import { Search as SearchIcon } from '@material-ui/icons';
import classnames from "classnames";

const SimpleSearch = ({ handleSearch }) => {
  const classes = useStyles();
  const [nameEmail, setNameEmail] = useState('');

  return (<div>
    <div style={{ display: "flex" }}>
      <div className={classnames(classes.searchHeaderTitle)}>Simple Search</div>

    </div>
    <hr className={classes.hrDivider} />
    <div style={{ display: "flex" }}>

      <div className={classnames(classes.formTextDiv)}>
        <TextField
          id="searchValue" autoComplete="new-password"
          label="Institution Name or City" fullWidth required
          value={nameEmail}
          onChange={e => setNameEmail(e.target.value)}
        />
      </div>
      <div className={classnames(classes.formTextDiv)}>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<SearchIcon />} onClick={() => {
            handleSearch(nameEmail)
          }}
        >
          Search
      </Button>

      </div>
    </div>
  </div>);
}

export default SimpleSearch;