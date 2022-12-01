import React, { useEffect } from 'react';
import { TextField } from '@mui/material';

function SchemaBox(props) {
  const { userSchema, queryMode, stringSchema } = props;
  if (userSchema && queryMode === 'en-to-sql') {
    return (
      <TextField
        label='Your SQL Schema'
        multiline
        rows={20}
        defaultValue={stringSchema}
        variant='filled'
        sx={{
          width: 300,
        }}
        inputProps={{ readOnly: true }}
        style={{ marginRight: '10px' }}
      />
    );
  }
  return <div />;
}

export default SchemaBox;
