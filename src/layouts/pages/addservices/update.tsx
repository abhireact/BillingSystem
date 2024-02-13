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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Update = (props: any) => {
  const { setOpenupdate, editData } = props;
  const [groupsoption, setGroupsoption] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("http://10.0.20.121:8000/add_group", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response.data, "my groups data");
          setGroupsoption(response.data);
        }
      } catch (error) {
        // console.error(error);
        console.log("Data not found");
      }
    };

    fetchGroups();
  }, []);

  const handleCloseupdate = () => {
    setOpenupdate(false);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      group: editData.group,
      item_code: editData.item_code,
      service_name: editData.service_name,
      print_name: editData.print_name,
      service_charge: editData.service_charge,
      min_service_charge: editData.min_service_charge,
      sale_discount: editData.sale_discount,
      hsn_sac_code: editData.hsn_sac_code,
      cgst: editData.cgst,
      sgst: editData.sgst,
      igst: editData.igst,
      cess: editData.cess,
      service_description: editData.service_description,
      print_description: editData.print_description,
    },
    // validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      let sendData = { ...values, old_service_name: editData.service_name };

      await axios
        .put("http://10.0.20.121:8000/services", sendData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Updated Successfully");
            handleCloseupdate();
            message.success("Updated SuccessFully");
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
          <Grid sm={6} container sx={{ display: "flex", justifyContent: "center" }}>
            <MDBox>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="body2" fontWeight="bold" py={2}>
                  Service Details
                </MDTypography>
              </Grid>

              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <FormControl sx={{ m: 1, minWidth: "100%" }}>
                  {/* <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel> */}
                  <Select
                    label="choose group"
                    value={values.group}
                    onChange={handleChange}
                    autoWidth={true}
                    name="group"
                    variant="standard"
                  >
                    <MenuItem value="">
                      <em>Choose Group</em>
                    </MenuItem>
                    {groupsoption.map((groups, index) => (
                      <MenuItem key={index} value={groups.group_name}>
                        {groups.group_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  name="item_code"
                  label="Item Code"
                  value={values.item_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.item_code && Boolean(errors.item_code)}
                  helperText={touched.item_code && errors.item_code}
                  mb={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  required
                  name="service_name"
                  label="Service Name"
                  value={values.service_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.service_name && Boolean(errors.service_name)}
                  helperText={touched.service_name && errors.service_name}
                  mb={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  required
                  name="print_name"
                  label="Print Name"
                  value={values.print_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.print_name && Boolean(errors.print_name)}
                  helperText={touched.print_name && errors.print_name}
                  mb={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="body2" fontWeight="bold" py={2}>
                  Pricing
                </MDTypography>
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  type="number"
                  variant="standard"
                  required
                  name="service_charge"
                  label="Service Charge in ₹"
                  value={values.service_charge}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.service_charge && Boolean(errors.service_charge)}
                  helperText={touched.service_charge && errors.service_charge}
                  mb={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  type="number"
                  variant="standard"
                  name="min_service_charge"
                  label="Min. Service Charge in ₹"
                  value={values.min_service_charge}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.min_service_charge && Boolean(errors.min_service_charge)}
                  helperText={touched.min_service_charge && errors.min_service_charge}
                  mb={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="body2" fontWeight="bold" py={2}>
                  Other Details
                </MDTypography>
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  type="number"
                  name="sale_discount"
                  label="Sale Discount in %"
                  value={values.sale_discount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.sale_discount && Boolean(errors.sale_discount)}
                  helperText={touched.sale_discount && errors.sale_discount}
                  mb={10}
                />
              </Grid>
            </MDBox>
          </Grid>

          <Grid sm={6} container sx={{ display: "flex", justifyContent: "center" }}>
            <MDBox>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="body2" fontWeight="bold" pt={2}>
                  GST Details
                </MDTypography>
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDInput
                  variant="standard"
                  name="hsn_sac_code"
                  type="number"
                  label="HSN/SAC Code"
                  value={values.hsn_sac_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.hsn_sac_code && Boolean(errors.hsn_sac_code)}
                  helperText={touched.hsn_sac_code && errors.hsn_sac_code}
                  mb={10}
                  mt={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="caption" fontWeight="semi-bold" py={2}>
                  GST Rates:
                </MDTypography>
              </Grid>
              <Grid item sm={12}>
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
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="body2" fontWeight="bold" py={1}>
                  Service Description
                </MDTypography>
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-center" }}>
                <MDInput
                  multiline
                  rows={3}
                  variant="standard"
                  name="service_description"
                  label=""
                  value={values.service_description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.service_description && Boolean(errors.service_description)}
                  helperText={touched.service_description && errors.service_description}
                />
              </Grid>

              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-center" }}>
                <Checkbox
                  checked={values.print_description}
                  onChange={handleChange}
                  name="print_description"
                />
                <MDTypography p={2} variant="body2">
                  Print Description (Invoice)
                </MDTypography>
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

export default Update;
