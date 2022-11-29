import React from 'react';
import { TextField, Button, ButtonGroup } from '@mui/material';

// REMINDER: move to CSS stylesheet
const inlineStyle = {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '1em',
};

export default function (props) {
  return (
    <div id='Output' className='boxes' style={inlineStyle}>
      <TextField
        multiline
        rows={20}
        placeholder='Plain English'
        variant='filled'
        fullWidth
        readOnly
        value={props.outputText}
        helperText='Copy text to clipboard'
      />
      <ButtonGroup
        id='CopyButtons'
        sx={{
          display: 'inline-flex',
          justifyContent: 'center',
        }}
      >
        <Button
          style={{ paddingTop: '10px', margin: 2 }}
          variant='contained'
          size='large'
          onClick={() => props.copySudo()}
        >
          Copy As Sudo Code
        </Button>
        <Button
          style={{ paddingTop: '10px', margin: 2 }}
          variant='contained'
          size='large'
          onClick={() => props.copyNormal()}
        >
          Copy Explanation
        </Button>
      </ButtonGroup>
    </div>
  );
}
