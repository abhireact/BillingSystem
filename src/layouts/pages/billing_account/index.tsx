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
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import Autocomplete from "@mui/material/Autocomplete";
import MDTypography from "components/MDTypography";
import MDDropzone from "components/MDDropzone";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel, FormLabel, RadioGroup } from "@mui/material";
import { useState, useEffect } from "react";
import MDAvatar from "components/MDAvatar";
const token = Cookies.get("token");
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { message } from "antd";
import Checkbox from "@mui/material/Checkbox";

const paymode = ["Cash", "UPI", "Bank Transfer"];
let initialValues = {
  to_date: "",
  from_date: "",
};

const Create = () => {
  // Conditionally set the validation schema

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,

    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const handleCreateSubmit = async () => {
        let sendData = values;

        await axios
          .post("http://10.0.20.121:8000/accounts/cashbook", sendData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              console.log("Created Successfully");

              message.success("Created SuccessFully");
            }
          })
          .catch((error) => {
            console.error(error);
            message.error("Error Occured");
          });
      };

      handleCreateSubmit();
      action.resetForm();
    },
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                <MDTypography variant="body1" fontWeight="bold">
                  Cashbook
                </MDTypography>
                <MDButton color="info" variant="contained" type="submit">
                  Submit
                </MDButton>
              </Grid>

              <Grid item sm={3}>
                <MDTypography variant="body2">From Date .: </MDTypography>
              </Grid>
              <Grid item sm={3}>
                <MDInput
                  variant="standard"
                  type="date"
                  name="from_date"
                  value={values.from_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.from_date && Boolean(errors.from_date)}
                  helperText={touched.from_date && errors.from_date}
                />
              </Grid>

              <Grid item sm={3}>
                <MDTypography variant="body2">To Date .: </MDTypography>
              </Grid>
              <Grid item sm={3}>
                <MDInput
                  variant="standard"
                  type="date"
                  name="to_date"
                  value={values.to_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.to_date && Boolean(errors.to_date)}
                  helperText={touched.to_date && errors.to_date}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
};

export default Create;
