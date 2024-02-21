// import DataTable from "examples/Tables/DataTable";
// import MDTypography from "components/MDTypography";
// import Dialog from "@mui/material/Dialog";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import MDButton from "components/MDButton";
// import Grid from "@mui/material/Grid";
// import IconButton from "@mui/material/IconButton";
// import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useState, useEffect } from "react";
// import axios from "axios";

// import Cookies from "js-cookie";
// const token = Cookies.get("token");

// const paymentOut = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://10.0.20.121:8000/paymentout", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setData(response.data);

//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);
//   const dataTableData = {
//     columns: [
//       { Header: "Supplier Name", accessor: "supplier_name" },
//       { Header: "Date", accessor: "date" },
//       { Header: "Transaction ID", accessor: "transaction_id" },
//       { Header: "Amount", accessor: "amount" },
//       { Header: "Remarks", accessor: "remarks" },
//     ],

//     rows: data.map((row, index) => ({
//       date: <MDTypography variant="p">{row.date}</MDTypography>,
//       supplier_name: <MDTypography variant="p">{row.supplier_name}</MDTypography>,
//       transaction_id: <MDTypography variant="p">{row.transaction_id}</MDTypography>,
//       amount: <MDTypography variant="p">{row.amount}</MDTypography>,
//       remarks: <MDTypography variant="p">{row.remarks}</MDTypography>,
//     })),
//   };
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDTypography>Payment Out</MDTypography>
//       <Grid sx={{ display: "flex", justifyContent: "flex-end" }}></Grid>
//       <DataTable table={dataTableData} />
//     </DashboardLayout>
//   );
// };

// export default paymentOut;
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

const paymentOut = () => {
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
      const deletedata = await axios.delete("http://10.0.20.121:8000/products", {
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
      .get("http://10.0.20.121:8000/paymentout", {
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
      { Header: "Supplier Name", accessor: "supplier_name" },
      { Header: "Date", accessor: "date" },
      { Header: "Transaction ID", accessor: "transaction_id" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Remarks", accessor: "remarks" },
    ],

    rows: data.map((row, index) => ({
      date: <MDTypography variant="p">{row.date}</MDTypography>,
      supplier_name: <MDTypography variant="p">{row.supplier_name}</MDTypography>,
      transaction_id: <MDTypography variant="p">{row.transaction_id}</MDTypography>,
      amount: <MDTypography variant="p">{row.amount}</MDTypography>,
      remarks: <MDTypography variant="p">{row.remarks}</MDTypography>,
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <MDTypography>Payment Out </MDTypography>
        <MDButton variant="contained" color="info" onClick={handleOpenCreate}>
          + Add
        </MDButton>

        <Dialog open={open} onClose={handleClose} maxWidth="xl">
          <Create setOpen={setOpen} editData={editData} method={method} />
        </Dialog>
      </Grid>
      <DataTable table={dataTableData} />
    </DashboardLayout>
  );
};

export default paymentOut;
