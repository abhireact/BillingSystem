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

import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel, FormLabel, RadioGroup } from "@mui/material";
import { useState, useEffect } from "react";
import message from "antd";
const token = Cookies.get("token");

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",

  "Delhi (National Capital Territory of Delhi)",
  "Puducherry",
  "Ladakh",
  "Lakshadweep",
];
const bank_names = ["SBI Bank", "Punjab National Bank", "ICICI Bank", "Kotak Bank", "Canara Bank"];
let initialValues = {
  company_name: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  email: "",
  phone_no: "",
  contact_no: "",
  pan_no: "",
  gst_in: "",
  ac_type: "",
  opening_balance: "",
  bank_name: "",
  ac_no: "",
  ifsc_code: "",

  contact_person: "",
  remarks: "",
};

const Create = (props: any) => {
  const { setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      // validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log({ ...values }, "submit values");
        try {
          let sendData = values;

          const response = await axios.post("http://10.0.20.121:8000/suppliers", sendData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            console.log("Created Successfully");
          }
        } catch (error) {
          console.error(error);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Grid container>
          <Grid item sm={6} container sx={{ display: "flex", justifyContent: "center" }}>
            <MDBox p={4} px={8}>
              <Grid item sm={12}>
                <MDTypography variant="h5">Supplier Details</MDTypography>
              </Grid>
              <Grid item sm={12}>
                <MDInput
                  required
                  autoComplete="off"
                  variant="standard"
                  name="company_name"
                  label="Company Name"
                  value={values.company_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.company_name && Boolean(errors.company_name)}
                  helperText={touched.company_name && errors.company_name}
                />
              </Grid>
              <Grid item sm={12}>
                <MDInput
                  col={3}
                  multiline
                  rows={3}
                  variant="standard"
                  name="address"
                  label="Address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Grid>
              <Grid item sm={12}>
                <MDInput
                  required
                  autoComplete="off"
                  variant="standard"
                  name="city"
                  label="City"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                  mt={10}
                />
              </Grid>
              <Grid item sm={12}>
                <Autocomplete
                  sx={{ width: "100%" }}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "state", value },
                    });
                  }}
                  options={states}
                  renderInput={(params: any) => (
                    <FormField
                      required
                      label="States"
                      InputLabelProps={{ shrink: true }}
                      name="state"
                      onChange={handleChange}
                      value={values.state}
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item sm={12}>
                <MDInput
                  required
                  autoComplete="off"
                  variant="standard"
                  name="pincode"
                  label="Pincode"
                  value={values.pincode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.pincode && Boolean(errors.pincode)}
                  helperText={touched.pincode && errors.pincode}
                  mt={10}
                />
              </Grid>
              <Grid item sm={12}>
                <MDInput
                  variant="standard"
                  name="country"
                  label="Country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.country && Boolean(errors.country)}
                  helperText={touched.country && errors.country}
                />
              </Grid>
              <Grid item sm={12}>
                <MDInput
                  variant="standard"
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item sm={12}>
                <MDInput
                  required
                  variant="standard"
                  name="phone_no"
                  label="Phone No."
                  value={values.phone_no}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone_no && Boolean(errors.phone_no)}
                  helperText={touched.phone_no && errors.phone_no}
                />
              </Grid>

              <Grid sm={12} item>
                <MDTypography variant="h5">Tax Details</MDTypography>
              </Grid>
              <Grid sm={12} item>
                <MDInput
                  variant="standard"
                  name="pan_no"
                  label="PAN No."
                  value={values.pan_no}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.pan_no && Boolean(errors.pan_no)}
                  helperText={touched.pan_no && errors.pan_no}
                />
              </Grid>
              <Grid sm={12} item>
                <MDInput
                  variant="standard"
                  name="gst_in"
                  label="GSTIN"
                  value={values.gst_in}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.gst_in && Boolean(errors.gst_in)}
                  helperText={touched.gst_in && errors.gst_in}
                />
              </Grid>
            </MDBox>
          </Grid>
          <Grid item sm={6} container sx={{ display: "flex", justifyContent: "flex-start" }}>
            <MDBox p={4} px={8}>
              <Grid sm={12} item>
                <MDTypography variant="h5">Bank Details</MDTypography>
              </Grid>
              <Grid sm={12} item>
                <Autocomplete
                  sx={{ width: "100%" }}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "bank_name", value },
                    });
                  }}
                  options={bank_names}
                  renderInput={(params: any) => (
                    <FormField
                      label="Bank Name"
                      InputLabelProps={{ shrink: true }}
                      name="bank_name"
                      onChange={handleChange}
                      value={values.bank_name}
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid sm={12} item>
                <MDInput
                  variant="standard"
                  name="ac_no"
                  label="Bank A/c No"
                  value={values.ac_no}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.ac_no && Boolean(errors.ac_no)}
                  helperText={touched.ac_no && errors.ac_no}
                />
              </Grid>
              <Grid sm={12} item>
                <MDInput
                  variant="standard"
                  name="ifsc_code"
                  label="IFSC Code"
                  value={values.ifsc_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.ifsc_code && Boolean(errors.ifsc_code)}
                  helperText={touched.ifsc_code && errors.ifsc_code}
                />
              </Grid>
              <Grid sm={12} item>
                <MDTypography variant="h5">Account Details</MDTypography>
              </Grid>

              <Grid sm={12} item>
                <MDTypography variant="body2">Account Type : </MDTypography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    row
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={values.ac_type.includes("Debit")}
                          onChange={handleChange}
                          name="ac_type"
                          value="Debit"
                        />
                      }
                      label={<MDTypography variant="body2">Debit</MDTypography>}
                    />
                    <FormControlLabel
                      // value="male"
                      control={
                        <Radio
                          checked={values.ac_type.includes("Credit")}
                          onChange={handleChange}
                          name="ac_type"
                          value="Credit"
                        />
                      }
                      label={<MDTypography variant="body2"> Credit</MDTypography>}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid sm={12} item>
                <MDInput
                  type="number"
                  autoComplete="off"
                  variant="standard"
                  name="opening_balance"
                  label="Opening Balance"
                  value={values.opening_balance}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.opening_balance && Boolean(errors.opening_balance)}
                  helperText={touched.opening_balance && errors.opening_balance}
                />
              </Grid>
              <Grid sm={12} item>
                <MDTypography variant="h5">Contact Details</MDTypography>
              </Grid>

              <Grid sm={12} item>
                <MDInput
                  variant="standard"
                  name="contact_person"
                  label="Contact Person"
                  value={values.contact_person}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contact_person && Boolean(errors.contact_person)}
                  helperText={touched.contact_person && errors.contact_person}
                />
              </Grid>
              <Grid sm={12} item>
                <MDInput
                  required
                  variant="standard"
                  name="contact_no"
                  label="Contact No"
                  value={values.contact_no}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contact_no && Boolean(errors.contact_no)}
                  helperText={touched.contact_no && errors.contact_no}
                />
              </Grid>
              <Grid sm={12} item>
                <MDTypography variant="h5">Other Details</MDTypography>
              </Grid>

              <Grid sm={12} item mb={2}>
                <MDInput
                  variant="standard"
                  name="remarks"
                  label="Remark / Note"
                  value={values.remarks}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.remarks && Boolean(errors.remarks)}
                  helperText={touched.remarks && errors.remarks}
                />
              </Grid>
              <MDButton type="submit" color="info" pt={2}>
                Submit
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};

export default Create;
