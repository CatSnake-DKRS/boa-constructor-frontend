import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from '@mui/material';

function SchemaDialogue(props) {
  const { openSchemaBox, handleSchemaBoxClose, handleSchemaSubmit } = props;
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
          <TextField
            margin='normal'
            required
            fullWidth
            id='table-name'
            label='Table Name'
            name='table-name'
            autoComplete='off'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='column-names'
            label='Column Names (Separated By Commas)'
            name='column-names'
            autoComplete='off'
          />
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
