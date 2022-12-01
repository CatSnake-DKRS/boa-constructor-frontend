import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SchemaDialogue from './SchemaDialogue';
import Shark from './static/shark.png';

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
    setUserSchema,
    stringSchema,
    setStringSchema,
  } = props;
  // Variable to display remaining characters allowed in input field (max is set to 250)
  const characterCount = `${inputTextLength} / 250`;
  let schemaButton = [];
  const handleSchemaSubmit = (e) => {
    const handleSchemaString = (schemaString) => {
      const schemaObj = {};
      const tables = schemaString.split(/\r?\n/);
      console.log('tables: ', tables);
      tables.forEach((el) => {
        const tableName = el.substring(0, el.indexOf('('));
        const regExp = /\(([^)]+)\)/;
        const columns = regExp.exec(el)[1];
        console.log('columns: ', columns);
        schemaObj[tableName] = columns;
      });
      return schemaObj;
    };
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const schemaString = data.get('schema');
    setStringSchema(schemaString);
    // const columnNames = data.get('column-names');
    const schemaObj = handleSchemaString(schemaString);
    // schemaObj[tableName] = columnNames;

    setUserSchema(schemaObj);

    setOpenSchemabox(false);
  };
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
          setUserSchema={setUserSchema}
          handleSchemaSubmit={handleSchemaSubmit}
          stringSchema={stringSchema}
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
