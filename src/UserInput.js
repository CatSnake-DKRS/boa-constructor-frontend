import React from 'react';
import { Button, TextField } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SchemaBox from './SchemaBox';
import Shark from './static/shark.png';

const inlineStyle = {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '1em',
  alignItems: 'center',
};

export default function (props) {
  const {
    inputTextLength, handleSubmit, handleTyping, inputLabel, shrinkComponent, queryMode,
  } = props;
  // Variable to display remaining characters allowed in input field (max is set to 250)
  const characterCount = `${inputTextLength} / 250`;
  let schemaBox = [];
  if (queryMode === 'en-to-sql') {
    schemaBox = <SchemaBox />;
    console.log(schemaBox);
  }
  return (
    <div className='boxes' id='Input' style={inlineStyle}>
      {schemaBox}
      <TextField
        InputLabelProps={shrinkComponent}
        inputProps={{ maxLength: 250 }}
        style={{ fontFamily: 'Monospace' }}
        name='input Text'
        id='filled-multiline-static'
        label={inputLabel}
        multiline
        rows={20}
        variant='filled'
        fullWidth
        placeholder='Javascript'
        onChange={(event) => {
          handleTyping(event);
        }}
        helperText={characterCount}
      />
      <Button
        style={{ paddingTop: '10px' }}
        fullWidth
        startIcon={<KeyboardDoubleArrowRightIcon />}
        endIcon={<KeyboardDoubleArrowLeftIcon />}
        variant='contained'
        size='large'
        onClick={(event) => handleSubmit(event)}
        sx={{ width: 'auto' }}
      >
        Translate
      </Button>
    </div>
  );
}
