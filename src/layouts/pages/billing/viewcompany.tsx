import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Cookies from "js-cookie";
import MDTypography from "components/MDTypography";
const token = Cookies.get("token");
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
const Company = () => {
  const [data, setData] = useState({
    businessname: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    email: "",
    phone: "",
    pan_no: "",
    gstin: "",
    taxation_method: "",
    company_logo: "",
    signature: "",
  });
  const [image1, setImage1] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://10.0.20.121:8000/company", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setImage1(response.data.company_logo);
        console.log("Data", response.data.company_logo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid
        container
        spacing={2}
        style={{ padding: "20px" }}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <img
          src={image1}
          alt="Company Logo"
          style={{
            maxHeight: "300px",
            objectFit: "cover",
            marginRight: "auto",
          }}
        />
        <Grid item xs={12} sm={12} sx={{ display: "flex", justifyContent: "center" }}>
          <MDTypography variant="h4">{data?.businessname}</MDTypography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <MDTypography variant="body1" fontWeight="bold">
            Address &nbsp;
            <LocationCityIcon />
          </MDTypography>
          <MDTypography variant="body2">{data?.address}</MDTypography>
          <MDTypography variant="body2">
            {data?.pincode} {data?.city} {data?.state}
          </MDTypography>
          <MDTypography variant="body2">{data?.country}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDTypography variant="body1" fontWeight="bold">
            Other Methods
          </MDTypography>
          <MDTypography variant="body2">Pan No.&nbsp; {data?.pan_no}</MDTypography>
          <MDTypography variant="body2">GSTIN &nbsp; {data?.gstin}</MDTypography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <MDTypography variant="body1" fontWeight="bold">
            Contact Info &nbsp; <SupportAgentIcon />
          </MDTypography>
          <MDTypography variant="body2" color="info">
            {data?.phone} &nbsp;
            <ContactPhoneIcon />
          </MDTypography>
          <MDTypography variant="body2" color="info">
            {data?.email} &nbsp;
            <EmailIcon />
          </MDTypography>
        </Grid>

        <img
          src={data.signature}
          alt="Company Logo"
          style={{
            maxHeight: "300px",
            objectFit: "cover",
            marginLeft: "auto",
          }}
        />
      </Grid>
    </DashboardLayout>
  );
};

export default Company;
