import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import LoadingButton from "@mui/lab/LoadingButton"

import { Form } from "formik"
import { useSelector } from "react-redux"
import { object, string } from "yup"

export const loginScheme = object({
  email: string()
  .email("email must be a valid")
  .required("email is mandatory"),
  password: string()
  .required("password is mandatory")
  .min(8,"password must be at least 8 characters long")
  .max(20,"password must be at most 20 characters long")
  .matches(/\d+/, "password must be including a number")
  .matches(/[a-z]/, "password must be including a small letter")
  .matches(/[A-Z]/, "password must be including a upper letter")
  .matches(/[!,?{}><%&$#£+-.]+/, "password must be including symbol"),
})

const LoginForm = ({ values, handleChange, errors, touched, handleBlur }) => {
  const { loading } = useSelector((state) => state.auth)
  return (
    <Form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email"
          name="email"
          id="email"
          type="email"
          variant="outlined"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.email && errors.email}
          error={touched.email && Boolean(errors.email)}
        />
        <TextField
          label="password"
          name="password"
          id="password"
          type="password"
          variant="outlined"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.password && errors.password}
          error={touched.password && Boolean(errors.password)}
        />
        <LoadingButton
          loading={loading}
          loadingPosition="center"
          variant="contained"
          type="submit"
        >
          Submit
        </LoadingButton>
      </Box>
    </Form>
  )
}

export default LoginForm
