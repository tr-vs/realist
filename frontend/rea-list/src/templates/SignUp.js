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
import '../styles/SignUp.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

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
    const [showPassReq, setShowPassReq] = useState(false);
    const { signup, error, isLoading } = useSignup();
    const [showPassword, setShowPassword] = useState(false);

    // Add new user to database
    const createUser = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        await signup(data);
    };

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
                    <Box
                        component="form"
                        onSubmit={createUser}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="username"
                            label="Username"
                            type="username"
                            id="username"
                            autoComplete="username"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="school"
                            label="School"
                            type="school"
                            id="school"
                            autoComplete="school"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}                            id="password"
                            autoComplete="current-password"
                            onFocus={() => setShowPassReq(true)}
                            onBlur={() => setShowPassReq(false)}
                        />

                        <Button
                            onClick={() => setShowPassword(!showPassword)}
                            sx={{ mt: 1 }}
                        >
                            {" "}
                            {showPassword ? "Hide Password" : "Show Password"}

                        </Button>
                        {showPassReq && (
                            <ul className="password-requirement">
                                <li>8 Characters Minimum</li>
                                <li>1 or more lowercase characters</li>
                                <li>1 or more Uppercase characters</li>
                                <li>1 or more numbers</li>
                                <li>1 or more special characters</li>
                            </ul>
                        )}

                        {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                        >
                            Sign Up
                        </Button>
                        {error && <div className="error">{error}</div>}
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/loginpage" variant="body2">
                                    {'Sign In'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
