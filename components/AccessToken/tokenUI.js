import React, {useState,useEffect} from 'react';
import {Button} from 'antd';
import stravaApi from './stravaApi';
import axios from 'axios';


const TokenUI = () => {
  const [uploads,setAccessToken] = useState({
    access_token : 'testAccessToken'
  });


  const onGetToken = (e) => {
    e.preventDefault();
    const qs = new URLSearchParams(window.location.search);
    const code = qs.get('code');
    const state = qs.get('state');
    axios.post('https://www.strava.com/oauth/token',{
      client_id : '39824',
      client_secret : '7bf051192f5177265bf088ac4461293c053e84e1',
      code : code,
      grant_type : 'authorization_code'
    }).then(function(response){
      console.log(response.data.access_token);
      const accessToken = response.data.access_token;
      setAccessToken({
        ...uploads,
        access_token : accessToken
      });
    });
  };
  return(
    <div>
      <Button className="btnToken" style={{marginBottom:"10px"}} icon="eye" onClick={onGetToken}>GetToken</Button>
      <p>{uploads.access_token}</p>
      <stravaApi access = {uploads.access_token} />
    </div>
  );
};


export default TokenUI;
