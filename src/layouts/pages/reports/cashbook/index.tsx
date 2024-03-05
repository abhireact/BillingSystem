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
import DataTable from "examples/Tables/DataTable";
import MDDropzone from "components/MDDropzone";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel, FormLabel, RadioGroup } from "@mui/material";
import { useState, useEffect } from "react";
import MDAvatar from "components/MDAvatar";
const token = Cookies.get("token");
import SearchIcon from "@mui/icons-material/Search";
import { message } from "antd";
import Checkbox from "@mui/material/Checkbox";

let initialValues = {
  to_date: "",
  from_date: "",
};

const Create = () => {
  const [data, setData] = useState([]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,

    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const handleCreateSubmit = async () => {
        let sendData = values;

        await axios
          .post("http://10.0.20.121:8000/accounts/cashbook", sendData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setData(response.data);
              message.success("Fetched Data successfully");
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
      { Header: "Particular", accessor: "particular" },

      { Header: "Date", accessor: "date" },
      { Header: "Credit", accessor: "credit" },
      { Header: "Debit", accessor: "debit" },
    ],

    rows: data.map((row: any, index: any) => ({
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
            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                <MDTypography variant="body1" fontWeight="bold">
                  Cash Book
                </MDTypography>
              </Grid>

              <Grid item sm={3}>
                <MDTypography variant="body2">From Date .: </MDTypography>
              </Grid>
              <Grid item sm={3}>
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

              <Grid item sm={3}>
                <MDTypography variant="body2">To Date .: </MDTypography>
              </Grid>
              <Grid item sm={3}>
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
      </form>
    </DashboardLayout>
  );
};

export default Create;
