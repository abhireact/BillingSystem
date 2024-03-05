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

let initialValues = {
  product_name: "",
  to_date: "",
  from_date: "",
};

const Create = () => {
  const [productsoption, setProductsoption] = useState([]);
  const [data, setData] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://10.0.20.121:8000/products", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data, "products data");
        setProductsoption(response.data);
      }
    } catch (error) {
      // console.error(error);
      console.log("Data not found");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,

    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const handleCreateSubmit = async () => {
        let sendData = values;

        await axios
          .post("http://10.0.20.121:8000/inventory/itemregister", sendData, {
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
          })
          .catch((error) => {
            console.error(error);
            message.error("Error Occured");
          });
      };

      handleCreateSubmit();
      action.resetForm();
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
                  Item Register
                </MDTypography>
              </Grid>

              <Grid item sm={4}>
                <FormControl sx={{ minWidth: "70%" }}>
                  <InputLabel>Choose Product</InputLabel>
                  <Select
                    label="choose group"
                    value={values.product_name}
                    onChange={handleChange}
                    autoWidth={true}
                    name="product_name"
                    variant="standard"
                  >
                    {productsoption.map((products, index) => (
                      <MenuItem key={index} value={products.product_name}>
                        {products.product_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={3} sx={{ display: "flex", justifyContent: "center" }}>
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
              <Grid item sm={1} sx={{ display: "flex", justifyContent: "center" }}>
                <MDTypography variant="body2"> to</MDTypography>
              </Grid>
              <Grid item sm={3} sx={{ display: "flex", justifyContent: "center" }}>
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
                  Search
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

export default Create;
