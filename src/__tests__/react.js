import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

// mode buttons render different things and translate button sends to
// different endpoint in each mode
// after submission a response is generated in the output
// when open history is clicked a dropdown menu appears
// user cannot type in output field
// log in button allows user to type in username and password
// submit sends data to correct endpoint
// user is logged in when existing username and pw are typed
// user can sign up
// logout logs user out
// copy buttons successfully copy output text
// schema button successfully creates and sends schema (when translate is clicked)
