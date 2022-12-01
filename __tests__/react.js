import React from 'react';
import userEvent from '@testing-library/user-event';
import {
  render, screen, waitFor, fireEvent, getByText, getByLabelText
} from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

import { Experimental_CssVarsProvider } from '@mui/material';
import App from '../src/App';
import BoxContainer from '../src/BoxContainer'

describe('renders correct text on main page', () => {
  let text;
  beforeEach(() => {
    text = render(<App />);
  });

  test('Renders boa constructor text', () => {
    console.log('testText: ', typeof text.getByText('Boa Constructor'));
    const testText = screen.getByText('Boa Constructor');
    expect(testText).toBeTruthy();
  });

  test('all buttons appear on the page', () => {
    expect(screen.getByText('Code to English')).toBeTruthy();
    expect(screen.getByText('English to Code')).toBeTruthy();
    expect(screen.getByText('English to SQL')).toBeTruthy();
    expect(screen.getByText('Translate')).toBeTruthy();
    expect(screen.getByText('Copy As Sudo Code')).toBeTruthy();
    expect(screen.getByText('COPY EXPLANATION')).toBeTruthy();
  });

  test('correct label text renders on input box', () => {
    expect(screen.getByText('Paste your code')).toBeTruthy();
  })
});

// mode buttons render different things and translate button sends to
describe('clicking mode buttons generates different page elements', () => {

  let text;
  beforeEach(() => {
    text = render(<BoxContainer />);
  });

  test('clicking "English to Code" button changes page elements', () => {
    // console.log('button: ', getByText('English to Code'))
    fireEvent(
      screen.getByText('English to Code'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
    expect(screen.getByText('Type your plain english to be translated')).toBeTruthy();
  })
})

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
