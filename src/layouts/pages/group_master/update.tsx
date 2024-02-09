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
function transformString(inputString: string): string {
  // Split the input string into an array of substrings
  const substrings = inputString.split("/");

  // Reverse the array of substrings
  const reversedArray = substrings.reverse();

  // Join the reversed array into a string using '-' as the separator
  const resultString = reversedArray.join("-");

  return resultString;
}
const Update = (props: any) => {
  const { setOpenupdate, editData } = props;
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      group_name: editData.group_name,
      cgst: editData.cgst,
      cess: editData.cess,
      sgst: editData.sgst,
      igst: editData.igst,
      hsn_or_sac: editData.hsn_or_sac,
    },

    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      const sendData = { ...values, old_group_name: editData.group_name };
      axios
        .put("http://10.0.20.121:8000/add_group", sendData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            message.success("Updated Successfully");
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
              Group Name
            </MDTypography>
          </Grid>
          <Grid item sm={4.1}>
            <MDInput
              variant="standard"
              name="group_name"
              value={values.group_name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.group_name && errors.group_name}
              mb={10}
              mt={10}
            />
          </Grid>

          <Grid item sm={4.1}>
            <MDTypography variant="body2" fontWeight="bold">
              HSN/SAC Code
            </MDTypography>
          </Grid>
          <Grid item sm={4.1}>
            <MDInput
              variant="standard"
              name="hsn_or_sac"
              value={values.hsn_or_sac}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.hsn_or_sac && Boolean(errors.hsn_or_sac)}
              helperText={touched.hsn_or_sac && errors.hsn_or_sac}
              mb={10}
              mt={10}
            />
          </Grid>
          <Grid item sm={4.1}>
            <MDTypography variant="body2" fontWeight="bold">
              GST Rates:
            </MDTypography>
          </Grid>
          <Grid item sm={4.1}>
            <MDInput
              variant="standard"
              name="cgst"
              label="CGST in %"
              type="number"
              value={values.cgst}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.cgst && Boolean(errors.cgst)}
              helperText={touched.cgst && errors.cgst}
              mb={10}
              mt={10}
            />
            <MDInput
              variant="standard"
              name="cess"
              label="CESS in %"
              type="number"
              value={values.cess}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.cess && Boolean(errors.cess)}
              helperText={touched.cess && errors.cess}
              mb={10}
              mt={10}
            />
            <MDInput
              variant="standard"
              name="sgst"
              label="SGST in %"
              type="number"
              value={values.sgst}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.sgst && Boolean(errors.sgst)}
              helperText={touched.sgst && errors.sgst}
              mb={10}
              mt={10}
            />
            <MDInput
              variant="standard"
              name="igst"
              label="IGST in %"
              type="number"
              value={values.igst}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.igst && Boolean(errors.igst)}
              helperText={touched.igst && errors.igst}
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
