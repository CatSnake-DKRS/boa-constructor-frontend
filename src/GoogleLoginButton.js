import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';


export default function (props) {
  const onSuccess = (res) => {
    console.log('success:', res);
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };

  const clientId = process.env.GOOGLE_CLIENT_ID;

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onGoogleSuccess = (res) => {
    const username = res.profileObj.email;
    const email = res.profileObj.email;
    const requestURI = `${process.env.BACKEND_USER_URI}/login`;
    
    try {
    const signUp = async () => {
        const response = await axios.post(requestURI, {
          username,
          email,
        });
        setUsername(response.data);
        } ;
    }
  }

  const onGoogleFailure = (err) => {
    console.log('failed:', err);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText='Sign in with Google'
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  );
}
