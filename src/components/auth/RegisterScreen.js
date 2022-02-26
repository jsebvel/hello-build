import React, { useContext, useState } from 'react';
import { Form, Grid, Button, Label } from 'semantic-ui-react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../../context/auth';
import { useNavigate, Link } from 'react-router-dom';
import { registerSchema } from '../../utils/schemas/authSchema';


export const RegisterScreen = () => {
    const context = useContext(AuthContext);
    const history = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        resolver: yupResolver(registerSchema)
    });

    const [errorsGraph, setErrors] = useState({});

    const registerUser = (data) => {
        addUser({
            variables: { username: data.username, email: data.email, password: data.password, confirmPassword: data.confirmPassword }
        });
    }

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData);
            history('/login')
        },
        onError(err) {
            const resultErrors = err.graphQLErrors[0].extensions.errors
            setErrors(resultErrors);
        },
    });


    return (
        <div className='form-container ui form'>
            <h3>Register form</h3>
            <Form noValidate onSubmit={handleSubmit((data) => { registerUser(data) })} className={loading ? 'loading' : ''}>
                <Controller
                    name='username'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Form.Input
                        label='Username'
                        placeholder='username'
                        {...field}
                    >
                    </Form.Input>}
                />
                {errors.username && <Label className='label-error' pointing>{errors.username.message}</Label>}

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


                <Controller
                    name='confirmPassword'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Form.Input
                        type='password'
                        label='confirmPassword'
                        placeholder='confirmPassword'
                        {...field}
                    >
                    </Form.Input>}
                />
                {errors.confirmPassword && <Label className='label-error' pointing>{errors.confirmPassword.message}</Label>}


                <Grid columns='equal'>
                    <Grid.Column>
                        <Button basic color='teal'>Register</Button>
                    </Grid.Column>
                    <Grid.Column className='link'>
                        <Link to='/login'>Already register? Come Login!</Link>
                    </Grid.Column>

                </Grid>

            </Form>

        </div>
    )

}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register (
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            token
            username
            createdAt
        }
    }
`
