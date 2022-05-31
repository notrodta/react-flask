import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UserLoginInfo from '../../models/User';
import userService from '../../services/UserService';
import { useHistory } from 'react-router-dom';

interface IGithubLogin extends RouteComponentProps<any> {}

const GithubLogin = (props: IGithubLogin) => {
  const submitGithub = async (values: any) => {
    userService.githubLogin(values).then((data: any) => {
      console.log('token:', data.access_token);
      document.cookie = `accessToken=${data.access_token}`;
      localStorage.setItem('accessToken', data.access_token);
      window.location.reload();
      props.history.push('/');
    });
  };

  const handleLogin = async () => {
    window.location.href =
      'https://github.com/login/oauth/authorize?scope=user:email&amp;client_id=9d25250cc57a11ad9004';
  };

  useEffect(() => {
    // see if code was returned, returns an error if the user denies the request
    console.log('test');
    const newUrl = window.location.href;
    const hasCode = newUrl.includes('?code=');
    console.log(hasCode);

    if (hasCode) {
      // get the code value
      const url = newUrl.split('?code=')[1].split('#/login');
      const data = url[0];
      // send the code to the backend
      submitGithub(data as any);
    }
  }, []);

  return (
    <Grid item xs={12}>
      <Button variant="contained" onClick={handleLogin}>
        Login with github
      </Button>
    </Grid>
  );
};

export default withRouter(GithubLogin);
