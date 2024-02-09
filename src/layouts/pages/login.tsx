import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Cookies from "js-cookie";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
const validationSchema = yup.object({
  username: yup.string().min(2).max(25).required("Please enter your name"),

  password: yup
    .string()
    .min(4, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Logintest = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post(
          "http://10.0.20.121:8000/login",
          {
            username: values.username,
            password: values.password,
          },

          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data.access_token);
          const token = response.data.access_token;
          Cookies.set("token", token, { expires: 7 });
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(values);

      action.resetForm();
    },
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "50%" }}>
        <form onSubmit={formik.handleSubmit}>
          <MDBox p={4}>
            <div>
              <MDInput
                sx={{ width: "50%" }}
                variant="standard"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                mb={10}
                mt={10}
              />
            </div>
            <div>
              <MDInput
                sx={{ width: "50%" }}
                // id="confirmpassword"
                variant="standard"
                name="password"
                label=" Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                mb={10}
              />
            </div>
            <Grid m={4} sx={{ fontColor: "blue" }}>
              <MDButton color="primary" variant="contained" type="submit">
                Submit
              </MDButton>
            </Grid>
          </MDBox>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default Logintest;
