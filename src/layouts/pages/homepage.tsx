import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import {
  fetchProducts,
  fetchUnitsName,
  fetchSuppliers,
  fetchCompany,
  fetchClientAccount,
} from "./reducer/dataSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const homepage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchClientAccount());
    dispatch(fetchUnitsName());
    dispatch(fetchSuppliers());
    dispatch(fetchCompany());
  }, []);
  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <div> Homepage:for redux api calling</div>
      </DashboardLayout>
    </div>
  );
};
export default homepage;
