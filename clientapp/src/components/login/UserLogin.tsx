import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UserLoginInfo from '../../models/User';
import userService from '../../services/UserService';
import { accessToken } from '../../services/ApiRequest';
import { getCookie } from '../../common/helper';

interface IUserLogin extends RouteComponentProps<any> {}

const UserLogin = (props: IUserLogin) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    const userInfo: UserLoginInfo = {
      username: username,
      password: password
    };
    userService.post(userInfo).then((data: { access_token: string; refresh_token: string }) => {
      console.log(data);
      document.cookie = `accessToken=${data.access_token}`;
      localStorage.setItem('accessToken', data.access_token);
      window.location.reload();
    });
  };

  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <p>Login</p>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default withRouter(UserLogin);
