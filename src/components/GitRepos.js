import React, { useContext, useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react';
import { AuthContext } from '../context/auth'
import { SingleRepo } from './SingleRepo';

export const GitRepos = () => {
    const context = useContext(AuthContext);
    const [repos, setRepos] = useState([]);
    console.log(context);

    const getUserRepo = async () => {
        if (context.gitToken.length > 0) {
            const url = 'https://api.github.com/user/repos';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `token ${context.gitToken}`
                },
            });
            const reposRes = await response.json();
            setRepos(reposRes);
            console.log(repos);
        }
    }

    useEffect(() => {
        getUserRepo();
    }, [])
    return (
        <div>
            <h3>GitRepos</h3>
            {
                repos && repos.length > 0
                    ? (repos.map(repo =>
                        <Grid.Column key={repo.id}>
                            <SingleRepo repo={repo}/>
                        </Grid.Column>
                    ))
                    : <h1>Getting repos ...</h1>
            }
        </div>

    )
}
