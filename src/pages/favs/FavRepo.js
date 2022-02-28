import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid, Transition } from 'semantic-ui-react';
import { SingleRepo } from '../../components/SingleRepo';

export const FavRepo = () => {
    const { loading, data } = useQuery(FETCH_REPOS_QUERY);
    console.log(data);
    return (
        <div>
            <h3>FavRepo</h3>
            {loading
                ? (<h1>Loading posts</h1>)
                : <Transition.Group>
                    {
                        (
                            data && data.getFavRepos.map(repo =>
                                <Grid.Column key={repo.repoId}>
                                    <SingleRepo repo={repo} />
                                </Grid.Column>
                            ))
                    }
                </Transition.Group>
            }
        </div>
    )
}

const FETCH_REPOS_QUERY = gql`
{
    getFavRepos {
    id
     username
     owner
     fullName
     name
     url
     gitUrl
     liked
     repoId 
   }
}
` 