import { useMutation } from '@apollo/client';
import { post } from 'jquery';
import React, { useContext, useState } from 'react';
import { Card, Grid } from 'semantic-ui-react'
import gql from 'graphql-tag';
import { AuthContext } from '../context/auth';
import { FETCH_REPOS_QUERY } from '../utils/graphqlUtils';

export const SingleRepo = ({ repo }) => {
   
    const context = useContext(AuthContext);
    const username = localStorage.getItem('username');
    const [liked, setLike] = useState(false);
    const callLikeRepo = () => {
        liked ? setLike(false) : setLike(true)
        likeRepo({
            variables: {
                repoId: repo.size ? repo.id.toString() : repo.repoId,
                username,
                owner: repo.owner.login ? repo.owner.login : repo.owner,
                fullName: repo.full_name ? repo.full_name : repo.fullName,
                name: repo.name,
                url: repo.url,
                gitUrl: repo.git_url ? repo.git_url : repo.gitUrl,
                liked,
                language: repo.language ? repo.language : ''
            }
        });
        window.location.reload();
       
    }


    const [likeRepo] = useMutation(LIKE_REPO_MUTATION)

    return (
        <Card style={{ wordWrap: 'break-word' }} fluid >
            <Card.Content>
                <Card.Header> Owner: {repo.owner.login} </Card.Header>
                <Card.Meta>Full name: {repo.full_name}</Card.Meta>
                <Card.Description>
                    Short name: {repo.name}
                    <br />
                    URL: {repo.url}
                    <br />
                    Git URL: {repo.git_url}
                    <br />
                    Language: {repo.language}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className={liked ? "ui red button basic" : ""} onClick={callLikeRepo}>
                    <i className="heart icon" />
                </div>
            </Card.Content>
        </Card>
    )
}

const LIKE_REPO_MUTATION = gql`
    mutation createFavRepo(
        $id: ID
        $repoId: String!
        $username: String!
        $owner: String!
        $fullName: String!
        $name: String!
        $url: String!
        $gitUrl: String!
        $liked: Boolean!
        $language: String!
    ) {
        createFavRepo(
            id: $id
            repoId: $repoId
            username: $username
            owner: $owner
            fullName: $fullName
            name: $name
            url: $url
            gitUrl: $gitUrl
            liked: $liked
            language: $language

        ) {
            id
            username
            owner
            fullName
            name
            url
            gitUrl
            liked
            repoId
            language
        }
    }
`