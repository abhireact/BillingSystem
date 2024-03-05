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
import FormControl from "@mui/material/FormControl";
import { InputLabel, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
const token = Cookies.get("token");
import { message } from "antd";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

const paymode = ["Cash", "UPI", "Bank Transfer"];
let initialValues = {
  amount: "",

  client_name: "",
  payment_mode: "Cash",
  date: "",
  remarks: "",
  trnx_id: "",
  contact_no: "",
};

const Create = (props: any) => {
  const { clientInfo } = useSelector((state: { dataReducer: any }) => state.dataReducer);
  const [clientAccount, setClientAccount] = useState("");
  const { setOpen, editData, method } = props;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://10.0.20.121:8000/clients", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response.data, "my client data");
        }
      } catch (error) {
        // console.error(error);
        console.log("Data not found");
      }
    };

    fetchItems();
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  if (method === "PUT") {
    initialValues = {
      amount: editData.amount,

      remarks: editData.remarks,

      date: editData.date,
      contact_no: editData.contact_no,
      trnx_id: editData.trnx_id,
      client_name: editData.client_name,

      payment_mode: "",
    };
  } else {
    initialValues = {
      amount: "",

      remarks: "",

      date: "",
      contact_no: "",
      trnx_id: "",
      client_name: "",

      payment_mode: "Cash",
    };
  }
  // Conditionally set the validation schema

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,

    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const handleCreateSubmit = async () => {
        let sendData = { ...values, payment_receipt_no: "REC/MAR/001" };

        await axios
          .post("http://10.0.20.121:8000/paymentin", sendData, {
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
      };
      const handleUpdateSubmit = async () => {
        let sendData = {
          ...values,
        };

        await axios
          .put("http://10.0.20.121:8000/paymentin", sendData, {
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
      };
      if (method === "PUT") {
        handleUpdateSubmit();
      } else {
        handleCreateSubmit();
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        {" "}
        <MDBox p={4}>
          <Grid container>
            <Grid
              item
              sm={12}
              sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <MDTypography variant="body2" fontWeight="bold" py={2}>
                Payment In
              </MDTypography>
              {clientAccount && (
                <MDTypography variant="body2" py={2}>
                  Account Balance : {clientAccount}
                </MDTypography>
              )}
            </Grid>
            <Grid sm={6} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox>
                <Grid item sm={12}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    value={values.client_name}
                    disableClearable
                    onChange={(event, newValue: any) => {
                      const clientData = clientInfo.find(
                        (client: any) => client.fullname === newValue
                      );
                      console.log(clientData, "Client data");
                      setClientAccount(clientData.amount);

                      handleChange({
                        target: { name: "client_name", value: newValue },
                      });
                    }}
                    options={clientInfo.map((client: any) => client.fullname)}
                    renderInput={(params: any) => (
                      <FormField
                        label="Client Name"
                        InputLabelProps={{ shrink: true }}
                        name="client_name"
                        onChange={handleChange}
                        value={values.client_name}
                        {...params}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item sm={12} pt={1}>
                  <MDInput
                    variant="standard"
                    type="date"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.date && Boolean(errors.date)}
                    helperText={touched.date && errors.date}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid sm={12}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    value={values.payment_mode}
                    onChange={(event, value) => {
                      handleChange({
                        target: { name: "payment_mode", value },
                      });
                    }}
                    options={paymode}
                    renderInput={(params: any) => (
                      <FormField
                        // label="Pay Mode"
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

                <Grid item sm={12}>
                  <MDInput
                    variant="standard"
                    required
                    name="contact_no"
                    label="Contact No."
                    value={values.contact_no}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.contact_no && Boolean(errors.contact_no)}
                    helperText={touched.contact_no && errors.contact_no}
                  />
                </Grid>

                <Grid item sm={12}>
                  <MDInput
                    variant="standard"
                    required
                    name="trnx_id"
                    label="Transaction ID"
                    value={values.trnx_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.trnx_id && Boolean(errors.trnx_id)}
                    helperText={touched.trnx_id && errors.trnx_id}
                  />
                </Grid>
              </MDBox>
            </Grid>

            <Grid sm={6} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox>
                <Grid item sm={12}>
                  <MDInput
                    variant="standard"
                    required
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

                <Grid item sm={12} pb={3}>
                  <MDInput
                    multiline
                    rows={4}
                    variant="standard"
                    name="remarks"
                    label="Remarks"
                    value={values.remarks}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.remarks && Boolean(errors.remarks)}
                    helperText={touched.remarks && errors.remarks}
                  />
                </Grid>
                <MDButton color="info" type="submit">
                  Submit -&gt;
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Create;
