import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Paper from "@mui/material/Paper";
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
import { useCallback, useEffect, useRef, useState } from "react";
import MDAvatar from "components/MDAvatar";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const token = Cookies.get("token");

//import {ChangeEvent} from "react";

// const validationSchema = yup.object({
//   username: yup.string().min(2).max(25).required("Please enter your name"),

//   password: yup
//     .string()
//     .min(8, "Password should be of minimum 8 characters length")
//     .required("Password is required"),
// });

let initialValues = {
  print_preview: false,
  payment_receipt: false,
  print_pos_bill: false,
  print_pos_token: false,

  client_balance: false,
  amount_paid: false,
  mrp_discount: false,
  staff_name: false,
  mrp_column: false,
  mobile_number: false,
  price_item_description: false,
};
function debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;

    const later = function () {
      timeout = null as any;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}
const Test = () => {
  const [formdata, setFormdata] = useState("create");
  const tosubmit = useRef(false);
  const debouncedSubmit = useCallback(
    debounce((submitFunction) => submitFunction(), 1000),
    []
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://10.0.20.121:8000/generalsettings", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (response.status === 200) {
  //         console.log(response.data);
  //         initialValues = response.data;
  //         setFormdata("edit");
  //       }
  //     } catch (error) {
  //       // console.error(error);
  //       console.log("Data not found");
  //     }
  //   };
  //   fetchData();
  // }, []);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    // validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async () => {
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

      const response = await axios.post("http://10.0.20.121:8000/generalsettings", sendData, {
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

      const response = await axios.put(`http://10.0.20.121:8000/generalsettings`, sendData, {
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
  useEffect(() => {
    if (tosubmit.current) {
      // Trigger handleSubmit whenever form values change
      debouncedSubmit(() => handleSubmit());
    } else {
      // Set tosubmit.current to true to allow the effect to run on subsequent changes
      tosubmit.current = true;
    }
  }, [values, tosubmit.current]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <div>
          <Grid container>
            <Grid item sm={12} py={2}>
              <MDTypography
                variant="h5"
                color="info"
                px={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  borderBottom: "2px solid #3873E8",
                }}
              >
                Document Configuration
              </MDTypography>
            </Grid>

            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        Client Balance
                      </MDTypography>
                    </Grid>
                    <Grid
                      item
                      sm={9}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRight: "2px solid #3873E8",
                      }}
                    >
                      {" "}
                      <MDTypography variant="caption" p={2}>
                        Show client account balance on printed documents.
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} py={2}>
                      <Checkbox
                        checked={values.client_balance}
                        onChange={handleChange}
                        name="client_balance"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>

            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        MRP Based Discount
                      </MDTypography>
                    </Grid>
                    <Grid
                      item
                      sm={9}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRight: "2px solid #3873E8",
                      }}
                    >
                      {" "}
                      <MDTypography variant="caption" p={2}>
                        Show MRP based total discount on PoS invoices/bills.
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} p={2}>
                      <Checkbox
                        checked={values.mrp_discount}
                        onChange={handleChange}
                        name="mrp_discount"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>
            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        Staff Name
                      </MDTypography>
                    </Grid>
                    <Grid
                      item
                      sm={9}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRight: "2px solid #3873E8",
                      }}
                    >
                      {" "}
                      <MDTypography variant="caption" p={2}>
                        Show staff name on printed documents.
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} p={2}>
                      <Checkbox
                        checked={values.staff_name}
                        onChange={handleChange}
                        name="staff_name"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>
            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        MRP Column
                      </MDTypography>
                    </Grid>
                    <Grid
                      item
                      sm={9}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRight: "2px solid #3873E8",
                      }}
                    >
                      {" "}
                      <MDTypography variant="caption" p={2}>
                        Show MRP column on printed documents.
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} p={2}>
                      <Checkbox
                        checked={values.mrp_column}
                        onChange={handleChange}
                        name="mrp_column"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>
            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        Mobile Numbers
                      </MDTypography>
                    </Grid>
                    <Grid
                      item
                      sm={9}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRight: "2px solid #3873E8",
                      }}
                    >
                      {" "}
                      <MDTypography variant="caption" p={2}>
                        Show mobile numbers on printed invoice documents.
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} p={2}>
                      <Checkbox
                        checked={values.mobile_number}
                        onChange={handleChange}
                        name="mobile_number"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>
            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        Print Item Description
                      </MDTypography>
                    </Grid>
                    <Grid
                      item
                      sm={9}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRight: "2px solid #3873E8",
                      }}
                    >
                      {" "}
                      <MDTypography variant="caption" p={2}>
                        Show item description on printed documents.
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} p={2}>
                      <Checkbox
                        checked={values.price_item_description}
                        onChange={handleChange}
                        name="price_item_description"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>
            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        Amount Paid
                      </MDTypography>
                    </Grid>
                    <Grid
                      item
                      sm={9}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRight: "2px solid #3873E8",
                      }}
                    >
                      {" "}
                      <MDTypography variant="caption" p={2}>
                        Show amount paid and balance on printed documents.
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} py={2}>
                      <Checkbox
                        checked={values.amount_paid}
                        onChange={handleChange}
                        name="amount_paid"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>
          </Grid>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default Test;
