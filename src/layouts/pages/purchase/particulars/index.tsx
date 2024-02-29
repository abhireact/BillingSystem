import React from "react";
import { Grid } from "@mui/material";
import MDInput from "components/MDInput";
import Autocomplete from "@mui/material/Autocomplete";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import { useSelector } from "react-redux";
import MDTypography from "components/MDTypography";
interface ParticularsFieldProps {
  values: any;
  handleChange: (event: React.ChangeEvent<any> | any) => void; // Update the type here

  setFieldValue: (field: string, value: any) => void;
}

const ParticularsField: React.FC<ParticularsFieldProps> = ({
  values,
  handleChange,
  setFieldValue,
}) => {
  const { productsInfo, unitsName } = useSelector(
    (state: { dataReducer: any }) => state.dataReducer
  );
  const handleQuantityChange = (e: any) => {
    setFieldValue("quantity", e.target.value);
    const amount =
      e.target.value * (parseInt(values.price) - parseInt(values.price) * (values.disc / 100));
    setFieldValue("amount", amount);
  };
  const handlePriceChange = (e: any) => {
    setFieldValue("price", e.target.value);
    const amount = e.target.value * parseInt(values.quantity);
    setFieldValue("amount", amount);
  };
  const handleDiscountChange = (e: any) => {
    setFieldValue("disc", e.target.value);
    if (e.target.value) {
      const amount =
        (parseInt(values.price) - (e.target.value / 100) * parseInt(values.price)) *
        values.quantity;
      setFieldValue("amount", amount);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item sm={3}>
        <Autocomplete
          sx={{ width: "100%" }}
          value={values.item_name}
          disableClearable
          onChange={(event, newValue: any) => {
            const productData = productsInfo.find((item: any) => item.product_name === newValue);
            console.log(productData, "product data");

            handleChange({
              target: { name: "item_name", value: newValue },
            });
            setFieldValue("price", productData.purchase_price);
            setFieldValue("tax", productData.igst);
            setFieldValue("cess", productData.cess);
            setFieldValue("unit", productData.unit);
            setFieldValue("disc", productData.sale_discount);
            setFieldValue("quantity", 1);
            if (productData.sale_discount) {
              let result =
                productData.purchase_price -
                (productData.sale_discount / 100) * productData.purchase_price;
              setFieldValue("amount", result);
            } else {
              setFieldValue("amount", productData.purchase_price);
            }
          }}
          options={productsInfo.map((products: { product_name: any }) => products.product_name)}
          renderInput={(params: any) => (
            <FormField
              label={<MDTypography variant="caption">Item Name*</MDTypography>}
              InputLabelProps={{ shrink: true }}
              name="item_name"
              onChange={handleChange}
              value={values.item_name}
              {...params}
              variant="outlined"
            />
          )}
        />
      </Grid>
      <Grid item sm={1} container>
        <MDInput
          variant="standard"
          type="number"
          name="quantity"
          label={<MDTypography variant="caption">Quantity*</MDTypography>}
          value={values.quantity}
          onChange={handleQuantityChange}
        />
      </Grid>
      <Grid item sm={2} container>
        <MDInput
          variant="standard"
          type="number"
          name="price"
          label={<MDTypography variant="caption">Purchase Price (₹)</MDTypography>}
          value={values.price}
          onChange={handlePriceChange}
        />
      </Grid>
      <Grid item sm={1}>
        <Autocomplete
          disableClearable
          value={values.unit}
          onChange={(event, newValue) => {
            handleChange({
              target: { name: "unit", value: newValue },
            });
          }}
          options={unitsName}
          renderInput={(params: any) => (
            <FormField
              label={<MDTypography variant="caption">Unit</MDTypography>}
              InputLabelProps={{ shrink: true }}
              name="unit"
              onChange={handleChange}
              value={values.unit}
              {...params}
              variant="outlined"
            />
          )}
        />
      </Grid>
      <Grid item sm={1.5}>
        <MDInput
          variant="standard"
          type="number"
          name="disc"
          label={<MDTypography variant="caption">Discount(%)</MDTypography>}
          value={values.disc}
          onChange={handleDiscountChange}
        />
      </Grid>
      <Grid item sm={1}>
        <MDInput
          variant="standard"
          type="number"
          name="tax"
          label={<MDTypography variant="caption">Tax (%)</MDTypography>}
          value={values.tax}
          onChange={handleChange}
        />
      </Grid>
      <Grid item sm={1}>
        <MDInput
          variant="standard"
          type="number"
          name="cess"
          label={<MDTypography variant="caption">CESS (%)</MDTypography>}
          value={values.cess}
          onChange={handleChange}
        />
      </Grid>
      <Grid item sm={1.5}>
        <MDInput
          variant="standard"
          type="number"
          name="amount"
          label={<MDTypography variant="caption">Amount (₹)</MDTypography>}
          value={values.amount}
        />
      </Grid>
    </Grid>
  );
};

export default ParticularsField;
