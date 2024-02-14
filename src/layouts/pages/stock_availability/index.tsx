import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import Dialog from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import axios from "axios";

import Cookies from "js-cookie";
const token = Cookies.get("token");

const View = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://10.0.20.121:8000/inventory/availability", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const dataTableData = {
    columns: [
      { Header: "S.NO.", accessor: "s_no", width: "20%" },
      { Header: "Product Name", accessor: "product_name" },
      { Header: "Product Code", accessor: "item_code" },

      { Header: "Current Stocks", accessor: "stock" },
      { Header: "Valuation", accessor: "valuation" },
    ],

    rows: data.map((row, index) => ({
      s_no: <MDTypography variant="p">{index + 1}</MDTypography>,
      item_code: <MDTypography variant="p">{row.item_code}</MDTypography>,
      product_name: <MDTypography variant="p">{row.product_name}</MDTypography>,
      stock: <MDTypography variant="p">{row.stock}</MDTypography>,
      valuation: <MDTypography variant="p">{row.valuation}</MDTypography>,
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography>Stocks Availability</MDTypography>
      <Grid sx={{ display: "flex", justifyContent: "flex-end" }}></Grid>
      <DataTable table={dataTableData} />
    </DashboardLayout>
  );
};

export default View;
