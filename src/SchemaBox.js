import React from 'react';
import { TextField } from '@mui/material';

function SchemaBox() {
  return (
    <TextField
      // InputLabelProps={shrinkComponent}
      inputProps={{ maxLength: 250 }}
      style={{ fontFamily: 'Monospace' }}
      name='input Text'
      id='filled-multiline-static'
      // label={inputLabel}
      multiline
      rows={9}
      variant='outlined'
      fullWidth
      placeholder='Schema'
      // onChange={(event) => {
      //   handleTyping(event);
      // }}
      // helperText={characterCount}
    />
  );
}

export default SchemaBox;
