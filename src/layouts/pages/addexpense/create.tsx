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
  date: "",
  expense_type: "",
  amount: "",
  paid_to: "",
  pay_mode: "",
  payment_ref_no: "",
  paid_by: "",
  remarks: "",
};

const Create = (props: any) => {
  const { setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    // validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      let sendData = values;

      await axios
        .put("http://10.0.20.121:8000/products", sendData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Created Successfully");
            handleClose();
            message.success("Created SuccessFully");
          }
        })
        .catch((error) => {
          console.error(error);
          message.error("Error Occured");
        });
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Grid container>
          <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
            <MDTypography variant="body2" fontWeight="bold" py={2}>
              Expense Details
            </MDTypography>
          </Grid>
          <Grid sm={6} container sx={{ display: "flex", justifyContent: "center" }}>
            <MDBox>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  type="date"
                  name="Date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                  mb={10}
                />
              </Grid>

              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  required
                  name="expense_type"
                  label="Expense Type"
                  value={values.expense_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.expense_type && Boolean(errors.expense_type)}
                  helperText={touched.expense_type && errors.expense_type}
                  mb={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  required
                  name="amount"
                  label="Item Code"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.amount && Boolean(errors.amount)}
                  helperText={touched.amount && errors.amount}
                  mb={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  required
                  name="paid_to"
                  label="Paid To"
                  value={values.paid_to}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.paid_to && Boolean(errors.paid_to)}
                  helperText={touched.paid_to && errors.paid_to}
                  mb={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Autocomplete
                  sx={{ width: "100%" }}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "state", value },
                    });
                  }}
                  options={paymode}
                  renderInput={(params: any) => (
                    <FormField
                      label="Pay Mode"
                      InputLabelProps={{ shrink: true }}
                      name="pay_mode"
                      onChange={handleChange}
                      value={values.pay_mode}
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </MDBox>
          </Grid>

          <Grid sm={6} container sx={{ display: "flex", justifyContent: "center" }}>
            <MDBox>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDInput
                  variant="standard"
                  name="payment_ref_no"
                  type="number"
                  label="Payment Ref. No."
                  value={values.payment_ref_no}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.payment_ref_no && Boolean(errors.payment_ref_no)}
                  helperText={touched.payment_ref_no && errors.payment_ref_no}
                  mb={10}
                  mt={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDInput
                  required
                  variant="standard"
                  name="paid_by"
                  label="Paid By"
                  value={values.paid_by}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.paid_by && Boolean(errors.paid_by)}
                  helperText={touched.paid_by && errors.paid_by}
                  mb={10}
                  mt={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDInput
                  multiline
                  rows={3}
                  variant="standard"
                  name="remarks"
                  label="Remarks"
                  value={values.remarks}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.remarks && Boolean(errors.remarks)}
                  helperText={touched.remarks && errors.remarks}
                  mb={10}
                  mt={10}
                />
              </Grid>
              <Grid item sm={6} py={6} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDButton color="info" type="submit">
                  Submit -&gt;
                </MDButton>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};

export default Create;
