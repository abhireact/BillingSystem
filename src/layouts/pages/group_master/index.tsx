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
  const [method, setMethod] = useState("Post");

  //Update Dialog Box Start
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenUpdate = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");
    setMethod("PUT");

    setEditData(main_data);
    setOpen(true);
  };
  const handleOpenCreate = () => {
    setMethod("POST");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      .get("http://10.0.20.121:8000/add_group", {
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
      { Header: "Group Name", accessor: "group_name" },

      { Header: "HSN or SAC Code", accessor: "hsn_or_sac" },
      { Header: "CGST", accessor: "cgst" },
      { Header: "SGST", accessor: "sgst" },
      { Header: "IGST", accessor: "igst" },
      { Header: "CESS", accessor: "cess" },
      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      group_name: <MDTypography variant="p">{row.group_name}</MDTypography>,
      hsn_or_sac: <MDTypography variant="p">{row.hsn_or_sac}</MDTypography>,
      cgst: <MDTypography variant="p">{row.cgst}</MDTypography>,
      sgst: <MDTypography variant="p">{row.sgst}</MDTypography>,
      igst: <MDTypography variant="p">{row.igst}</MDTypography>,
      cess: <MDTypography variant="p">{row.cess}</MDTypography>,
      action: (
        <MDTypography variant="p">
          <IconButton
            onClick={() => {
              handleOpenUpdate(index);
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

      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <MDTypography>Group Master</MDTypography>
        <MDButton variant="contained" color="info" onClick={handleOpenCreate}>
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
