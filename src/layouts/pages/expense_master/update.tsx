import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";

import { useFormik } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import { useState, useEffect } from "react";
import { TreeSelect, message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");

const Update = (props: any) => {
  const { setOpenupdate, editData } = props;
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      old_expense_name: editData.expense_name,
      expense_name: "",
    },

    // validationSchema: validationSchema,
    onSubmit: async (values, action) => {
      const sendData = { ...values, old_expense_name: editData.expense_name };
      await axios
        .put("http://10.0.20.121:8000/expense_name", sendData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            message.success("Updated Successfully");
            action.resetForm();
          }
        })
        .catch((error) => {
          message.error(error.response.data?.detail || "error occured");
        });
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container spacing={2}>
          <Grid item sm={4.1}>
            <MDTypography variant="body2" fontWeight="bold">
              Expense Name
            </MDTypography>
          </Grid>
          <Grid item sm={4.1}>
            <MDInput
              variant="standard"
              name="expense_name"
              value={values.expense_name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.expense_name && errors.expense_name}
              mb={10}
              mt={10}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Grid item>
                <MDButton
                  color="info"
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    handleCloseupdate();
                  }}
                >
                  Save
                </MDButton>
              </Grid>
              <Grid item ml={2}>
                <MDButton
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    handleCloseupdate();
                  }}
                >
                  Cancel
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Update;
