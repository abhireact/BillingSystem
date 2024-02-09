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
//import {ChangeEvent} from "react";

// const validationSchema = yup.object({
//   username: yup.string().min(2).max(25).required("Please enter your name"),

//   password: yup
//     .string()
//     .min(8, "Password should be of minimum 8 characters length")
//     .required("Password is required"),
// });
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
const document_types = [
  "Aadhar Card",
  "PAN Card",
  "Driving License",
  "Government ID",
  "Voter Card",
];

const Update = (props: any) => {
  const { setOpenupdate, editData } = props;
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };

  const [formData, setFormData] = useState({
    fullname: editData.fullname,
    billing_address: editData.billing_address,
    city: editData.city,
    state: editData.state,
    pincode: editData.pincode,
    country: editData.country,
    email: editData.email,
    phone_no: editData.phone_no,
    contact_no: editData.contact_no,
    pan: editData.pan,
    gstin: editData.gstin,
    account_type: editData.account_type,
    opening_balance: editData.opening_balance,
    document_type: editData.document_type,
    document_no: editData.document_no,
    dob: editData.dob,
    anniversary: editData.anniversary,
    credit_allowed: editData.credit_allowed ? "yes" : "no",
    credit_limit: editData.credit_limit,
    remark: editData.remark,
    client_image: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImage = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        setFormData({
          ...formData,
          client_image: e.target.files[0],
        });
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("fullname", formData.fullname);
    formDataObj.append("billing_address", formData.billing_address);
    formDataObj.append("city", formData.city);
    formDataObj.append("state", formData.state);
    formDataObj.append("pincode", formData.pincode);
    formDataObj.append("country", formData.country);
    formDataObj.append("email", formData.email);
    formDataObj.append("phone_no", formData.phone_no);
    formDataObj.append("contact_no", formData.contact_no);
    formDataObj.append("pan", formData.pan);
    formDataObj.append("gstin", formData.gstin);
    formDataObj.append("account_type", formData.account_type);
    formDataObj.append("opening_balance", formData.opening_balance);
    formDataObj.append("document_type", formData.document_type);
    formDataObj.append("document_no", formData.document_no);
    formDataObj.append("dob", formData.dob);
    formDataObj.append("anniversary", formData.anniversary);
    formDataObj.append("credit_allowed", formData.credit_allowed); // to send true if it "yes" or false if it "no"
    formDataObj.append("credit_limit", formData.credit_limit);
    formDataObj.append("remark", formData.remark);
    formDataObj.append("client_image", formData.client_image);
    const sendData = { ...formDataObj, credit_allowed: formData.credit_allowed === "yes" };
    await axios
      .put("http://10.0.20.121:8000/clients", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          message.success("Created Successfully");
        }
      })
      .catch((error) => {
        message.error(error.response.data?.detail || "error occured");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Grid container>
          <Grid sm={4} container spacing={4} sx={{ display: "flex", justifyContent: "flex-start" }}>
            <MDBox p={4} px={8}>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="h5" py={2}>
                  Profile Pic
                </MDTypography>
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <div>
                  <MDInput type="file" accept="image/*" onChange={handleImage} />
                </div>
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="h5" py={2}>
                  Identity Details
                </MDTypography>
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "flex-center" }}>
                <Autocomplete
                  sx={{ width: "100%" }}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "document_type", value },
                    });
                  }}
                  options={document_types}
                  renderInput={(params: any) => (
                    <FormField
                      label="Document Type"
                      InputLabelProps={{ shrink: true }}
                      name="document_type"
                      onChange={handleChange}
                      value={formData.document_type}
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDInput
                  variant="standard"
                  name="document_no"
                  label="Document No"
                  value={formData.document_no}
                  onChange={handleChange}
                  mb={10}
                />
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="h5" py={2}>
                  Anniversary
                </MDTypography>
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="body2">Date of Birth : </MDTypography>
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDInput
                  sx={{ width: "100%" }}
                  variant="standard"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  mb={10}
                />
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="body2">Anniversary : </MDTypography>
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDInput
                  sx={{ width: "100%" }}
                  variant="standard"
                  type="date"
                  name="anniversary"
                  value={formData.anniversary}
                  onChange={handleChange}
                  mb={10}
                />
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="h5" py={1}>
                  Tax Details
                </MDTypography>
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDInput
                  variant="standard"
                  name="pan"
                  label="PAN No."
                  value={formData.pan}
                  onChange={handleChange}
                />
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDInput
                  variant="standard"
                  name="gstin"
                  label="GSTIN"
                  value={formData.gstin}
                  onChange={handleChange}
                  mb={10}
                />
              </Grid>
            </MDBox>
          </Grid>
          <Grid sm={4} container spacing={4} sx={{ display: "flex", justifyContent: "flex-start" }}>
            <MDBox p={4} px={8}>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="h5" pt={2}>
                  Client Details
                </MDTypography>
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  required
                  autoComplete="off"
                  variant="standard"
                  name="fullname"
                  label="Full Name"
                  value={formData.fullname}
                  onChange={handleChange}
                  mb={10}
                />
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  col={3}
                  multiline
                  rows={3}
                  variant="standard"
                  name="billing_address"
                  label="Billing Address"
                  value={formData.billing_address}
                  onChange={handleChange}
                  mb={10}
                />
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  required
                  autoComplete="off"
                  variant="standard"
                  name="city"
                  label="City"
                  value={formData.city}
                  onChange={handleChange}
                  mb={10}
                  mt={10}
                />
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "center" }}>
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
                      label="States"
                      InputLabelProps={{ shrink: true }}
                      name="state"
                      onChange={handleChange}
                      value={formData.state}
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  required
                  variant="standard"
                  name="pincode"
                  label="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  mb={10}
                />
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  name="country"
                  label="Country"
                  value={formData.country}
                  onChange={handleChange}
                  mb={10}
                />
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  name="email"
                  label="Email ID"
                  value={formData.email}
                  // onChange={handleChange}
                  mb={10}
                />
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  name="phone_no"
                  label="Phone No."
                  value={formData.phone_no}
                  onChange={handleChange}
                  mb={10}
                />
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  required
                  variant="standard"
                  name="contact_no"
                  label="Contact No"
                  value={formData.contact_no}
                  //   onChange={handleChange}
                  mb={10}
                />
              </Grid>
            </MDBox>
          </Grid>

          <Grid sm={4} container spacing={4} sx={{ display: "flex", justifyContent: "center" }}>
            <MDBox p={4} px={8}>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="h5" py={2}>
                  Account Details
                </MDTypography>
              </Grid>

              <Grid sm={12}>
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
                          checked={formData.account_type.includes("Debit")}
                          onChange={handleChange}
                          name="account_type"
                          value="Debit"
                        />
                      }
                      label={<MDTypography variant="body2">Debit</MDTypography>}
                    />
                    <FormControlLabel
                      // value="male"
                      control={
                        <Radio
                          checked={formData.account_type.includes("Credit")}
                          onChange={handleChange}
                          name="account_type"
                          value="Credit"
                        />
                      }
                      label={<MDTypography variant="body2"> Credit</MDTypography>}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  autoComplete="off"
                  variant="standard"
                  name="opening_balance"
                  label="Opening Balance"
                  value={formData.opening_balance}
                  onChange={handleChange}
                  mb={10}
                  mt={10}
                />
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="h5" py={2}>
                  Other Details
                </MDTypography>
              </Grid>
              <Grid sm={12}>
                <MDTypography variant="body2">Credit Allowed : </MDTypography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    row
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={formData.credit_allowed.includes("yes")}
                          onChange={handleChange}
                          name="credit_allowed"
                          value="yes"
                        />
                      }
                      label={<MDTypography variant="body2">Yes</MDTypography>}
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          checked={formData.credit_allowed.includes("no")}
                          onChange={handleChange}
                          name="credit_allowed"
                          value="no"
                        />
                      }
                      label={<MDTypography variant="body2"> No</MDTypography>}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  name="credit_limit"
                  label="Credit Limit"
                  value={formData.credit_limit}
                  onChange={handleChange}
                  mb={10}
                />
              </Grid>
              <Grid sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  name="remark"
                  label="Remark / Note"
                  value={formData.remark}
                  onChange={handleChange}
                  mb={10}
                />
              </Grid>
              <Grid sm={12} py={4} sx={{ display: "flex", justifyContent: "center" }}>
                <MDButton color="info" type="submit">
                  Submit
                </MDButton>
                <MDButton
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    handleCloseupdate();
                  }}
                  px={2}
                >
                  Cancel
                </MDButton>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};

export default Update;
