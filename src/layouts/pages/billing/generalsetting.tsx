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
  secure_access: false,
  negative_stock_sale: false,
  allow_task_confirmation: false,
  default_unit: "",
  inventory_identifier: "",
  inventory_valuation: "",
  enable_manufacturing: false,
  price_catalog: false,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.20.121:8000/generalsettings", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response.data);
          initialValues = response.data;
          setFormdata("edit");
        }
      } catch (error) {
        // console.error(error);
        console.log("Data not found");
      }
    };
    fetchData();
  }, []);

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
            <Grid sm={12} py={2}>
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
                General Settings
              </MDTypography>
            </Grid>

            <Grid sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper>
                  <Grid container spacing={1} p={2}>
                    <Grid sm={12}>
                      {" "}
                      <MDTypography variant="body2" fontWeight="bold" px={2}>
                        Default Unit/UoM
                      </MDTypography>
                    </Grid>
                    <Grid
                      sm={9}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRight: "2px solid #3873E8",
                      }}
                    >
                      {" "}
                      <MDTypography variant="caption" p={2}>
                        Select default unit of measurement which suits your business most
                      </MDTypography>
                    </Grid>
                    <Grid sm={3} py={2}>
                      <FormControl sx={{ m: 1, minWidth: 70 }}>
                        {/* <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel> */}
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={values.default_unit}
                          onChange={handleChange}
                          autoWidth={true}
                          name="default_unit"
                        >
                          <MenuItem value="">
                            <em>Choose default unit</em>
                          </MenuItem>
                          {unitOptions.map((unit) => (
                            <MenuItem key={unit} value={unit}>
                              {unit}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>
            <Grid sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper>
                  <Grid container spacing={1} p={2}>
                    <Grid sm={12}>
                      {" "}
                      <MDTypography variant="body2" fontWeight="bold" px={2}>
                        Inventory Valuation
                      </MDTypography>
                    </Grid>
                    <Grid
                      sm={9}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRight: "2px solid #3873E8",
                      }}
                    >
                      {" "}
                      <MDTypography variant="caption" p={2}>
                        Select Inventory valuation method as per your accounting practice
                      </MDTypography>
                    </Grid>
                    <Grid sm={3} py={2}>
                      <FormControl sx={{ m: 1, minWidth: 70 }}>
                        {/* <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel> */}
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={values.inventory_valuation}
                          onChange={handleChange}
                          autoWidth={true}
                          name="inventory_valuation"
                        >
                          <MenuItem value="">
                            <em>chooose inventory valuation </em>
                          </MenuItem>
                          <MenuItem value={"AVCO"}>AVCO</MenuItem>
                          <MenuItem value={"FIFO"}>FIFO</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>
            <Grid sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper style={{ height: "100%" }}>
                  <Grid container spacing={1} p={2}>
                    <Grid sm={12}>
                      {" "}
                      <MDTypography variant="body2" fontWeight="bold" px={2}>
                        Inventory Identifier
                      </MDTypography>
                    </Grid>
                    <Grid
                      sm={9}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRight: "2px solid #3873E8",
                      }}
                    >
                      {" "}
                      <MDTypography variant="caption" p={2}>
                        Select type of number used in inventory identification
                      </MDTypography>
                    </Grid>
                    <Grid sm={3} py={2}>
                      <FormControl sx={{ m: 1, minWidth: 70 }}>
                        {/* <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel> */}
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={values.inventory_identifier}
                          onChange={handleChange}
                          autoWidth={true}
                          name="inventory_identifier"
                        >
                          <MenuItem value="">
                            <em>chooose inventory identifier </em>
                          </MenuItem>
                          <MenuItem value={"hi"}>Bar Code</MenuItem>
                          <MenuItem value={"hello"}>Part No.</MenuItem>
                          <MenuItem value={22}>Batch No.</MenuItem>
                          <MenuItem value={22}>QR Code</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>

            <Grid sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper style={{ height: "100%" }}>
                  <Grid container spacing={1} p={2}>
                    <Grid sm={12}>
                      {" "}
                      <MDTypography variant="body2" fontWeight="bold" px={2}>
                        Secure Access
                      </MDTypography>
                    </Grid>
                    <Grid
                      sm={9}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRight: "2px solid #3873E8",
                      }}
                    >
                      {" "}
                      <MDTypography variant="caption" p={2}>
                        Ask for username and password at the startup
                      </MDTypography>
                    </Grid>
                    <Grid sm={3} p={2}>
                      <Checkbox
                        checked={values.secure_access}
                        onChange={handleChange}
                        name="secure_access"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>
            <Grid sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper style={{ height: "100%" }}>
                  <Grid container spacing={1} p={2}>
                    <Grid sm={12}>
                      {" "}
                      <MDTypography variant="body2" fontWeight="bold" px={2}>
                        Negative Stock Sale
                      </MDTypography>
                    </Grid>
                    <Grid
                      sm={9}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRight: "2px solid #3873E8",
                      }}
                    >
                      {" "}
                      <MDTypography variant="caption" p={2}>
                        Allows you to do billing in case of negative stock
                      </MDTypography>
                    </Grid>
                    <Grid sm={3} p={2}>
                      <Checkbox
                        checked={values.negative_stock_sale}
                        onChange={handleChange}
                        name="negative_stock_sale"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>

            <Grid sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper>
                  <Grid container spacing={1} p={2}>
                    <Grid sm={12}>
                      {" "}
                      <MDTypography variant="body2" fontWeight="bold" px={2}>
                        Allows Task Confirmation
                      </MDTypography>
                    </Grid>
                    <Grid
                      sm={9}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRight: "2px solid #3873E8",
                      }}
                    >
                      {" "}
                      <MDTypography variant="caption" p={2}>
                        Implement user confirmation for critical actions in the application.
                      </MDTypography>
                    </Grid>
                    <Grid sm={3} p={2}>
                      <Checkbox
                        checked={values.allow_task_confirmation}
                        onChange={handleChange}
                        name="allow_task_confirmation"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>

            <Grid sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox px={2}>
                <Paper>
                  <Grid container spacing={1} p={2}>
                    <Grid sm={12}>
                      {" "}
                      <MDTypography variant="body2" fontWeight="bold" px={2}>
                        Enable Manufacturing
                      </MDTypography>
                    </Grid>
                    <Grid
                      sm={9}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRight: "2px solid #3873E8",
                      }}
                    >
                      {" "}
                      <MDTypography variant="caption" p={2}>
                        Allows you to create bill of materials and add assembled items in stock
                      </MDTypography>
                    </Grid>
                    <Grid sm={3} p={2}>
                      <Checkbox
                        checked={values.enable_manufacturing}
                        onChange={handleChange}
                        name="enable_manufacturing"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>
            <Grid sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox px={2}>
                <Paper>
                  <Grid container spacing={1} p={2}>
                    <Grid sm={12}>
                      {" "}
                      <MDTypography variant="body2" fontWeight="bold" px={2}>
                        Price Catalog
                      </MDTypography>
                    </Grid>
                    <Grid
                      sm={9}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRight: "2px solid #3873E8",
                      }}
                    >
                      {" "}
                      <MDTypography variant="caption" p={2}>
                        Allows you to add multiple sale prices for the same item
                      </MDTypography>
                    </Grid>
                    <Grid sm={3} p={2}>
                      <Checkbox
                        checked={values.price_catalog}
                        onChange={handleChange}
                        name="price_catalog"
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
