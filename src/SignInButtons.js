import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from '@mui/material';
import axios from 'axios';

function SignInButtons(props) {
  const { setUsername, stateUsername } = props;
  //state to help manage what buttons show based on login conditions
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);

  //state to help populate error fields when logins/signups are done incorrectly
  const [errorSignUp, setErrorSignUp] = React.useState('');
  const [errorLogin, setErrorLogin] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');

  // opens and closes dialogue boxes for sign in and sign up functionality
  const handleClickLoginOpen = () => {
    setErrorLogin('');
    setOpenLogin(true);
  };

  const handleClickSignUpOpen = () => {
    setErrorSignUp('');
    setErrorPassword('');
    setOpenSignUp(true);
  };

  const handleLoginClose = () => {
    setErrorLogin('');
    setOpenLogin(false);
  };

  const handleSignUpClose = () => {
    setErrorSignUp('');
    setErrorPassword('');
    setOpenSignUp(false);
  };

  // sends username and password to server to authenticate user
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestURI = `${process.env.BACKEND_USER_URI}/login`;
    const data = new FormData(e.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    const login = async () => {
      try {
        const response = await axios.post(requestURI, {
          username,
          password,
        });

        // if username or pw incorrect, display message saying so
        // change state of username with success
        setUsername(response.data);

        //add username to session storage
        sessionStorage.setItem('username', username);
        // close dialog
        setOpenLogin(false);
        setErrorLogin('');
        // remove sign in and sign up bottons
      } catch (error) {
        setErrorLogin('password or username were not valid');
      }
    };
    login();
    console.log('submitted', username, password);
    // setLoginStatus(true);
    // snackbar
  };

  // send user info to backend for user creation in DB
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const requestURI = `${process.env.BACKEND_USER_URI}/new`;
    const data = new FormData(e.currentTarget);
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    const confirmPass = data.get('confirm-password');
    // check that pw and confirm pw match
    if (password !== confirmPass) {
      setErrorPassword('passwords do not match');
      return;
    }
    // REMINDER: Implement username verification
    // check if username exists
    // if all pass, save new user
    const signUp = async () => {
      try {
        const response = await axios.post(requestURI, {
          username,
          password,
          email,
        });
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('email', email);
        setUsername(response.data);
        setOpenSignUp(false);
      } catch (error) {
        setErrorSignUp('password or username was not valid');
      }
    };
    signUp();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    // change state of username to empty string
    //clear any error messages that may be lingering
    setUsername('');
    setErrorSignUp('');
    setErrorLogin('');
    setErrorPassword('');
    //clear username from sessionId
    sessionStorage.clear();
  };

  // if user is logged in, then render logout button
  if (stateUsername !== '') {
    return (
      <div id='SignInButtons'>
        <Button
          id='logout'
          variant='contained'
          color='secondary'
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    );
  }
  // if user is not logged, then render sign up and login buttons

  return (
    <div id='SignInButtons'>
      <Button
        id='signin'
        variant='contained'
        color='secondary'
        onClick={handleClickLoginOpen}
      >
        Sign In
      </Button>
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
              helperText={errorLogin}
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
              helperText={errorLogin}
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

      <Button id='signup' color='secondary' onClick={handleClickSignUpOpen}>
        Sign Up
      </Button>
      <Dialog open={openSignUp} onClose={handleSignUpClose}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <Box
            component='form'
            onSubmit={handleSignUpSubmit}
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
              helperText={errorSignUp}
            />
            <TextField
              margin='normal'
              fullWidth
              id='email'
              label='Email (optional)'
              name='email'
              autoComplete='off'
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
              helperText={errorSignUp}
            />
            <TextField
              type='password'
              margin='normal'
              required
              fullWidth
              id='confirm-password'
              label='Confirm Password'
              name='confirm-password'
              autoComplete='off'
              helperText={errorPassword}
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
    </div>
  );
}

export default SignInButtons;
