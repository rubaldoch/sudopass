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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header } from '../components/Header/header';
import Copyright from '../components/CopyRight/copyright';
import AuthApi from '../api/auth';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

const theme = createTheme();

export default function Login() {

  const history = useNavigate()
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<any>(undefined);
  const [success, setSucess] = React.useState<any>(undefined);
  const [buttonText, setButtonText] = React.useState<any>("Iniciar Sesión");

  const handleSubmit = async (event: any) => {
    if (event) {
      event.preventDefault();
    }
    if (email === "") {
      return setError("Debe ingresar su correo electrónico.");
    }
    if (password === "") {
      return setError("Debe ingresar su contraseña.");
    }
    setButtonText("Login in");
    try {
      let response = await AuthApi.Login({
        email,
        password,
      });
      if (response.data && response.data.success === false) {
        return setError(response.data.msg);
      }
      return setProfile(response);
    } catch (err: any) {
      console.log(err);
      setButtonText("Login");
      if (err.response) {
        return setError(err.response.data.msg);
      }
      return setError("Ha ocurrido un error.");
    }
  };

  const setProfile = async (response: any) => {
    let user = { ...response.data.user };
    user.token = response.data.token;
    user = JSON.stringify(user);
    // setUser(user);
    localStorage.setItem("user", user);
    return history("/dashboard");
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => {
                setEmail(event.target.value);
                setError(undefined);
              }}
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
              onChange={(event) => {
                setPassword(event.target.value);
                setError(undefined);
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
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
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }}  />
      </Container>
    </ThemeProvider>
  );
}