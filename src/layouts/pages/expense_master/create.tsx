import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";

import { useFormik } from "formik";

import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
let initialValues: {
  expense_name: "";
};
const Update = (props: any) => {
  const { setOpen, editData, method } = props;
  const handleClose = () => {
    setOpen(false);
  };
  if (method === "PUT") {
    initialValues = {
      expense_name: editData.expense_name,
    };
  } else {
    initialValues = { expense_name: "" };
  }

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values, action) => {
      const handleCreateSubmit = async () => {
        const sendData = values;
        axios
          .post("http://10.0.20.121:8000/expensemaster", sendData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              message.success("Created Successfully");
            }
          })
          .catch((error) => {
            message.error(error.response.data?.detail || "error occured");
          });
      };
      const handleUpdateSubmit = async () => {
        const sendData = { ...values, old_expense_name: editData.expense_name };
        axios
          .put("http://10.0.20.121:8000/expensemaster", sendData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              message.success("Updated Successfully");
            }
          })
          .catch((error) => {
            message.error(error.response.data?.detail || "error occured");
          });
      };
      if (method === "PUT") {
        handleUpdateSubmit();
      } else {
        handleCreateSubmit();
      }
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container spacing={2}>
          <Grid item sm={4.1}>
            <MDTypography variant="body2" fontWeight="bold">
              Expense Name
            </MDTypography>
          </Grid>
          <Grid item sm={4.1}>
            <MDInput
              variant="standard"
              name="expense_name"
              value={values.expense_name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.expense_name && errors.expense_name}
              mb={10}
              mt={10}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Grid item>
                <MDButton
                  color="info"
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Save
                </MDButton>
              </Grid>
              <Grid item ml={2}>
                <MDButton
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Update;
