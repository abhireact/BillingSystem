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

  const [method, setMethod] = useState("POST");
  //Start
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setMethod("POST");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //End
  //Update Dialog Box Start
  const [editData, setEditData] = useState(null);

  const handleOpenupdate = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");
    setMethod("PUT");
    setEditData(main_data);
    setOpen(true);
  };

  const handleDeleteData = async (row: any) => {
    console.log(row, "Delete Data");
    try {
      const deletedata = await axios.delete("http://10.0.20.121:8000/service", {
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
      .get("http://10.0.20.121:8000/services", {
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
      { Header: "Item Name", accessor: "service_name" },

      { Header: "Print Name", accessor: "print_name" },
      { Header: "HSN ", accessor: "hsn_sac_code" },
      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      service_name: <MDTypography variant="p">{row.service_name}</MDTypography>,

      print_name: <MDTypography variant="p">{row.print_name}</MDTypography>,
      hsn_sac_code: <MDTypography variant="p">{row.hsn_sac_code}</MDTypography>,
      action: (
        <MDTypography variant="p">
          <IconButton
            onClick={() => {
              handleOpenupdate(index);
              console.log(index);
            }}
          >
            <CreateRoundedIcon />
          </IconButton>
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
      <MDTypography>Services</MDTypography>
      <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
        <MDButton variant="contained" color="info" onClick={handleOpen}>
          + Add
        </MDButton>

        <Dialog open={open} onClose={handleClose}>
          <Create setOpen={setOpen} editData={editData} method={method} />
        </Dialog>
      </Grid>
      <DataTable table={dataTableData} />
    </DashboardLayout>
  );
};

export default View;
