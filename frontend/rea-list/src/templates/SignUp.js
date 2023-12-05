import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ProfileIcon from './ProfileIcon';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import '../styles/SignUp.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link color="inherit" href="/">
                ReaList
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const lightTheme = createTheme();

export default function SignUp() {
    const ref = useRef();
    const { dispatch, user } = useAuthContext();

    const onSuccess = async (authResult) => {
        const response = await fetch(
            process.env.REACT_APP_BACKEND + 'api/users/signup',
            {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ username: user.username }),
                headers: {
                    Authorization: `Bearer ${authResult.auth_token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const json = await response.json();

        if (response.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json });
        }
    };

    useEffect(() => {
        const { current } = ref;
        current.onSuccess = onSuccess;
        return () => {};
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: 'solid 3px transparent',
                        borderRadius: '15px',
                        padding: '35px',
                        borderImage:
                            'linear-gradient(to bottom, #61f4de, #6e78ff)',
                        borderImageSlice: 1,
                    }}
                >
                    <ProfileIcon />
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{
                            mt: 3,
                            mb: 2,
                            fontWeight: 'bold',
                            fontSize: '2rem',
                        }}
                    >
                        Sign Up
                    </Typography>
                    <passage-register
                        ref={ref}
                        onSuccess={onSuccess}
                        app-id={process.env.REACT_APP_PASSAGE_APP_ID}
                    ></passage-register>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
