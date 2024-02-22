import MDInput from "components/MDInput";
import { useFormik } from "formik";
import { useState, useEffect, Key } from "react";
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
const token = Cookies.get("token");
import { message } from "antd";
import DataTable from "examples/Tables/DataTable";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { useDispatch, useSelector } from "react-redux";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, FormControlLabel, FormLabel, RadioGroup, InputLabel } from "@mui/material";

let today = new Date().toISOString().split("T")[0];

const gsttypes = ["GST", "Non-GST", "Billing System"];

let initialValues = {
  item_name: "",
  quantity: "",
  unit: "",
  disc: "",
  price: "",
  tax: "",
  cess: "",
  amount: "",
  order_type: "GST",
  date: today,
  valid_till: today,
  supplier_name: "",
  contact_no: "",
  place_supply: "",
  shipping_cost: 0,
  shipping_tax: 0,
  delivery_terms: "",
  remarks: "",
  payment_mode: "Cash",
  transaction_id: "",
  amount_paid: "",
  total: "",
  subtotal: "",
};
const paymodes = ["Cash", "UPI", "Bank Transfer"];
const Create = () => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const { productsName, suppliersInfo, unitsName, status, error } = useSelector(
    (state: { dataReducer: any }) => state.dataReducer
  );

  console.log(suppliersInfo);
  const [checked, setChecked] = useState(false);

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        const handleCreateSubmit = async () => {
          let sendData = {
            order_type: values.order_type,
            // Add other properties as needed
            // Assuming you want to include the entire data array as well
            data: data,
          };
          await axios
            .post("", sendData, {
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
      },
    });

  const dataTableData = {
    columns: [
      { Header: "Item Name", accessor: "item_name" },
      { Header: "Quantity", accessor: "quantity" },
      { Header: "Unit", accessor: "unit" },
      { Header: "Price / Unit", accessor: "price" },
      { Header: "Discount", accessor: "disc" },
      { Header: "Tax", accessor: "tax" },
      { Header: "CESS", accessor: "cess" },
      { Header: "Amount", accessor: "amount" },
    ],

    rows: data.map((row, index) => ({
      item_name: <p>{row.item_name}</p>,
      amount: <p>{row.amount}</p>,
      disc: <p>{row.disc}</p>,
      unit: <p>{row.unit}</p>,
      price: <p>{row.price}</p>,
      tax: <p>{row.tax}</p>,
      cess: <p>{row.cess}</p>,
      quantity: <p>{row.quantity}</p>,
    })),
  };
  const handleAddField = () => {
    // if (!values.item_name || !values.amount) {
    //   message.error("Invalid Fields.");
    //   return;
    // }

    setData([
      ...data,
      {
        item_name: values.item_name,
        amount: values.amount,
        unit: values.unit,
        price: values.price,
        quantity: values.quantity,
        disc: values.disc,
        tax: values.tax,
        cess: values.cess,
      },
    ]);
    setFieldValue("item_name", "");
    setFieldValue("amount", "");
    setFieldValue("unit", "");
    setFieldValue("quantity", "");
    setFieldValue("disc", "");
    setFieldValue("price", "");
    setFieldValue("cess", "");
    setFieldValue("tax", "");

    console.log(data, "added values");
  };
  const handleSupplierChange = (e: any) => {
    setFieldValue("supplier_name", e.target.value.company_name);
    setFieldValue("contact_no", e.target.value.contact_no);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <MDTypography variant="body2" fontWeight="bold">
                  Purchase Order Information
                </MDTypography>
              </Grid>
              <Grid item sm={3}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  value={values.order_type}
                  onChange={(event, newValue) => {
                    handleChange({
                      target: { name: "order_type", value: newValue },
                    });
                  }}
                  options={gsttypes}
                  renderInput={(params: any) => (
                    <FormField
                      label="Order Type"
                      InputLabelProps={{ shrink: true }}
                      name="order_type"
                      onChange={handleChange}
                      value={values.order_type}
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              <Grid item sm={3}>
                <FormControl sx={{ minWidth: "70%" }}>
                  <InputLabel>Supplier Name</InputLabel>
                  <Select
                    value={values.supplier_name}
                    onChange={handleSupplierChange}
                    autoWidth={true}
                    name="supplier_name"
                    variant="standard"
                  >
                    {suppliersInfo.map((suppliers: any, index: Key) => (
                      <MenuItem key={index} value={suppliers}>
                        {suppliers.company_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={3}>
                <MDInput
                  variant="standard"
                  name="contact_no"
                  label="Contact No."
                  value={values.contact_no}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contact_no && Boolean(errors.contact_no)}
                  helperText={touched.contact_no && errors.contact_no}
                />
              </Grid>
              <Grid item sm={3}>
                <MDInput
                  variant="standard"
                  name="place_supply"
                  label="Place of Supply"
                  value={values.place_supply}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.place_supply && Boolean(errors.place_supply)}
                  helperText={touched.place_supply && errors.place_supply}
                />
              </Grid>

              <Grid item sm={3}>
                <MDTypography variant="subtitle2">Date</MDTypography>
              </Grid>
              <Grid item sm={3}>
                <MDInput
                  variant="standard"
                  sx={{ width: "70%" }}
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                />
              </Grid>
              <Grid item sm={3}>
                <MDTypography variant="subtitle2">Valid Till</MDTypography>
              </Grid>
              <Grid item sm={3}>
                {" "}
                <MDInput
                  variant="standard"
                  sx={{ width: "70%" }}
                  type="date"
                  name="valid_till"
                  value={values.valid_till}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.valid_till && Boolean(errors.valid_till)}
                  helperText={touched.valid_till && errors.valid_till}
                />
              </Grid>

              <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}></Grid>

              <Grid item sm={12}>
                <MDTypography variant="body2" fontWeight="bold">
                  Particulars
                </MDTypography>
              </Grid>

              <Grid item sm={3}>
                <Autocomplete
                  sx={{ width: "100%" }}
                  value={values.item_name}
                  onChange={(event, newValue) => {
                    handleChange({
                      target: { name: "item_name", value: newValue },
                    });
                  }}
                  options={productsName}
                  renderInput={(params: any) => (
                    <FormField
                      label="Item Name"
                      InputLabelProps={{ shrink: true }}
                      name="item_name"
                      onChange={handleChange}
                      value={values.item_name}
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item sm={1} container>
                <MDInput
                  variant="standard"
                  type="number"
                  name="quantity"
                  label="Quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.quantity && Boolean(errors.quantity)}
                  helperText={touched.quantity && errors.quantity}
                />
              </Grid>
              <Grid item sm={2} container>
                <MDInput
                  variant="standard"
                  type="number"
                  name="price"
                  label="Purchase Price (₹)"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                />
              </Grid>
              <Grid item sm={1}>
                <Autocomplete
                  value={values.unit}
                  onChange={(event, newValue) => {
                    handleChange({
                      target: { name: "unit", value: newValue },
                    });
                  }}
                  options={unitsName}
                  renderInput={(params: any) => (
                    <FormField
                      label="Unit"
                      InputLabelProps={{ shrink: true }}
                      name="unit"
                      onChange={handleChange}
                      value={values.unit}
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item sm={1.5}>
                <MDInput
                  variant="standard"
                  type="number"
                  name="disc"
                  label="Discount (%)"
                  value={values.disc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.disc && Boolean(errors.disc)}
                  helperText={touched.disc && errors.disc}
                />
              </Grid>
              <Grid item sm={1}>
                <MDInput
                  variant="standard"
                  type="number"
                  name="tax"
                  label="Tax (%)"
                  value={values.tax}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.tax && Boolean(errors.tax)}
                  helperText={touched.tax && errors.tax}
                />
              </Grid>
              <Grid item sm={1}>
                <MDInput
                  variant="standard"
                  type="number"
                  name="cess"
                  label="CESS (%)"
                  value={values.cess}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cess && Boolean(errors.cess)}
                  helperText={touched.cess && errors.cess}
                />
              </Grid>
              <Grid item sm={1.5}>
                <MDInput
                  variant="standard"
                  type="number"
                  name="amount"
                  label="Amount (₹)"
                  value={values.amount}
                  onBlur={handleBlur}
                  error={touched.amount && Boolean(errors.amount)}
                  helperText={touched.amount && errors.amount}
                />
              </Grid>
            </Grid>
            <Grid item py={2} pr={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <MDButton color="info" onClick={handleAddField}>
                ADD +
              </MDButton>
            </Grid>
          </MDBox>

          <DataTable
            table={dataTableData}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
          />

          <MDBox p={4}>
            <Grid container>
              <Grid item sm={3}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleCheckbox} />}
                    label={<MDTypography variant="body2">Add Shipping Cost</MDTypography>}
                  />
                </FormGroup>
                {checked && (
                  <>
                    <MDInput
                      variant="standard"
                      type="number"
                      name="shipping_cost"
                      label="Cost (₹)"
                      value={values.shipping_cost}
                      onBlur={handleBlur}
                      error={touched.shipping_cost && Boolean(errors.shipping_cost)}
                      helperText={touched.shipping_cost && errors.shipping_cost}
                    />
                    <MDInput
                      variant="standard"
                      type="number"
                      name="shipping_tax"
                      label="Tax(%)"
                      value={values.shipping_tax}
                      onBlur={handleBlur}
                      error={touched.shipping_tax && Boolean(errors.shipping_tax)}
                      helperText={touched.shipping_tax && errors.shipping_tax}
                    />
                  </>
                )}
              </Grid>
              <Grid item sm={3}>
                <MDInput
                  multiline
                  rows={2}
                  variant="standard"
                  name="delivery_terms"
                  label="Delivery Terms"
                  value={values.delivery_terms}
                  onBlur={handleBlur}
                  error={touched.delivery_terms && Boolean(errors.delivery_terms)}
                  helperText={touched.delivery_terms && errors.delivery_terms}
                />
                <MDInput
                  multiline
                  rows={2}
                  variant="standard"
                  name="remarks"
                  label="Remarks (Private Use)"
                  value={values.remarks}
                  onBlur={handleBlur}
                  error={touched.remarks && Boolean(errors.remarks)}
                  helperText={touched.remarks && errors.remarks}
                />
              </Grid>
              <Grid item sm={3}>
                <Stack>
                  <MDTypography variant="body2" fontWeight="bold">
                    Payment
                  </MDTypography>
                </Stack>

                <Autocomplete
                  sx={{ width: "70%" }}
                  value={values.payment_mode}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "payment_mode", value },
                    });
                  }}
                  options={paymodes}
                  renderInput={(params: any) => (
                    <FormField
                      label="Payment Mode"
                      InputLabelProps={{ shrink: true }}
                      name="payment_mode"
                      onChange={handleChange}
                      value={values.payment_mode}
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
                <MDInput
                  sx={{ width: "70%" }}
                  variant="standard"
                  name="transaction_id"
                  label="Transaction ID"
                  value={values.transaction_id}
                  onBlur={handleBlur}
                  error={touched.transaction_id && Boolean(errors.transaction_id)}
                  helperText={touched.transaction_id && errors.transaction_id}
                />
                <MDInput
                  sx={{ width: "70%" }}
                  variant="standard"
                  type="number"
                  name="amount_paid"
                  label="Amount Paid (₹)"
                  value={values.amount_paid}
                  onBlur={handleBlur}
                  error={touched.amount_paid && Boolean(errors.amount_paid)}
                  helperText={touched.amount_paid && errors.amount_paid}
                />
              </Grid>
              <Grid item sm={3}></Grid>
            </Grid>
          </MDBox>
        </Card>
        <MDButton color="info" type="submit">
          Submit
        </MDButton>
      </form>
    </DashboardLayout>
  );
};

export default Create;
