import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createTheme, ThemeProvider, Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Paper, TextField, Typography, Link } from "@mui/material";
import { Grid } from "@mui/material";
import { userExists } from "../redux/reducer/auth";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


// useInputValidation hook
const useInputValidation = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    console.log("Input value: ", e.target.value); // Log the input value
    setValue(e.target.value);
    if (validator) {
      const validationError = validator(e.target.value);
      setError(validationError);
    }
  };



  return {
    value,
    error,
    changeHandler,
  };
};

// Main Login Component
function Login() {
  const defaultTheme = createTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleLogin = () => setIsLogin((prev) => !prev);

  // Hook instances
  const name = useInputValidation("");
  const username = useInputValidation("");
  const password = useInputValidation("");

  const dispatch = useDispatch();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Username before login:", username.value); // Debugging log

    const toastId = toast.loading("Logging In...");
    setIsLoading(true);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/login`, // API URL
        {
          username: username.value,
          password: password.value,
        },
        config
      );

      console.log(data)
      if (data.success) {
        navigate("/");  // Navigate to the homepage upon success
      } else {
        console.log("Login failed");
      }
      
      // if(data.success == true){
      //   Navigate("/");
      // }
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Sign Up
  // Handle Sign Up
const handleSignUp = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  const toastId = toast.loading("Signing Up...");
  setIsLoading(true);

  // Use an object to send the data as JSON
  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json", // Use JSON format
    },
  };

  try {
    const { data } = await axios.post(
      `http://localhost:5000/api/signup`, // API URL
      {
        name: name.value,
        username: username.value,
        password: password.value,
      },
      config
    );

    console.log(data); // Log response data

    // Check for success and handle the response
    if (data.success) {
      toast.success(data.message, {
        id: toastId,
      });

      if (data.success) {
        navigate("/");  // Navigate to the homepage upon success
      } else {
        console.log("Login failed");
      }
     
    } else {
      toast.error(data.message || "Signup failed", {
        id: toastId,
      });
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something Went Wrong", {
      id: toastId,
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div>
      {isLogin ? (
        <ThemeProvider theme={defaultTheme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                  "url(https://www.hostpapa.com/blog/app/uploads/2023/05/Best-Chat-Apps-on-The-Internet-Header.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}
                  onSubmit={handleLogin}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoFocus
                    autoComplete="current-username"
                    value={username.value}
                    onChange={username.changeHandler}
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
                    value={password.value}
                    onChange={password.changeHandler}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isLoading}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link
                        disabled={isLoading}
                        fullWidth
                        variant="text"
                        onClick={toggleLogin}
                        style={{ cursor: "pointer" }}
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 3.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h7">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                onSubmit={handleSignUp}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      value={name.value}
                      onChange={name.changeHandler}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="username"
                      required
                      fullWidth
                      id="username"
                      label="User Name"
                      autoFocus
                      value={username.value}
                      onChange={username.changeHandler}
                    />
                    {username.error && (
                      <Typography color="error" variant="caption">
                        {username.error}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      type="password"
                      label="Password"
                      id="password"
                      autoComplete="new-password"
                      value={password.value}
                      onChange={password.changeHandler}
                    />
                    {password.error && (
                      <Typography color="error" variant="caption">
                        {password.error}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      marginBottom={2}
                      disabled={isLoading}
                      fullWidth
                      variant="text"
                      onClick={toggleLogin}
                      style={{ cursor: "pointer" }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
}

export default Login;
