import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid, Transition } from 'semantic-ui-react';
import { SingleRepo } from '../../components/SingleRepo';
import { FETCH_REPOS_QUERY } from '../../utils/graphqlUtils';

export const FavRepo = () => {
    const { loading, data } = useQuery(FETCH_REPOS_QUERY);
    return (
        <div>
            <h3>Here you can find your Favorites Repos</h3>
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