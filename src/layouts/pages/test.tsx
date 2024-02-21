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
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import Autocomplete from "@mui/material/Autocomplete";
import MDTypography from "components/MDTypography";
const token = Cookies.get("token");
import { message } from "antd";
import DataTable from "examples/Tables/DataTable";

const paymode = ["Cash", "UPI", "Bank Transfer"];
let initialValues = {
  amount: "",
  payment_mode: "",
};

const Create = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const handleCreateSubmit = async () => {
        let sendData = values;

        await axios
          .post("http://10.0.20.121:8000/paymentout", sendData, {
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
  const [data, setData] = useState([]);
  const dataTableData = {
    columns: [
      { Header: "Payment Mode", accessor: "payment_mode" },
      { Header: "Amount", accessor: "amount" },
    ],

    rows: data.map((row, index) => ({
      payment_mode: <p>{row.payment_mode}</p>,
      amount: <p>{row.template_amount}</p>,
    })),
  };
  const handleAddField = () => {
    setData([...data, values]);
    console.log(data);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <MDTypography variant="body2" fontWeight="bold" py={2}>
                  Add Purchase Order
                </MDTypography>
              </Grid>

              <Grid sm={6}>
                <Autocomplete
                  sx={{ width: "80%" }}
                  value={values.payment_mode}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "payment_mode", value },
                    });
                  }}
                  options={paymode}
                  renderInput={(params: any) => (
                    <FormField
                      label="Pay Mode"
                      InputLabelProps={{ shrink: true }}
                      name="payment_mode"
                      onChange={handleChange}
                      value={values.payment_mode}
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              <Grid sm={6} container>
                <MDInput
                  variant="standard"
                  type="number"
                  name="amount"
                  label="Amount"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.amount && Boolean(errors.amount)}
                  helperText={touched.amount && errors.amount}
                />
              </Grid>
            </Grid>
            <MDButton color="info">ADD +</MDButton>
          </MDBox>
        </Card>
        <DataTable
          table={dataTableData}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
        />
        <MDButton color="info" type="submit" onClick={handleAddField}>
          Submit
        </MDButton>
      </form>
    </DashboardLayout>
  );
};

export default Create;
