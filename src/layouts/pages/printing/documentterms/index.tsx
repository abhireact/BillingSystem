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
import Stack from "@mui/material/Stack";
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

const documents = [
  "Invoice",
  "Qoutation",
  "Proforma Invoice",
  "Delivery Note",
  "Purchase Order",
  "Sale Return",
];
let initialValues = {
  documenttype: "",
  termandconditions: "",
  footernote: "",
};

const Terms = () => {
  const [formdata, setFormdata] = useState("create");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response.data);
          initialValues = response.data[0];
          setFormdata("edit");
        }
      } catch (error) {
        // console.error(error);
        console.log("Data not found");
      }
    };
    fetchData();
  });
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      // validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        if (formdata === "create") {
          handleFormSubmit();
        } else {
          handleFormEditSubmit();
        }
      },
    });
  const handleFormSubmit = async () => {
    console.log({ ...values }, "submit values");
    try {
      let sendData = values;

      const response = await axios.post("", sendData, {
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
  };
  const handleFormEditSubmit = async () => {
    try {
      let sendData = values;

      const response = await axios.put(``, sendData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("Edited Successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container spacing={4} sx={{ display: "flex" }}>
              <Grid item sm={12}>
                <MDTypography variant="h5" pt={2}>
                  Term Templates
                </MDTypography>
              </Grid>
              <Grid item sm={12}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "documenttype", value },
                    });
                  }}
                  options={documents}
                  renderInput={(params: any) => (
                    <FormField
                      label="Select Document Type "
                      InputLabelProps={{ shrink: true }}
                      name="documenttype"
                      onChange={handleChange}
                      value={values.documenttype}
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item sm={12}>
                <MDInput
                  sx={{ width: "70%" }}
                  autoComplete="off"
                  variant="standard"
                  name="termandconditions"
                  label="Term and Conditions"
                  value={values.termandconditions}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.termandconditions && Boolean(errors.termandconditions)}
                  helperText={touched.termandconditions && errors.termandconditions}
                  mb={10}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item sm={12}>
                <MDInput
                  sx={{ width: "70%" }}
                  autoComplete="off"
                  variant="standard"
                  name="footernote"
                  label="Footer Note"
                  value={values.footernote}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.footernote && Boolean(errors.footernote)}
                  helperText={touched.footernote && errors.footernote}
                  mb={10}
                />
              </Grid>
              <Grid item sm={12} py={2}>
                <MDButton color="info" type="submit" my={2}>
                  Submit -&gt;
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
};

export default Terms;
