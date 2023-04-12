import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../assets/signuplogo.png";
import "./signup.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/Routes";
import { useEffect } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://vigneshganesan.netlify.app/"
        target="_blank"
      >
        ChitChatz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function Login() {
  const [value, setValue] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("react_token")) {
      history.push("/messages");
    }
  }, []);

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidate()) {
      const { email, password } = value;
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.message, toastify);
      }
      if (data.status === true) {
        console.log(data)
        toast.success("Login Successfully", toastify);
        localStorage.setItem("ChitChatz-user",JSON.stringify(data.users));
        console.log(data.token)
        localStorage.setItem("react_token", data.token)
localStorage.setItem('ChitChatz-email', data.users.email)
        history.push("/messages");
      }
    }
  };

  
  const toastify = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  //validation:

  const handleValidate = () => {
    const { email, password } = value;
    if (email.length === "") {
      toast.error("Email and Password Required", toastify);
      return false;
    } else if (password.length === "") {
      toast.error("Email and Password Required", toastify);
      return false;
    }
    return true;
  };

  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      <ThemeProvider theme={theme}>
        <Container
          style={{ backgroundColor: "whitesmoke", borderRadius: 8 }}
          component="main"
          maxWidth="xs"
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "whitesmoke" }}>
              <img src={Logo} alt="signupLogo" />
            </Avatar>
            <Typography component="h1" variant="h4">
              ChitChatz
            </Typography>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    autoComplete="email"
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
                    onChange={(e) => handleChange(e)}
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "orange" }}
              >
                Login
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link onClick={() => history.push("/signup")} variant="body2">
                    Don't have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}

export default Login;
