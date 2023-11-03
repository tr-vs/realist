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
import '../styles/SignUp.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { useSpring, animated } from 'react-spring';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        ReaList
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


export default function SignUp() {
  const [showPassReq, setShowPassReq] = useState(false);
  const navigate = useNavigate();

  // const passwordReqAnimation = useSpring({
  //   opacity: showPassReq ? 1 : 0,
  //   transform: showPassReq ? 'translateY(0)' : 'translateY(-20px)',
  // });
  
  
  
  // Add new user to database
  const createUser = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const jsonPayload = JSON.stringify({
      email: data.get('email'),
      password: data.get('password'),
      school: data.get('school'),
      username: data.get('username')
    });
    

    // post to db
    const response = await fetch('http://localhost:3000/api/users/signup', {
      method:'POST', 
      credentials: 'include',
      body: jsonPayload,
      headers: {
        'Content-Type': 'application/json',
      },
    }) 

    const json = await response.json();

    if (!response.ok) {
      console.error('Error:', json.error);
    } else {
      navigate('/'); // redirect to home after creating profile 
    }

  };

  return (
    <ThemeProvider theme={defaultTheme} >

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: 'solid 1px',
            borderRadius: '15px',
            padding: '25px'
          }}
        >
          
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={createUser} noValidate sx={{ mt: 1 }}>
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
              type="password"
              id="password"
              autoComplete="current-password"
              onFocus={() => setShowPassReq(true)}
              onBlur={() => setShowPassReq(false)}
            />
            {showPassReq && (
              
              <ul className='password-requirement'>
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
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Sign In"}
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