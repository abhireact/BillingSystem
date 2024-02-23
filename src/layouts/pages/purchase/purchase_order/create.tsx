import MDInput from "components/MDInput";
import { useFormik } from "formik";
import { useState } from "react";
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
import { FormControlLabel } from "@mui/material";

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
};
const paymodes = ["Cash", "UPI", "Bank Transfer"];
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
const Create = (props: any) => {
  const { setOpen } = props;
  const [data, setData] = useState([]);
  const [statetax, setStatetax] = useState("");

  const { suppliersInfo, productsInfo, unitsName, companyInfo } = useSelector(
    (state: { dataReducer: any }) => state.dataReducer
  );
  console.log("products", productsInfo);
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
          let taxes: { tax_name: string; percentage: number; amount: number }[] = [];
          let total = subTotal;
          if (values.order_type === "GST" && statetax === "InterState") {
            total = subTotal + igstTotal;
            taxes = [{ tax_name: "IGST", percentage: igstTotaltax, amount: igstTotal }];
          } else if (values.order_type === "GST" && statetax === "IntraState") {
            total = subTotal + igstTotal;
            taxes = [
              { tax_name: "SGST", percentage: igstTotaltax / 2, amount: igstTotal / 2 },
              { tax_name: "CGST", percentage: igstTotaltax / 2, amount: igstTotal / 2 },
            ];
          }
          let sendData = {
            order_type: values.order_type,
            date: values.date,
            valid_till: values.valid_till,
            supplier_name: values.supplier_name,
            contact_no: values.contact_no,
            place_supply: values.place_supply,
            particulars: data,
            shipping_cost: values.shipping_cost,
            shipping_tax: values.shipping_tax,
            delivery_terms: values.delivery_terms,
            remarks: values.remarks,
            payment_mode: values.payment_mode,
            transaction_id: values.transaction_id,
            amount_paid: values.amount_paid,
            sub_total: subTotal,
            total: total,
            taxes: taxes,
          };
          await axios
            .post("http://10.0.20.121:8000/purchaseorder", sendData, {
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
      item_name: <MDTypography variant="p">{row.item_name}</MDTypography>,
      amount: <MDTypography variant="p">{row.amount}</MDTypography>,
      disc: <MDTypography variant="p">{row.disc}</MDTypography>,
      unit: <MDTypography variant="p">{row.unit}</MDTypography>,
      price: <MDTypography variant="p">{row.price}</MDTypography>,
      tax: <MDTypography variant="p">{row.tax}</MDTypography>,
      cess: <MDTypography variant="p">{row.cess}</MDTypography>,
      quantity: <MDTypography variant="p">{row.quantity}</MDTypography>,
    })),
  };
  const handleAddField = () => {
    if (!values.item_name || !values.amount || !values.quantity || !values.price) {
      message.error("fill all the required fields");
      return;
    }

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

  const handleQuantityChange = (e: any) => {
    setFieldValue("quantity", e.target.value);
    const amount = e.target.value * parseInt(values.price);
    setFieldValue("amount", amount);
  };
  const handlePriceChange = (e: any) => {
    setFieldValue("price", e.target.value);
    const amount = e.target.value * parseInt(values.quantity);
    setFieldValue("amount", amount);
  };
  const subTotal = data.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
  const igstTotaltax = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.tax,
    0
  );
  const igstTotal = (igstTotaltax * subTotal) % 100;
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
                <Autocomplete
                  sx={{ width: "70%" }}
                  value={values.supplier_name}
                  disableClearable
                  onChange={(event, newValue: any) => {
                    const supplierData = suppliersInfo.find(
                      (supplier: any) => supplier.company_name === newValue
                    );
                    console.log(supplierData, "supplier data");

                    handleChange({
                      target: { name: "supplier_name", value: newValue },
                    });

                    setFieldValue("contact_no", supplierData.contact_no);
                    setFieldValue("place_supply", supplierData.state);
                    if (values.order_type === "GST") {
                      if (values.place_supply == companyInfo.state) {
                        console.log("state matches");
                        setStatetax("IntraState");
                      } else {
                        console.log("state donot match");
                        setStatetax("InterState");
                      }
                    }
                  }}
                  options={suppliersInfo.map((supplier: any) => supplier.company_name)}
                  renderInput={(params: any) => (
                    <FormField
                      label="Supplier Name"
                      InputLabelProps={{ shrink: true }}
                      name="supplier_name"
                      onChange={handleChange}
                      value={values.supplier_name}
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3}>
                <MDInput
                  sx={{ width: "70%" }}
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
                <Autocomplete
                  value={values.place_supply}
                  sx={{ width: "70%" }}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "place_supply", value },
                    });
                    if (values.order_type === "GST") {
                      if (value == companyInfo.state) {
                        console.log("state matches");
                        setStatetax("IntraState");
                      } else {
                        console.log("state donot match");
                        setStatetax("InterState");
                      }
                    }
                  }}
                  options={states}
                  renderInput={(params: any) => (
                    <FormField
                      label="Place of Supply"
                      InputLabelProps={{ shrink: true }}
                      name="place_supply"
                      onChange={handleChange}
                      value={values.place_supply}
                      {...params}
                      variant="outlined"
                    />
                  )}
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
                  disableClearable
                  onChange={(event, newValue: any) => {
                    const productData = productsInfo.find(
                      (item: any) => item.product_name === newValue
                    );
                    console.log(productData, "product data");

                    handleChange({
                      target: { name: "item_name", value: newValue },
                    });
                    setFieldValue("price", productData.purchase_price);
                    setFieldValue("tax", productData.igst);
                    setFieldValue("cess", productData.cess);
                    setFieldValue("unit", productData.unit);
                    setFieldValue("disc", productData.sale_discount);
                    setFieldValue("quantity", 1);
                    setFieldValue("amount", productData.purchase_price);
                  }}
                  options={productsInfo.map(
                    (products: { product_name: any }) => products.product_name
                  )}
                  renderInput={(params: any) => (
                    <FormField
                      label="Item Name *"
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
                  label="Quantity*"
                  value={values.quantity}
                  onChange={handleQuantityChange}
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
                  onChange={handlePriceChange}
                  onBlur={handleBlur}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                />
              </Grid>
              <Grid item sm={1}>
                <Autocomplete
                  disableClearable
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
                      onChange={handleChange}
                      value={values.shipping_cost}
                      onBlur={handleBlur}
                      error={touched.shipping_cost && Boolean(errors.shipping_cost)}
                      helperText={touched.shipping_cost && errors.shipping_cost}
                    />
                    <MDInput
                      variant="standard"
                      type="number"
                      onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
                <MDInput
                  sx={{ width: "70%" }}
                  variant="standard"
                  type="number"
                  name="amount_paid"
                  label="Amount Paid (₹)"
                  value={values.amount_paid}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.amount_paid && Boolean(errors.amount_paid)}
                  helperText={touched.amount_paid && errors.amount_paid}
                />
              </Grid>
              <Grid item sm={3}>
                <MDTypography variant="body2" fontWeight="bold">
                  Sub Total :{subTotal}
                </MDTypography>
                {values.order_type == "GST" && statetax == "InterState" && (
                  <>
                    <MDTypography variant="body2">
                      Add IGST({igstTotaltax}%) :{(igstTotaltax * subTotal) % 100}
                    </MDTypography>
                    <MDTypography variant="body2" fontWeight="bold">
                      TOTAL AMOUNT :{subTotal + igstTotal}
                    </MDTypography>
                  </>
                )}
                {values.order_type == "GST" && statetax == "IntraState" && (
                  <>
                    <MDTypography variant="body2">
                      Add SGST({igstTotaltax / 2}%) :{((igstTotaltax * subTotal) % 100) / 2}
                    </MDTypography>
                    <MDTypography variant="body2">
                      Add CGST({igstTotaltax / 2}%) :{((igstTotaltax * subTotal) % 100) / 2}
                    </MDTypography>

                    <MDTypography variant="body2" fontWeight="bold">
                      TOTAL AMOUNT :{subTotal + igstTotal}
                    </MDTypography>
                  </>
                )}
                {values.order_type !== "GST" && (
                  <>
                    <MDTypography variant="body2" fontWeight="bold">
                      TOTAL AMOUNT :{subTotal}
                    </MDTypography>
                  </>
                )}
              </Grid>
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
