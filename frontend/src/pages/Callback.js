import React, { useEffect} from 'react';
import httpClient from '../httpClient';
import { useLocation } from 'react-router-dom';

const Callback = ({ onLogin }) => {

  const location = useLocation(); // Get the current location

  useEffect(() => {
    // Extract the code from the URL parameters when the component mounts
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code) {
      // If a code is present in the URL parameters, include it in the GET request to the backend
      handleCallback(code);
      onLogin();
    }
  }, [location.search, onLogin]); // Only run this effect once when the component mounts

  const handleCallback = async (code) => {
    try {
      // Make a GET request to the '/spotify/callback' endpoint on the backend with the authentication code
      await httpClient.get(`/spotify/callback?code=${code}`);
      // Handle the response as needed
      window.location.href = '/';
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    }
  };



  return(    
    <div className='center'>
      Loading...
    </div>
  )
}

export default Callback;