import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Cookies from "js-cookie";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import FormControl from "@mui/material/FormControl";
import { useCallback, useEffect, useRef, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import Template from "./template";
const token = Cookies.get("token");

//import {ChangeEvent} from "react";

// const validationSchema = yup.object({
//   username: yup.string().min(2).max(25).required("Please enter your name"),

//   password: yup
//     .string()
//     .min(8, "Password should be of minimum 8 characters length")
//     .required("Password is required"),
// });
const unitOptions = ["A4 trend", "A5 trend"];
const engineoptions = ["TSC", "Zebra"];
let initialValues = {
  template: "A4 trend",
  print_preview: false,
  watermark: "",
  payment_receipt: false,
  barcode_print_engine: "TSC",
  authorized_signatory: "",
  print_pos_bill: false,
  print_pos_token: false,
  invoice_print_cash: "",
  invoice_print_client: "",
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
const View = () => {
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

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
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

  const [templatepdf, setTemplatepdf] = useState();

  //Start
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //End
  const handleSelectChange = (e: any) => {
    const template_name = e.target.value;

    setFieldValue("template", template_name);

    setTemplatepdf(template_name);
    setOpen(true);
    console.log("Template Name", template_name);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <Template setOpen={setOpen} templatedata={templatepdf} />
      </Dialog>
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
                General Configuration
              </MDTypography>
            </Grid>

            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Card>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        Printing Template
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
                        Select template you prefer to printing invoices/bill
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} py={2}>
                      <FormControl sx={{ minWidth: "90%" }}>
                        {/* <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel> */}
                        <Select
                          variant="standard"
                          value={values.template}
                          onChange={handleSelectChange}
                          autoWidth={true}
                          name="template"
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
                </Card>
              </MDBox>
            </Grid>

            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Card>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        Print Review
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
                        Show print and preview while creating invoice
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} py={2}>
                      <Checkbox
                        checked={values.print_preview}
                        onChange={handleChange}
                        name="print_preview"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            </Grid>
            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Card>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        Watermark
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
                        Test to be shown as watermark in printed documents
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} py={2}>
                      <FormControl sx={{ m: 1, minWidth: "70%" }}>
                        <MDInput
                          variant="standard"
                          name="watermark"
                          label=""
                          value={values.watermark}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            </Grid>
            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Card>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        Payment Receipt
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
                        Generate payment receipt on saving client payments
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} py={2}>
                      <Checkbox
                        checked={values.payment_receipt}
                        onChange={handleChange}
                        name="payment_receipt"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            </Grid>

            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Card>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        Barcode Print Engine
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
                        Select print engine for printing barcodes/labels
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} py={2}>
                      <FormControl sx={{ m: 1, minWidth: "70%" }}>
                        {/* <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel> */}
                        <Select
                          variant="standard"
                          value={values.barcode_print_engine}
                          onChange={handleChange}
                          autoWidth={true}
                          name="barcode_print_engine"
                        >
                          <MenuItem value="">
                            <em>Choose default unit</em>
                          </MenuItem>
                          {engineoptions.map((unit) => (
                            <MenuItem key={unit} value={unit}>
                              {unit}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            </Grid>
            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Card>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        Authorized Signatory
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
                        Test to be shown in place authorized signatory
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} py={2}>
                      <FormControl sx={{ m: 1, minWidth: "90%" }}>
                        <MDInput
                          variant="standard"
                          name="authorized_signatory"
                          label=""
                          value={values.authorized_signatory}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            </Grid>
            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Card>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        Print Pos Invoice/Bill
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
                        Allow printing of PoS Invoice/Bill
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} p={2}>
                      <Checkbox
                        checked={values.print_pos_bill}
                        onChange={handleChange}
                        name="print_pos_bill"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            </Grid>
            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Card>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        Print Pos Token
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
                        Allow printing PoS thermal token receipt for internal use
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} p={2}>
                      <Checkbox
                        checked={values.print_pos_token}
                        onChange={handleChange}
                        name="print_pos_token"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            </Grid>
            <Grid item sm={4} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox p={2}>
                <Card>
                  <Grid container spacing={1} p={2}>
                    <Grid item sm={12}>
                      {" "}
                      <MDTypography variant="caption" fontWeight="bold" px={2}>
                        Invoice Print Count
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
                        Enter no. of copies to be printed of cash and client invoices
                      </MDTypography>
                    </Grid>
                    <Grid item sm={3} p={2}>
                      <FormControl sx={{ minWidth: "90%" }}>
                        <MDInput
                          variant="standard"
                          name="invoice_print_cash"
                          label=""
                          value={values.invoice_print_cash}
                          onChange={handleChange}
                        />
                        <MDInput
                          variant="standard"
                          name="invoice_print_client"
                          label=""
                          value={values.invoice_print_client}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default View;
