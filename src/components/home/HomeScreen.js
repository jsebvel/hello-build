import React, { useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

export const HomeScreen = () => {
    const history = useNavigate();
    const location = useLocation();
    const { code } = queryString.parse(location.search);



    const getUserInfo = async () => {
        if (!code || localStorage.getItem('gitToken')) {
            const url = `/access_token?client_id=${process.env.REACT_APP_PUBLIC_CLIENT}&client_secret=${process.env.REACT_APP_PRIVATE_CLIENT}&code=${code}`;
            const response = await fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    Accept: 'application/json',
                },
            });
            const data = await response.json();
            localStorage.setItem('gitToken', data.access_token)
        }
        
    }

    useEffect(async () => {
        await getUserInfo();
    }, []);

    const { loading, data } = useQuery(GET_REPO);

    console.log(data);





    return (
        <div>HomeScreen</div>
    )
}

const GET_REPO = gql`
{
  viewer {
    repositories(first: 100) {
      totalCount
      nodes {
        nameWithOwner
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
`