import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
} from '@mui/material';

function SchemaDialogue(props) {
  const {
    openSchemaBox, handleSchemaBoxClose, handleSchemaSubmit, stringSchema,
  } = props;

  // handles updating of user schema on submission of schema box

  return (
    <Dialog open={openSchemaBox} onClose={handleSchemaBoxClose}>
      <DialogTitle>Enter Your Database Schema</DialogTitle>
      <DialogContent>
        <Box
          component='form'
          onSubmit={handleSchemaSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Typography variant='subtitle1' gutterBottom>
            Place each table on a new line
            <br />
            Columns should be placed in parenthesis next to corresponding tables and
            separated by commas
          </Typography>
          <TextField
            margin='normal'
            multiline
            rows={7}
            required
            fullWidth
            defaultValue={stringSchema}
            id='table-name'
            label='Enter your Schema here'
            placeholder='Table1(column1, column1, column3)'
            name='schema'
            autoComplete='off'
          />
          <Typography variant='subtitle1' gutterBottom>
            Example:
            <br />
            Table1(column1, column1, column3)
            <br />
            Table2(column4, column5, column6)
          </Typography>
          {/* <TextField
            margin='normal'
            required
            fullWidth
            id='column-names'
            label='Column Names (Separated By Commas)'
            name='column-names'
            autoComplete='off'
          /> */}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            color='secondary'
          >
            Submit Schema
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default SchemaDialogue;
