import MDInput from "components/MDInput";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
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
import Particulars from "../particulars";

let today = new Date().toISOString().split("T")[0];

const gsttypes = ["GST", "Non-GST", "Bill of Supply"];

let initialValues = {
  purchase_type: "GST",
  payment_terms: 0,
  supplier_name: "",
  place_of_supply: "",
  bill_date: today,
  due_date: today,
  purchase_bill_no: "",
  purchase_order_no: "",
  purchase_order_date: today,
  e_way_bill_no: "",

  item_name: "",
  quantity: "",
  unit: "",
  disc: "",
  price: "",
  tax: "",
  cess: "",
  amount: "",

  shipping_cost: 0,
  shipping_tax: 0,
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
const periods = [15, 30, 60, 90, 180];
function Create(props: any) {
  const { setOpen } = props;
  const [data, setData] = useState([]);
  const [statetax, setStatetax] = useState("");

  const { suppliersInfo, productsInfo, unitsName, companyInfo } = useSelector(
    (state: { dataReducer: any }) => state.dataReducer
  );
  console.log("products", productsInfo);
  console.log(suppliersInfo);
  const [checked, setChecked] = useState(false);
  const [discountAll, setDiscountAll] = useState(false);
  const [discountTax, setDiscountTax] = useState(0);

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleCheckDiscount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountAll(event.target.checked);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        const handleCreateSubmit = async () => {
          let taxes: { tax_name: string; percentage: number; amount: number }[] = [];
          let total = subTotal + values.shipping_cost;
          if (values.purchase_type === "GST" && statetax === "InterState") {
            total = subTotal + igstTotal + values.shipping_cost;
            taxes = [{ tax_name: "IGST", percentage: igstTotaltax, amount: igstTotal }];
          } else if (values.purchase_type === "GST" && statetax === "IntraState") {
            total = subTotal + igstTotal + values.shipping_cost;
            taxes = [
              { tax_name: "SGST", percentage: igstTotaltax / 2, amount: igstTotal / 2 },
              { tax_name: "CGST", percentage: igstTotaltax / 2, amount: igstTotal / 2 },
            ];
          }
          let sendData = {
            purchase_type: values.purchase_type,
            bill_date: values.bill_date,
            due_date: values.due_date,
            purchase_bill_no: values.purchase_bill_no,
            purchase_order_no: values.purchase_order_no,
            purchase_order_date: values.purchase_order_date,
            e_way_bill_no: values.e_way_bill_no,

            supplier_name: values.supplier_name,
            payment_terms: values.payment_terms,
            place_of_supply: values.place_of_supply,
            particulars: data,
            shipping_cost: values.shipping_cost,
            shipping_tax: values.shipping_tax,
            remarks: values.remarks,
            payment_mode: values.payment_mode,
            transaction_id: values.transaction_id,
            amount_paid: values.amount_paid,
            sub_total: subTotal,
            total: total,
            taxes: taxes,
          };
          await axios
            .post("http://10.0.20.121:8000/purchase_bill", sendData, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                console.log("Created Successfully");

                message.success("Created SuccessFully");
                setOpen(false);
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

  const subTotal = data.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
  const igstTotaltax = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.tax,
    0
  );
  const igstTotal = (igstTotaltax * subTotal) % 100;
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <MDBox p={4}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <MDTypography variant="caption" fontWeight="bold">
                Purchase Bill Information
              </MDTypography>
            </Grid>
            <Grid item sm={2}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.purchase_type}
                onChange={(event, newValue) => {
                  handleChange({
                    target: { name: "purchase_type", value: newValue },
                  });
                }}
                options={gsttypes}
                renderInput={(params: any) => (
                  <FormField
                    label={<MDTypography variant="caption">Purchase Type</MDTypography>}
                    InputLabelProps={{ shrink: true }}
                    name="purchase_type"
                    onChange={handleChange}
                    value={values.purchase_type}
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item sm={2.5}>
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

                  setFieldValue("place_of_supply", supplierData.state);
                  if (values.purchase_type === "GST") {
                    if (values.place_of_supply == companyInfo.state) {
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
                    label={<MDTypography variant="caption">Supplier Name</MDTypography>}
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
            <Grid item sm={2.5} mt={2}>
              <MDInput
                variant="standard"
                sx={{ width: "70%" }}
                type="date"
                name="bill_date"
                value={values.bill_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.bill_date && Boolean(errors.bill_date)}
                helperText={touched.bill_date && errors.bill_date}
              />
            </Grid>
            <Grid item sm={2.5}>
              <Autocomplete
                value={values.payment_terms}
                sx={{ width: "90%" }}
                disableClearable
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "payment_terms", value },
                  });
                }}
                options={periods}
                renderInput={(params: any) => (
                  <FormField
                    label={
                      <MDTypography variant="caption">Payment Terms(Credit Period)</MDTypography>
                    }
                    InputLabelProps={{ shrink: true }}
                    name="place_of_supply"
                    onChange={handleChange}
                    value={values.place_of_supply}
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item sm={2.5} mt={2}>
              {" "}
              <MDInput
                variant="standard"
                sx={{ width: "70%" }}
                type="date"
                name="due_date"
                value={values.due_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.due_date && Boolean(errors.due_date)}
                helperText={touched.due_date && errors.due_date}
              />
            </Grid>
            <Grid item sm={2}>
              <Autocomplete
                value={values.place_of_supply}
                sx={{ width: "90%" }}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "place_of_supply", value },
                  });
                  if (values.purchase_type === "GST") {
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
                    label={<MDTypography variant="caption">Place of Supply</MDTypography>}
                    InputLabelProps={{ shrink: true }}
                    name="place_of_supply"
                    onChange={handleChange}
                    value={values.place_of_supply}
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item sm={2}>
              {" "}
              <MDInput
                variant="standard"
                sx={{ width: "90%" }}
                label={<MDTypography variant="caption">Purchase Bill No.</MDTypography>}
                name="purchase_bill_no"
                value={values.purchase_bill_no}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.purchase_bill_no && Boolean(errors.purchase_bill_no)}
                helperText={touched.purchase_bill_no && errors.purchase_bill_no}
              />
            </Grid>
            <Grid item sm={2}>
              {" "}
              <MDInput
                variant="standard"
                sx={{ width: "90%" }}
                label={<MDTypography variant="caption">Purchase Order No.</MDTypography>}
                name="purchase_order_no"
                value={values.purchase_order_no}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.purchase_order_no && Boolean(errors.purchase_order_no)}
                helperText={touched.purchase_order_no && errors.purchase_order_no}
              />
            </Grid>

            <Grid item sm={3} mt={2}>
              <MDInput
                variant="standard"
                sx={{ width: "70%" }}
                type="date"
                name="purchase_order_date"
                value={values.purchase_order_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.purchase_order_date && Boolean(errors.purchase_order_date)}
                helperText={touched.purchase_order_date && errors.purchase_order_date}
              />
            </Grid>
            <Grid item sm={3}>
              <MDInput
                variant="standard"
                sx={{ width: "70%" }}
                required
                label={<MDTypography variant="caption">E-Way Bill No.</MDTypography>}
                name="e_way_bill_no"
                value={values.e_way_bill_no}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.e_way_bill_no && Boolean(errors.e_way_bill_no)}
                helperText={touched.e_way_bill_no && errors.e_way_bill_no}
              />
            </Grid>

            <Grid item sm={12}>
              <MDTypography variant="caption" fontWeight="bold">
                Particulars
              </MDTypography>
            </Grid>

            <Particulars
              values={values}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
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
                  label={<MDTypography variant="caption">Add Shipping Cost</MDTypography>}
                />
              </FormGroup>
              {checked && (
                <>
                  <MDInput
                    variant="standard"
                    type="number"
                    name="shipping_cost"
                    label={<MDTypography variant="caption">Cost (₹)</MDTypography>}
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
                    label={<MDTypography variant="caption">Tax (%)</MDTypography>}
                    value={values.shipping_tax}
                    onBlur={handleBlur}
                    error={touched.shipping_tax && Boolean(errors.shipping_tax)}
                    helperText={touched.shipping_tax && errors.shipping_tax}
                  />
                </>
              )}
            </Grid>
            <Grid item sm={3}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={discountAll} onChange={handleCheckDiscount} />}
                  label={<MDTypography variant="caption">Discount to all</MDTypography>}
                />
              </FormGroup>
              {discountAll && (
                <>
                  <MDInput
                    variant="standard"
                    type="number"
                    onChange={(e: any) => {
                      setDiscountTax(e.target.value);
                    }}
                    label="Tax(%)"
                    value={discountTax}
                    onBlur={handleBlur}
                  />
                </>
              )}
              <MDInput
                multiline
                rows={3}
                onChange={handleChange}
                variant="standard"
                name="remarks"
                label={<MDTypography variant="caption">Remarks (private use)</MDTypography>}
                value={values.remarks}
                onBlur={handleBlur}
                error={touched.remarks && Boolean(errors.remarks)}
                helperText={touched.remarks && errors.remarks}
              />
            </Grid>
            <Grid item sm={3}>
              <Stack>
                <MDTypography variant="caption" fontWeight="bold">
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
                    label={<MDTypography variant="caption">Payment Mode</MDTypography>}
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
                label={<MDTypography variant="caption">Transaction ID</MDTypography>}
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
                label={<MDTypography variant="caption">Amount Paid(₹)</MDTypography>}
                value={values.amount_paid}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.amount_paid && Boolean(errors.amount_paid)}
                helperText={touched.amount_paid && errors.amount_paid}
              />
            </Grid>
            <Grid item sm={3}>
              <MDTypography variant="caption" fontWeight="bold">
                Sub Total :{subTotal}
              </MDTypography>
              {values.purchase_type == "GST" && statetax == "InterState" && (
                <>
                  <MDTypography variant="caption">
                    Add IGST({igstTotaltax}%) :{(igstTotaltax * subTotal) % 100}
                  </MDTypography>
                  <MDTypography variant="caption" fontWeight="bold">
                    TOTAL AMOUNT :{subTotal + igstTotal + values.shipping_cost}
                  </MDTypography>
                </>
              )}
              {values.purchase_type == "GST" && statetax == "IntraState" && (
                <>
                  <MDTypography variant="caption">
                    Add SGST({igstTotaltax / 2}%) :{((igstTotaltax * subTotal) % 100) / 2}
                  </MDTypography>
                  <MDTypography variant="caption">
                    Add CGST({igstTotaltax / 2}%) :{((igstTotaltax * subTotal) % 100) / 2}
                  </MDTypography>

                  <MDTypography variant="caption" fontWeight="bold">
                    TOTAL AMOUNT :{subTotal + igstTotal + values.shipping_cost}
                  </MDTypography>
                </>
              )}
              {values.purchase_type !== "GST" && (
                <>
                  <MDTypography variant="caption" fontWeight="bold">
                    TOTAL AMOUNT :{subTotal + values.shipping_cost}
                  </MDTypography>
                </>
              )}
            </Grid>
            <Grid sm={12} item sx={{ display: "flex", justifyContent: "flex-end" }} gap={2}>
              <MDButton color="info" type="submit">
                Submit
              </MDButton>
              <MDButton color="primary" variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
}

export default Create;
