import gql from "graphql-tag";

export const FETCH_REPOS_QUERY = gql`
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