import React, { useEffect, forceUpdate } from 'react';
import { TextField } from '@mui/material';

function SchemaBox(props) {
  const { userSchema, queryMode } = props;
  if (userSchema && queryMode === 'en-to-sql') {
    return (
      <TextField
        multiline
        rows={20}
        placeholder={userSchema.toString()}
        variant='filled'
        fullWidth
        readOnly
      />
    );
  }
  return <div />;
}

export default SchemaBox;
