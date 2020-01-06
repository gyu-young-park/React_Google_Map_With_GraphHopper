import axios from 'axios';

export const stravaOuathToken = (code) => {
  axios.post('https://www.strava.com/oauth/token',{
    client_id : '39824',
    client_secret : '7bf051192f5177265bf088ac4461293c053e84e1',
    code : code,
    grant_type : 'authorization_code'
  })
}
