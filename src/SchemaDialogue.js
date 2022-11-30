import React from 'react';
import { TextField } from '@mui/material';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
}

function SchemaDialogue() {
  return (
    <Dialog open={openLogin} onClose={handleLoginClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <Box
          component='form'
          onSubmit={handleLoginSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='off'
            autoFocus
          />
          <TextField
            type='password'
            margin='normal'
            required
            fullWidth
            id='password'
            label='Password'
            name='password'
            autoComplete='off'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            color='secondary'
          >
            Sign In
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default SchemaDialogue;
