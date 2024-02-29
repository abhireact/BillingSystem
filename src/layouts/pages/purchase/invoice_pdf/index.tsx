import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import axios from "axios";
import Grid from "@mui/material";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const Invoice = () => {
  const [companyimage, setCompanyImage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.20.121:8000/company", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response.data);
          console.log(response.data.company_logo, "company logo link");
          setCompanyImage(response.data.company_logo);
        }
      } catch (error) {
        console.log("Data not found", error);
      }
    };
    fetchData();
  }, []);
  return (
    <Box sx={{ width: "80%", margin: "auto", padding: "30px", border: "1px solid #ccc" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
        <img src={companyimage} alt="company logo" />
        <Box sx={{ width: "50%", textAlign: "right" }}>
          <Typography variant="body2">Mindcom Consulting</Typography>
          <Typography variant="body2">Banaswadi Bengluru</Typography>
          <Typography variant="body2">Contact: 8115620702</Typography>
          <Typography variant="body2">Email: hariommindcom123@gmail.com</Typography>
          <Typography variant="body2">GSTIN:</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
        <Box sx={{ width: "50%", textAlign: "left" }}>
          <Typography variant="h6">Bill To:</Typography>
          <Typography variant="body2">Hariom Ojha</Typography>
          <Typography variant="body2">Chandika Pahara Mirzapur</Typography>
          <Typography variant="body2">Contact: 8115620702</Typography>
          <Typography variant="body2">PoS: 09-Uttar Pradesh</Typography>
          <Typography variant="body2">A/c Balance: ₹610.00 Dr</Typography>
        </Box>
        <Box>
          <Typography variant="h6"></Typography>

          <Typography variant="body2">Invoice No. : GST/FEB/014</Typography>
          <Typography variant="body2">Date: 26-02-2024</Typography>
          <Typography variant="body2">A/c Balance: ₹610.00 Dr</Typography>
        </Box>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell>PRODUCT/SERVICE NAME</TableCell>
            <TableCell>HSN/SAC</TableCell>
            <TableCell>QTY</TableCell>
            <TableCell>MRP</TableCell>
            <TableCell>UNIT PRICE</TableCell>
            <TableCell>GST</TableCell>
            <TableCell>AMOUNT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Hospital Billing</TableCell>
            <TableCell>1</TableCell>
            <TableCell>NOS</TableCell>
            <TableCell>₹500.00</TableCell>
            <TableCell>₹470.00</TableCell>
            <TableCell>16%</TableCell>
            <TableCell>₹548.80</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Box sx={{ marginTop: "30px" }}>
        <Typography variant="h6">Invoice Summary</Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Delivery Terms</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Qty</TableCell>
              <TableCell>1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sub Total</TableCell>
              <TableCell>₹470.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Add IGST (16%)</TableCell>
              <TableCell>₹78.80</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Invoice;
