import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: "0.9rem",
    width: 200,
  },
}));

export default function DateWithCalendarPicker({ id, label, dateValue, setOnChange }) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id={id}
        label={label}
        type="date"
        onChange={setOnChange}
        defaultValue={dateValue}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
