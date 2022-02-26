import React from 'react'
import { Form, Grid, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, registerSchema } from '../../utils/schemas/authSchema';

export const LoginScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema)
  });

  const loading = false;

  return (
    <div className='form-container ui form'>
      <h3>Login form</h3>
      <Form noValidate onSubmit={handleSubmit((data) => { console.log(data, 'data'); console.log(errors) })} className={loading ? 'loading' : ''}>
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
            <Button basic color='teal'>Register</Button>
          </Grid.Column>
          <Grid.Column className='link'>
            <Link to='/register'>Not register? Come register!</Link>
          </Grid.Column>

        </Grid>

      </Form>

    </div>
  )
}
