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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ProfileIcon from './ProfileIcon';
import '../styles/SignUp.css';
// change to sign in.cc
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLogin } from '../hooks/useLogin';
import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import '../styles/LoginPage.css';

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

// TODO remove, this demo shouldn't need to reset the theme.

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const lightTheme = createTheme();

export default function SignIn() {
    const ref = useRef();
    const { dispatch } = useAuthContext();

    const onSuccess = async (authResult) => {
        const response = await fetch(
            process.env.REACT_APP_BACKEND + 'api/users/login',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authResult.auth_token}`,
                },
            }
        );
        const json = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({ type: 'LOGIN', payload: json });
        }
    };

    const { login, error, isLoading } = useLogin();
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        await login(data);
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
                        marginTop: 14,
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
                        Sign In
                    </Typography>
                    <passage-login
                        ref={ref}
                        onSuccess={onSuccess}
                        app-id={process.env.REACT_APP_PASSAGE_APP_ID}
                    ></passage-login>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
