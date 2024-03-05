import MDInput from "components/MDInput";
import DataTable from "examples/Tables/DataTable";
import { useFormik } from "formik";
import axios from "axios";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Cookies from "js-cookie";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import FormControl from "@mui/material/FormControl";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import {
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select,
} from "@mui/material";
import { useState, useEffect } from "react";
import MDAvatar from "components/MDAvatar";
const token = Cookies.get("token");
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { message } from "antd";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";

let initialValues = {
  supplier_name: "",
  to_date: "",
  from_date: "",
};

const Report = () => {
  const { suppliersInfo } = useSelector((state: { dataReducer: any }) => state.dataReducer);

  const [data, setData] = useState([]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,

    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const handleCreateSubmit = async () => {
        let sendData = values;

        await axios
          .post("http://10.0.20.121:8000/account/suppliers", sendData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              console.log("data", response.data);
              setData(response.data);
              action.resetForm();
            }
            if (response.status === 404) {
              message.error("No Data Found");
            }
          })
          .catch((error) => {
            console.error(error);
            message.error("Error Occurred");
          });
      };

      handleCreateSubmit();
    },
  });
  const dataTableData = {
    columns: [
      { Header: "Particular", accessor: "particular" },

      { Header: "Date", accessor: "date" },
      { Header: "Credit", accessor: "credit" },
      { Header: "Debit", accessor: "debit" },
    ],

    rows: data.map((row, index) => ({
      particular: <MDTypography variant="p">{row.particular}</MDTypography>,
      date: <MDTypography variant="p">{row.date}</MDTypography>,
      credit: <MDTypography variant="p">{row.credit}</MDTypography>,
      debit: <MDTypography variant="p">{row.debit}</MDTypography>,
    })),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container>
              <Grid item sm={12}>
                <MDTypography variant="body1" fontWeight="bold" py={2}>
                  Supplier Payment History
                </MDTypography>
              </Grid>

              <Grid item sm={4}>
                {" "}
                <Autocomplete
                  sx={{ width: "70%" }}
                  value={values.supplier_name}
                  disableClearable
                  onChange={(event, newValue: any) => {
                    handleChange({
                      target: { name: "supplier_name", value: newValue },
                    });
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

              <Grid item sm={3} sx={{ display: "flex", justifyContent: "center" }} mt={2}>
                <MDInput
                  variant="standard"
                  type="date"
                  name="from_date"
                  value={values.from_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.from_date && Boolean(errors.from_date)}
                  helperText={touched.from_date && errors.from_date}
                />
              </Grid>
              <Grid item sm={1} sx={{ display: "flex", justifyContent: "center" }} mt={2}>
                <MDTypography variant="body2"> to</MDTypography>
              </Grid>
              <Grid item sm={3} sx={{ display: "flex", justifyContent: "center" }} mt={2}>
                <MDInput
                  variant="standard"
                  type="date"
                  name="to_date"
                  value={values.to_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.to_date && Boolean(errors.to_date)}
                  helperText={touched.to_date && errors.to_date}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <MDButton color="info" variant="contained" type="submit">
                  Search&nbsp;
                  <SearchIcon />
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
          <DataTable table={dataTableData} entriesPerPage={false} />
        </Card>
        <MDBox p={4}></MDBox>
      </form>
    </DashboardLayout>
  );
};

export default Report;
