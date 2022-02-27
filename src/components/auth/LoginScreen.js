import React, { useState, useContext } from 'react'
import { Form, Grid, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/react-hooks';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import gql from 'graphql-tag';


import { loginSchema } from '../../utils/schemas/authSchema';

export const LoginScreen = () => {
  const context = useContext(AuthContext);
  const history = useNavigate();
  const [errorsGraph, setErrors] = useState({});

  const loginU = (data) => {
    loginUser({
      variables: { email: data.email, password: data.password }
    });
  }

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema)
  });


  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      window.location = `https://github.com/login/oauth/authorize?client_id=3dcf50b64c96f54858b7`;
    },
    onError(err) {
      console.log(error);
      const resultErrors = err.graphQLErrors[0].extensions.errors
      setErrors(resultErrors);
    }
  });

  return (
    <div className='form-container ui form'>
      <h3>Login form</h3>
      <Form noValidate onSubmit={handleSubmit((data) => { loginU(data) })} className={loading ? 'loading' : ''}>
        <Controller
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Form.Input
            label='email'
            placeholder='email'
            {...field}
          >
          </Form.Input>}
        />
        {errors.email && <Label className='label-error' pointing>{errors.email.message}</Label>}

        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Form.Input
            label='password'
            placeholder='password'
            type='password'
            {...field}
          >
          </Form.Input>}
        />
        {errors.password && <Label className='label-error' pointing>{errors.password.message}</Label>}


        <Grid columns='equal'>
          <Grid.Column>
            <Button basic color='teal'>Login!</Button>
          </Grid.Column>
          <Grid.Column className='link'>
            <Link to='/register'>Not register? Come register!</Link>
          </Grid.Column>

        </Grid>

      </Form>

    </div>
  )
}

const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login (email: $email, password: $password ) {
            id
            email
            token
            username
            createdAt
        }
    }
`;
