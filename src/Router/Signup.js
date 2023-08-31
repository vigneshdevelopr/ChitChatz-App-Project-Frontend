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
import Logo from '../assets/signuplogo.png'
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { signupRoute } from "../utils/Routes";
import { useEffect } from "react";
import Loading from "../Components/Spinner";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://vigneshganesan.netlify.app/" target="_blank">
        ChitChatz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function Signup() {
  const[load,setLoad]=useState(false)
  const history = useHistory();

  const[value, setValue]= useState({
     firstName:'',
     lastName:'',
     email:'',
     password:'',
     confirmpassword:''
  })
  useEffect(() => {
    if (localStorage.getItem("ChitChatz-user")) {
      history.push("/messages");
    }
  }, []);

  const handleChange = (event) => {
    setValue({...value, [event.target.name]:event.target.value})
      }

//validation:

const handleValidate = () => {
  const { firstName, email, password, confirmpassword } = value;
  if (password !== confirmpassword) {
    toast.error("Password does not match", toastify);
    return false;
  } else if (password.length<5) {
    toast.error("Password should be min 5 characters", toastify);
    return false;

  }else if (email.length<5) {
    toast.error("Email should be min 5 characters", toastify);
    return false;
  }else if(firstName.length<2){
    toast.error("First name should be at least 2 characters", toastify);
  return false;
  }

  return true; 
};
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      
    
   if(handleValidate()){
    const { firstName, lastName, email, password, confirmpassword } = value;
    setLoad(true)
    const {data} = await axios.post(signupRoute,{
      firstName,
      lastName,
      email,
      password,
    
    }) 
    if(data.status === false){
      toast.error(data.message,toastify)
    }
    if(data.status === true){
      localStorage.setItem("ChitChatz-user", JSON.stringify(data.user) )
      history.push('/');
      toast.success("Account Created Successfully",toastify)

    }

   }
  } catch (error) {
      console.log(error)
  } finally{
    setLoad(false)
  }
  };
 
  // useEffect(()=>{
  //   if(localStorage.getItem('ChitChatz-user')){
  //     history.push("/messages");

  //   }
  // },[])

  const toastify = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }
  
  
  return (
    <div>
{load?(<Loading />):(


    <div style={{backgroundColor:'white', height:'100vh'}} >
    <ThemeProvider theme={theme}>
      <Container style={{backgroundColor:'whitesmoke' ,borderRadius:8}}   component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{m:1, bgcolor: "whitesmoke" }}>
            <img src={Logo} alt="signupLogo" />
          </Avatar>
          <Typography component="h1" variant="h4">
            ChitChatz
          </Typography>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  onChange={e=>handleChange(e)}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={e=>handleChange(e)}

                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={e=>handleChange(e)}

                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={e=>handleChange(e)}

                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  onChange={e=>handleChange(e)}

                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link className="createloginbtn" onClick={()=>history.push('/')} variant="body2">
                  Already have an account? Sign in
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
   )}
   </div>

  );
}

export default Signup;
