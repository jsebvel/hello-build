import React, { useState } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
    const errors = [];
    const loading = false;
    const [username, setUsername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const onChangeUserName = (usernameText) => {
        setUsername(usernameText.target.value);
    }

    const onChangeEmail = (emailText) => {
        setemail(emailText.target.value)
        console.log(username);
    }

    const onChangePassword = (passwordText) => {
        setpassword(passwordText.target.value)
    }

    const onChangeConfirmPassword = (confirmPasswordText) => {
        setconfirmPassword(confirmPasswordText.target.value)
    }



    const registerUser = () => {
        { }
    }

    return (
        <div className='form-container ui form'>
            <Form noValidate onSubmit={registerUser} className={loading ? 'loading' : ''}>
                <Form.Input
                    className="field"
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={username}
                    onChange={onChangeUserName}
                >
                </Form.Input>

                <Form.Input
                    className="field"
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="text"
                    value={email}
                    onChange={onChangeEmail}
                >
                </Form.Input>

                <Form.Input
                    className="field"
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                >
                </Form.Input>

                <Form.Input
                    className="field"
                    label="Confirm Password"
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={onChangeConfirmPassword}
                >
                </Form.Input>

                <Grid columns='equal'>
                    <Grid.Column>
                        <Button basic color='teal'>Register</Button>
                    </Grid.Column>
                    <Grid.Column className='link'>
                        <Link to='/login'>Already register? Come Login!</Link>
                    </Grid.Column>

                </Grid>

            </Form>
            {
                Object.keys(errors).length > 0 && (
                    <div className='ui negative message'>
                        <ul className='list'>
                            {Object.values(errors).map(errorValue => (
                                <li key={errorValue}>{errorValue}</li>
                            ))
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )

}
