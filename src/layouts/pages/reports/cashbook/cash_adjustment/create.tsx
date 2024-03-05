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
import { FormControlLabel, FormLabel, InputLabel, MenuItem, RadioGroup } from "@mui/material";
import { useState, useEffect } from "react";
import MDAvatar from "components/MDAvatar";
const token = Cookies.get("token");
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { message } from "antd";
import Checkbox from "@mui/material/Checkbox";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const paymode = ["Cash", "UPI", "Bank Transfer"];
let initialValues = {
  amount: "",

  remarks: "",

  adjustment_type: "",
  date: "",
};
const validationSchema = yup.object().shape({
  date: yup.date().max(new Date(), "only today date").required("required"),
});

const Create = (props: any) => {
  const { setOpen, editData, method } = props;
  const [itemsoption, setItemsoption] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://10.0.20.121:8000/products", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response.data, "my groups data");
          setItemsoption(response.data);
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

      adjustment_type: editData.adjustment_type,
      date: editData.date,
    };
  } else {
    initialValues = {
      amount: "",

      remarks: "",

      adjustment_type: "",
      date: "",
    };
  }
  // Conditionally set the validation schema
  const validationSchemaConditional = method === "POST" ? validationSchema : yup.object();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: validationSchemaConditional,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const handleCreateSubmit = async () => {
        let sendData = values;

        await axios
          .post("http://10.0.20.121:8000/stockadjust", sendData, {
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
          .put("http://10.0.20.121:8000/expenses", sendData, {
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
            <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
              <MDTypography variant="body2" fontWeight="bold" py={2}>
                Cash Adjustment
              </MDTypography>
            </Grid>
            <Grid sm={6} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox>
                <Grid sm={12}>
                  <MDTypography variant="body2">Type :</MDTypography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      row
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            checked={values.adjustment_type.includes("DEBIT")}
                            onChange={handleChange}
                            name="adjustment_type"
                            value="DEBIT"
                          />
                        }
                        label={<MDTypography variant="body2">Debit</MDTypography>}
                      />
                      <FormControlLabel
                        // value="male"
                        control={
                          <Radio
                            checked={values.adjustment_type.includes("CREDIT")}
                            onChange={handleChange}
                            name="adjustment_type"
                            value="CREDIT"
                          />
                        }
                        label={<MDTypography variant="body2"> Credit</MDTypography>}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item sm={12} py={2}>
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
                    rows={3}
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
