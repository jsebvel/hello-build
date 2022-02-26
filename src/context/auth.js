import React, { createContext, useReducer } from 'react';
import jwtDecode from "jwt-decode";

const initialState = {
    user: null
}

export const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { }
});

if (localStorage.getItem('jwtToken')) {
    const userToken = localStorage.getItem('jwtToken');
    const decodeToken = jwtDecode(userToken);
    if (decodeToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken')
    } else {
        initialState.user = decodeToken;
    }
}


const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state, user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}

export const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData) => {
        localStorage.setItem('jwtToken', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }

    const logout = () => {
        localStorage.removeItem('jwtToken')
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <AuthContext.Provider
            value={{ user: state, login, logout }}
            {...props}
        ></AuthContext.Provider>

    

    )
}

// export { AuthContext, AuthProvider }