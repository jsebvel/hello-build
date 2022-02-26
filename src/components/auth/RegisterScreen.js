import React from 'react';
import { Form, Grid, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export const RegisterScreen = () => {
    const schema = yup.object({
        username: yup.string().required().length(3),
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        resolver: yupResolver(schema)
    });


    const loading = false;
    const registerUser = () => {
        { }
    }

    return (
        <div className='form-container ui form'>
            <Form noValidate onSubmit={handleSubmit((data) => { console.log(data, 'data'); console.log(errors) })} className={loading ? 'loading' : ''}>
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
                {errors.username && <Label pointing>{errors.username.message}</Label>}

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
