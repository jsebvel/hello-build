import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { AuthContext } from '../../context/auth';
import { GitRepos } from '../../components/GitRepos';

export const HomeScreen = () => {
  const context = useContext(AuthContext)
  const location = useLocation();
  const { code } = queryString.parse(location.search);
  const gitToken = localStorage.getItem('gitToken')

  const getUserInfo = async () => {
    if (!gitToken) {
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
    } else {
      context.gitHubLogin(gitToken);

    }
  }

  useEffect(async () => {
    await getUserInfo();
  });

  return (
    <div>
      {
        gitToken!== null ? <GitRepos /> : <h3>Getting repos</h3>
      }
    </div>
  )
}

