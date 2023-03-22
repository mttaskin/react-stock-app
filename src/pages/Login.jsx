import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import  TextField  from "@mui/material/TextField";
import { object, string } from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import useAuthCall from "../hooks/useAuthCall";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state?.auth);
  const { login } = useAuthCall();
const LoginScheme = object({  
  email: string().email("email must be a valid").required("email is mandatory"),
  password: string()
  .required("password is mandatory")
  .min(8,"password must be at least 8 characters long")
  .max(20,"password must be at most 20 characters long")
  .matches(/\d+/, "password must be including a number")
  .matches(/[a-z]/, "password must be including a small letter")
  .matches(/[A-Z]/, "password must be including a upper letter")
  .matches(/[!,?{}]+/, "password must be including symbol"),
 });

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

            <Formik
            initialValues={{email:"",password:"",}}
            validationSchema={LoginScheme}
            onSubmit={(values, actions) => {
            login(values)
            actions.setSubmitting(false)
            actions.resetForm()
            }}
            >
              {({values, handleBlur, handleChange, errors, touched})=> {
                <Form>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2}}>
                  <TextField
                  label="Email"
                  name="email"
                  id="email"
                  type="email"
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}                
                  />
                  <TextField
                    label="Password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />

                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={loading}
                  >
                    Submit
                  </LoadingButton>
                  </Box>
                </Form>
              }}
            </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
