import React from 'react';
import { TextField, Button, ButtonGroup } from '@mui/material';

// REMINDER: move to CSS stylesheet
const inlineStyle = {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '1em',
};

export default function (props) {
  const {
    outputText, copySudo, copyNormal, outputLabel, queryMode, expButtonText,
  } = props;

  let sudoCodeButton;
  if (queryMode === 'code-to-en') {
    sudoCodeButton = (
      <Button
        style={{ paddingTop: '10px', margin: 2 }}
        variant='contained'
        size='large'
        onClick={() => copySudo()}
      >
        Copy As Sudo Code
      </Button>
    );
  } else {
    sudoCodeButton = [];
  }

  return (
    <div id='Output' className='boxes' style={inlineStyle}>
      <TextField
        multiline
        rows={20}
        placeholder={outputLabel}
        variant='filled'
        fullWidth
        readOnly
        value={outputText}
        helperText='Copy text to clipboard'
      />
      <ButtonGroup
        id='CopyButtons'
        sx={{
          display: 'inline-flex',
          justifyContent: 'center',
        }}
      >
        {sudoCodeButton}
        <Button
          style={{ paddingTop: '10px', margin: 2 }}
          variant='contained'
          size='large'
          onClick={() => copyNormal()}
        >
          {expButtonText}
        </Button>
      </ButtonGroup>
    </div>
  );
}
