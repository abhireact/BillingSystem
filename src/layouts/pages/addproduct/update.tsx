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
//import {ChangeEvent} from "react";

// const validationSchema = yup.object({
//   username: yup.string().min(2).max(25).required("Please enter your name"),

//   password: yup
//     .string()
//     .min(8, "Password should be of minimum 8 characters length")
//     .required("Password is required"),
// });
const unitOptions = [
  "UNT",
  "TON",
  "TBS",
  "SQY",
  "SQM",
  "SQF",
  "SET",
  "ROL",
  "QTL",
  "PCS",
  "PAC",
  "NOS",
  "MTR",
  "MLT",
  "KLR",
  "KGS",
  "GMS",
  "DOZ",
  "CTN",
  "CMS",
  "CCM",
  "CBM",
  "CAN",
  "BUN",
  "BTL",
  "BOX",
  "BKL",
  "BDL",
  "BAL",
  "BAG",
];
let initialValues = {
  group: "",
  brand: "",
  item_code: "",
  product_name: "",
  print_name: "",
  purchase_price: "",
  sale_price: "",
  min_sale_price: "",
  sale_discount: "",
  mrp: "",
  unit: "",
  opening_stock: "",
  opening_stock_price: "",
  hsn_sac_code: "",
  cgst: 0,
  sgst: 0,
  igst: 0,
  cess: 0,
  product_description: "",
  print_description: false,
  low_level_limit: "",
  product_type: "",
  serial_no: "",

  one_click_sale: true,
  enable_tracking: true,
  print_serial_no: true,
  not_for_sale: true,
};

