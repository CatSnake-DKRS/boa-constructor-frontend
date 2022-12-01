import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SchemaDialogue from './SchemaDialogue';

const inlineStyle = {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '1em',
  alignItems: 'center',
};

export default function (props) {
  const [openSchemaBox, setOpenSchemabox] = useState(false);

  const handleSchemaBoxOpen = () => {
    setOpenSchemabox(true);
  };

  const handleSchemaBoxClose = () => {
    setOpenSchemabox(false);
  };

  const {
    inputTextLength,
    handleSubmit,
    handleTyping,
    inputLabel,
    shrinkComponent,
    queryMode,
    handleSchemaSubmit,
  } = props;
  // Variable to display remaining characters allowed in input field (max is set to 250)
  const characterCount = `${inputTextLength} / 250`;
  let schemaButton = [];
  if (queryMode === 'en-to-sql') {
    schemaButton = (
      <>
        <Button
          onClick={handleSchemaBoxOpen}
          style={{ paddingTop: '10px', margin: 2 }}
          fullWidth
          size='large'
          sx={{ width: 'auto' }}
          variant='outlined'
        >
          Add Schema
        </Button>
        <SchemaDialogue
          openSchemaBox={openSchemaBox}
          handleSchemaBoxClose={handleSchemaBoxClose}
          handleSchemaSubmit={handleSchemaSubmit}
        />
      </>
    );
    console.log(schemaButton);
  }
  return (
    <div className='boxes' id='Input' style={inlineStyle}>
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
      <div id='inputButtonContainer'>
        {schemaButton}
        <Button
          style={{ paddingTop: '10px', margin: 2 }}
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
    </div>
  );
}
