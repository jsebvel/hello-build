import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { AuthContext } from '../../context/auth';
import { GitRepos } from '../../components/GitRepos';

export const HomeScreen = () => {
  const context = useContext(AuthContext)
  const location = useLocation();
  const { code } = queryString.parse(location.search);

  const getUserInfo = async () => {
    const url = `/access_token?client_id=${process.env.REACT_APP_PUBLIC_CLIENT}&client_secret=${process.env.REACT_APP_PRIVATE_CLIENT}&code=${code}`;
    const response = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
      },
    });
    const data = await response.json();
    context.gitHubLogin(data.access_token);
  }

  useEffect(async () => {
    await getUserInfo();
  }, []);

  return (
    <div>
      <h3>HomeScreen</h3>
      {
        context.gitToken ?  <GitRepos /> : <h3>gfsdfds</h3>
      }
    </div>
  )
}

