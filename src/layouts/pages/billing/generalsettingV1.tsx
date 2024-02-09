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
import { useState, useEffect } from "react";
import MDAvatar from "components/MDAvatar";
const token = Cookies.get("token");
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";


let initialValues = {
  secure_access: "",
  state: "",
};
const inventory = ["Serial No.", "Batch No.", "Bar Code", "Pan No."];

const Test = () => {
  const [formdata, setFormdata] = useState("create");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response.data);
          initialValues = response.data[0];
          setFormdata("edit");
        }
      } catch (error) {
        // console.error(error);
        console.log("Data not found");
      }
    };
    fetchData();
  });
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      // validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
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

      const response = await axios.post("", sendData, {
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

      const response = await axios.put(``, sendData, {
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
              <MDBox px={2}>
                <Paper>
                  <Grid
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <MDTypography variant="body1" fontWeight="bold" px={2}>
                      Default Unit/UoM
                    </MDTypography>
                  </Grid>
                  <Grid sm={12}>
                    <MDTypography variant="subtitle2" px={2}>
                      Select default unit of measurement which suits your business most
                    </MDTypography>
                  </Grid>
                  <CardActions>
                    <Autocomplete
                      sx={{ width: "50%", paddingLeft: 2 }}
                      onChange={(event, value) => {
                        handleChange({
                          target: { name: "state", value },
                        });
                      }}
                      options={inventory}
                      renderInput={(params: any) => (
                        <FormField
                          label="identifier"
                          InputLabelProps={{ shrink: true }}
                          name="state"
                          onChange={handleChange}
                          value={values.state}
                          {...params}
                        />
                      )}
                    />
                  </CardActions>
                </Paper>
              </MDBox>
            </Grid>

            <Grid sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox px={2}>
                <Paper>
                  <Grid
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <MDTypography variant="body1" fontWeight="bold" px={2}>
                      Inventory Identifier
                    </MDTypography>
                  </Grid>
                  <Grid sm={12}>
                    <MDTypography variant="subtitle2" px={2}>
                      Select type of number used in inventory identification
                    </MDTypography>
                  </Grid>
                  <CardActions>
                    <Autocomplete
                      sx={{ width: "50%", paddingLeft: 2 }}
                      onChange={(event, value) => {
                        handleChange({
                          target: { name: "state", value },
                        });
                      }}
                      options={inventory}
                      renderInput={(params: any) => (
                        <FormField
                          label="identifier"
                          InputLabelProps={{ shrink: true }}
                          name="state"
                          onChange={handleChange}
                          value={values.state}
                          {...params}
                          variant="outlined"
                        />
                      )}
                    />
                  </CardActions>
                </Paper>
              </MDBox>
            </Grid>
            <Grid sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox px={2}>
                <Paper>
                  <Grid
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <MDTypography variant="body1" fontWeight="bold" px={2}>
                      Inventory Valuation
                    </MDTypography>
                  </Grid>
                  <Grid sm={12}>
                    <MDTypography variant="subtitle2" px={2}>
                      Select Inventory valuation method as per your accounting practice
                    </MDTypography>
                  </Grid>
                  <CardActions>
                    <Autocomplete
                      sx={{ width: "50%", paddingLeft: 2 }}
                      onChange={(event, value) => {
                        handleChange({
                          target: { name: "state", value },
                        });
                      }}
                      options={inventory}
                      renderInput={(params: any) => (
                        <FormField
                          label="identifier"
                          InputLabelProps={{ shrink: true }}
                          name="state"
                          onChange={handleChange}
                          value={values.state}
                          {...params}
                          variant="outlined"
                        />
                      )}
                    />
                  </CardActions>
                </Paper>
              </MDBox>
            </Grid>
            <Grid sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper>
                  <Grid
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <MDTypography variant="body1" fontWeight="bold" px={2}>
                      Enable Manufacturing
                    </MDTypography>
                    <Checkbox
                      checked={values.secure_access.includes("Fullday")}
                      onChange={handleChange}
                      name="secure_access"
                      value="Fullday"
                      color="primary"
                    />
                  </Grid>
                  <Grid sm={12}>
                    <MDTypography variant="subtitle2" p={2}>
                      Allows you to create bill of materials and add assembled items in stock
                    </MDTypography>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>
            <Grid sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper>
                  <Grid
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <MDTypography variant="body1" fontWeight="bold" px={2}>
                      Secure Access
                    </MDTypography>
                    <Checkbox
                      checked={values.secure_access.includes("Fullday")}
                      onChange={handleChange}
                      name="secure_access"
                      value="Fullday"
                    />
                  </Grid>
                  <Grid sm={12}>
                    <MDTypography variant="subtitle2" p={2}>
                      Ask for username and password at the startup
                    </MDTypography>
                  </Grid>
                  <Grid sm={12} px={2} sx={{ display: "flex", justifyContent: "flex-end" }}></Grid>
                </Paper>
              </MDBox>
            </Grid>
            <Grid sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Paper>
                  <Grid
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <MDTypography variant="body1" fontWeight="bold" px={2}>
                      Negative Stock Sale
                    </MDTypography>
                    <Checkbox
                      checked={values.secure_access.includes("Fullday")}
                      onChange={handleChange}
                      name="secure_access"
                      value="Fullday"
                    />
                  </Grid>
                  <Grid sm={12}>
                    <MDTypography variant="subtitle2" p={2}>
                      Allows you to do billing in case of negative stock
                    </MDTypography>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>
            <Grid sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={1}>
                <Paper>
                  <Grid
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <MDTypography variant="body1" fontWeight="bold" px={2}>
                      Allows Task Confirmation
                    </MDTypography>
                    <Checkbox
                      checked={values.secure_access.includes("Fullday")}
                      onChange={handleChange}
                      name="secure_access"
                      value="Fullday"
                    />
                  </Grid>
                  <Grid sm={12}>
                    <MDTypography variant="subtitle2" px={2} pb={1}>
                      Allows application to ask for confirmation before completing important tasks
                    </MDTypography>
                  </Grid>
                </Paper>
              </MDBox>
            </Grid>

            <Grid sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2} pt={1}>
                <Paper>
                  <Grid
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <MDTypography variant="body1" fontWeight="bold" px={2}>
                      Price Catalog
                    </MDTypography>

                    <Checkbox
                      checked={values.secure_access.includes("Fullday")}
                      onChange={handleChange}
                      name="secure_access"
                      value="Fullday"
                    />
                  </Grid>
                  <Grid sm={12}>
                    <MDTypography variant="subtitle2" px={2} pb={1}>
                      Allows you to add multiple sale prices for the same item
                    </MDTypography>
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
