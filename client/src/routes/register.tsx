import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header } from '../components/Header/header';
import Copyright from '../components/CopyRight/copyright';
import AuthApi from '../api/auth';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

const theme = createTheme();

export default function Register() {

  const history = useNavigate()
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [buttonText, setButtonText] = React.useState("Sign Up");
  const [error, setError] = React.useState<string>();
  const [success, setSuccess] = React.useState<string>();

const register = async (event: any) => {
    if (event) {
        event.preventDefault();
    }

    if (userName === "") {
        return setError("You must enter a username.");
    }
    if (email === "") {
        return setError("You must enter a email.");
    }
    if (password === "") {
        return setError("You must enter a password.");
    }
    if (password !== password2) {
      return setError("The passwords doesn't match.");
  }

    try {
        setButtonText("Signin Up");
        let response = await AuthApi.Register({
          alias: userName,
          email,
          password,
        });
        if (response.data && response.data.success === false) {
          setButtonText("Sign Up");
          return setError(response.data.msg);
        }
        setSuccess(response.data.msg)
        return history("/auth/login");
      } catch (err: any) {
        setButtonText("Sign Up");
        if (err.response) {
          return setError(err.response.data.msg);
        }
        return setError("Ha ocurrido un error.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <Box component="form" noValidate onSubmit={register} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="user-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  onChange={(event) => {
                    setUserName(event.target.value);
                    setError(undefined);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError(undefined);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError(undefined);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Repeat Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password2"
                  onChange={(event) => {
                    setPassword2(event.target.value);
                    setError(undefined);
                  }}
                />
              </Grid>
            </Grid>
            { error && (<Alert severity="error">{error}</Alert> )}
            {success && (<Alert severity="success">{success}</Alert>)}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {buttonText}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}