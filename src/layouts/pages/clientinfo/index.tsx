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
import Update from "./update";
import Cookies from "js-cookie";
const token = Cookies.get("token");

const View = () => {
  const [data, setData] = useState([]);
  //Start
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //End
  //Update Dialog Box Start
  const [editData, setEditData] = useState(null);
  const [openupdate, setOpenupdate] = useState(false);

  const handleOpenupdate = (index: number) => {
    setOpenupdate(true);
    const main_data = data[index];
    console.log(main_data, "maindata");

    setOpenupdate(true);
    setEditData(main_data);
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  }; //End

  const handleDeleteData = async (row: any) => {
    console.log(row, "Delete Data");
    try {
      const deletedata = await axios.delete("http://10.0.20.121:8000/add_group", {
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
      .get("http://10.0.20.121:8000/clients", {
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
      { Header: "Full Name", accessor: "fullname" },
      { Header: "Billing Address", accessor: "billing_address" },
      { Header: "Contact No", accessor: "contact_no" },
      { Header: "State", accessor: "state" },
      { Header: "GSTN", accessor: "gstin" },
      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      fullname: <MDTypography variant="p">{row.fullname}</MDTypography>,
      billing_address: <MDTypography variant="p">{row.billing_address}</MDTypography>,
      state: <MDTypography variant="p">{row.state}</MDTypography>,
      contact_no: <MDTypography variant="p">{row.contact_no}</MDTypography>,
      gstin: <MDTypography variant="p">{row.gstin}</MDTypography>,

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
      <MDTypography>Clients</MDTypography>
      <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
        <MDButton variant="contained" color="info" onClick={handleClickOpen}>
          + Add
        </MDButton>
        <Dialog open={open} onClose={handleClose} maxWidth="xl">
          <Create setOpen={setOpen} />
        </Dialog>
        <Dialog open={openupdate} onClose={handleCloseupdate} maxWidth="xl">
          <Update setOpenupdate={setOpenupdate} editData={editData} />
        </Dialog>
      </Grid>
      <DataTable table={dataTableData} />
    </DashboardLayout>
  );
};

export default View;
