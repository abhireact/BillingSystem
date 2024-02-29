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
import Create from "./create";

import Cookies from "js-cookie";
const token = Cookies.get("token");

const View = () => {
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpenCreate = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; //End

  const handleDeleteData = async (row: any) => {
    console.log(row, "Delete Data");
    try {
      const deletedata = await axios.delete("", {
        data: {
          ...row,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (deletedata) {
        return window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  useEffect(() => {
    axios
      .get("http://10.0.20.121:8000/purchase_bill", {
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
      { Header: "Order Type", accessor: "purchase_type" },
      { Header: "Supplier Name", accessor: "supplier_name" },
      { Header: "State (PoS)", accessor: "place_of_supply" },
      { Header: "Date", accessor: "purchase_order_date" },

      { Header: "Total Amount", accessor: "total" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      purchase_type: <MDTypography variant="p">{row.purchase_type}</MDTypography>,
      place_of_supply: <MDTypography variant="p">{row.place_of_supply}</MDTypography>,
      supplier_name: <MDTypography variant="p">{row.supplier_name}</MDTypography>,
      purchase_order_date: <MDTypography variant="p">{row.purchase_order_date}</MDTypography>,

      total: <MDTypography variant="p">{row.total}</MDTypography>,

      action: (
        <MDTypography variant="p">
          <IconButton onClick={() => handleDeleteData(row)}>
            <DeleteIcon />
          </IconButton>
        </MDTypography>
      ),
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <MDTypography>Manage Purchases</MDTypography>
        <MDButton variant="contained" color="info" onClick={handleOpenCreate}>
          + Add
        </MDButton>

        <Dialog open={open} onClose={handleClose} maxWidth="xl">
          <Create setOpen={setOpen} />
        </Dialog>
      </Grid>
      <DataTable table={dataTableData} />
    </DashboardLayout>
  );
};

export default View;