const Update = (props: any) => {
  const { setOpenupdate, editData } = props;
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    // validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      let sendData = values;

      await axios
        .post("http://10.0.20.121:8000/products", sendData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Created Successfully");
            handleCloseupdate();
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
          <Grid sm={6} container sx={{ display: "flex", justifyContent: "center" }}>
            <MDBox>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="body2" fontWeight="bold" py={2}>
                  Product Details
                </MDTypography>
              </Grid>

              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  required
                  name="group"
                  label="Group"
                  value={values.group}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.group && Boolean(errors.group)}
                  helperText={touched.group && errors.group}
                  mb={10}
                />
              </Grid>

              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  name="brand"
                  label="Brand"
                  value={values.brand}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.brand && Boolean(errors.brand)}
                  helperText={touched.brand && errors.brand}
                  mb={10}
                />
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
                  name="product_name"
                  label="Product Name"
                  value={values.product_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.product_name && Boolean(errors.product_name)}
                  helperText={touched.product_name && errors.product_name}
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
                  Price Details
                </MDTypography>
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  type="number"
                  variant="standard"
                  required
                  name="purchase_price"
                  label="Purchase Price in ₹"
                  value={values.purchase_price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.purchase_price && Boolean(errors.purchase_price)}
                  helperText={touched.purchase_price && errors.purchase_price}
                  mb={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  type="number"
                  required
                  variant="standard"
                  name="sale_price"
                  label="Sale Price in ₹"
                  value={values.sale_price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.sale_price && Boolean(errors.sale_price)}
                  helperText={touched.sale_price && errors.sale_price}
                  mb={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  type="number"
                  required
                  variant="standard"
                  name="min_sale_price"
                  label="Min. Sale Price in ₹"
                  value={values.min_sale_price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.min_sale_price && Boolean(errors.min_sale_price)}
                  helperText={touched.min_sale_price && errors.min_sale_price}
                  mb={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  type="number"
                  required
                  variant="standard"
                  name="mrp"
                  label="M.R.P in ₹"
                  value={values.mrp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.mrp && Boolean(errors.mrp)}
                  helperText={touched.mrp && errors.mrp}
                  mb={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="body2" fontWeight="bold" py={2}>
                  Stock and Unit details
                </MDTypography>
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  type="number"
                  required
                  name="unit"
                  label="Unit"
                  value={values.unit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.unit && Boolean(errors.unit)}
                  helperText={touched.unit && errors.unit}
                  mb={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  type="number"
                  name="opening_stock"
                  label="Opening Stock"
                  value={values.opening_stock}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.opening_stock && Boolean(errors.opening_stock)}
                  helperText={touched.opening_stock && errors.opening_stock}
                  mb={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                <MDInput
                  variant="standard"
                  type="number"
                  name="Opening_Stock_Price"
                  label="opening stock price"
                  value={values.opening_stock_price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.opening_stock_price && Boolean(errors.opening_stock_price)}
                  helperText={touched.opening_stock_price && errors.opening_stock_price}
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
                  Other Details
                </MDTypography>
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDInput
                  variant="standard"
                  name="sale_discount"
                  type="number"
                  label="Sale Discount in %"
                  value={values.sale_discount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.sale_discount && Boolean(errors.sale_discount)}
                  helperText={touched.sale_discount && errors.sale_discount}
                  mb={10}
                  mt={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDInput
                  variant="standard"
                  name="low_level_limit"
                  type="number"
                  label="Low Level Limit"
                  value={values.low_level_limit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.low_level_limit && Boolean(errors.low_level_limit)}
                  helperText={touched.low_level_limit && errors.low_level_limit}
                  mb={10}
                  mt={10}
                />
              </Grid>

              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDInput
                  variant="standard"
                  name="product_type"
                  label="Product Type"
                  value={values.product_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.product_type && Boolean(errors.product_type)}
                  helperText={touched.product_type && errors.product_type}
                  mb={10}
                  mt={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDInput
                  variant="standard"
                  name="serial_no"
                  label="Serial No."
                  value={values.serial_no}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.serial_no && Boolean(errors.serial_no)}
                  helperText={touched.serial_no && errors.serial_no}
                  mb={10}
                  mt={10}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="body2" fontWeight="bold" py={1}>
                  Product Description
                </MDTypography>
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-center" }}>
                <MDInput
                  multiline
                  rows={3}
                  variant="standard"
                  name="product_description"
                  label=""
                  value={values.product_description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.product_description && Boolean(errors.product_description)}
                  helperText={touched.product_description && errors.product_description}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="body2" fontWeight="bold" py={1}>
                  Product Settings
                </MDTypography>
              </Grid>

              <Grid item sm={6} sx={{ display: "flex", justifyContent: "flex-center" }}>
                <Checkbox
                  checked={values.print_description}
                  onChange={handleChange}
                  name="print_description"
                />
                <MDTypography p={2} variant="body2">
                  Print Description
                </MDTypography>
              </Grid>

              <Grid item sm={6} sx={{ display: "flex", justifyContent: "flex-center" }}>
                <Checkbox
                  checked={values.one_click_sale}
                  onChange={handleChange}
                  name="one_click_sale"
                />
                <MDTypography p={2} variant="body2">
                  One Click Sale
                </MDTypography>
              </Grid>

              <Grid item sm={6} sx={{ display: "flex", justifyContent: "flex-center" }}>
                <Checkbox
                  checked={values.enable_tracking}
                  onChange={handleChange}
                  name="enable_tracking"
                />
                <MDTypography p={2} variant="body2">
                  Enable Tracking
                </MDTypography>
              </Grid>
              <Grid item sm={6} sx={{ display: "flex", justifyContent: "flex-center" }}>
                <Checkbox
                  checked={values.print_serial_no}
                  onChange={handleChange}
                  name="print_serial_no"
                />
                <MDTypography p={2} variant="body2">
                  Print Serial No.
                </MDTypography>
              </Grid>
              <Grid item sm={6} sx={{ display: "flex", justifyContent: "flex-center" }}>
                <Checkbox
                  checked={values.not_for_sale}
                  onChange={handleChange}
                  name="not_for_sale"
                />
                <MDTypography p={2} variant="body2">
                  Not For Sale
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
