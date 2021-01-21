import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckBoxWithLabel({ onChange, name, id, isChecked }) {
  return (

    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={onChange}
          name={name}
          id={id}
          color="primary"
        />
      }
      label={name}
    />
  );
}
