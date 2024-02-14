import React from "react";
import "./template.css";
import { usePDF } from "react-to-pdf";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
const InvoiceTemplate = (props: any) => {
  const { toPDF, targetRef } = usePDF({ filename: "demo.pdf" });
  const { setOpen, templatedata } = props;
  const handleClose = () => {
    setOpen(false);
  };
  console.log("dialog template name", templatedata);
  let classname = "table-header";
  if (templatedata == "A4 Style1") {
    classname = "table-header-blue";
  } else {
    classname = "table-header";
  }

  return (
    <div>
      <MDBox p={4}>
        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
          <MDTypography color="primary"> &nbsp; {templatedata} PDF format : Demo Page</MDTypography>
          <MDButton onClick={() => toPDF()} color="info" variant="outlined">
            Download as <PictureAsPdfIcon fontSize="medium" />
          </MDButton>
        </Grid>

        <div id="invoice-container" ref={targetRef}>
          <div className={classname}>
            <div className="table-row">
              <div className="table-cell text-center">
                <span className="bold">TAX INVOICE</span>
              </div>
            </div>
            <div className="table-row">
              <div className="table-cell">
                <span className="bold">Hitech Digital World (P) Limited</span>
                <br />
                GST-19-20-10702
                <br />
                Nagpur Maharashtr
                <br />
                <b>GSTIN</b> STAADCH50048129
              </div>
              <div className="table-cell text-right">
                Invoice No.: <span className="bold">INV-0001</span>
                <br />
                Date: <span className="bold">2024-02-13</span>
              </div>
            </div>
            <div className="table-row">
              <div className="table-cell">
                <b>To</b>.:&nbsp; Ahash Trading Company
              </div>
            </div>
          </div>
          <div className="table-body">
            <table width="100%">
              <thead className="thead">
                <tr>
                  <th className={`${classname}-cell`}>PRODUCT/SERVICE</th>
                  <th className={`${classname}-cell`}>UNIT PRICE</th>
                  <th className={`${classname}-cell`}>DISC</th>
                  <th className={`${classname}-cell`}>QTY</th>
                  <th className={`${classname}-cell`}>AMOUNT</th>
                </tr>
              </thead>
              <tbody className={`${classname}-body`}>
                <tr>
                  <td className="paddingtenleft">Data Backup</td>
                  <td className="text-center">$50.00</td>
                  <td className="text-center">15%</td>
                  <td className="text-center">1</td>
                  <td className="text-center">$42.50</td>
                </tr>
                <tr>
                  <td className="paddingtenleft">BSW LED BULB VELLOW(WIPED)</td>
                  <td className="text-center">$10.00</td>
                  <td className="text-center">12%</td>
                  <td className="text-center">1</td>
                  <td className="text-center">$8.80</td>
                </tr>
                <tr>
                  <td className="paddingtenleft">ACC CEMENT SK</td>
                  <td className="text-center">$20.00</td>
                  <td className="text-center">20%</td>
                  <td className="text-center"> 1</td>
                  <td className="text-center">$16.00</td>
                </tr>
                <tr>
                  <td className="paddingtenleft"> Dull Mouse MS116</td>
                  <td className="text-center">$30.00</td>
                  <td></td>
                  <td className="text-center">1</td>
                  <td className="text-center">$30.00</td>
                </tr>
                <tr>
                  <td className="paddingtenleft">FLEXIBLE PIPE LOOSE</td>
                  <td className="text-center">$15.00</td>
                  <td className="text-center">10%</td>
                  <td className="text-center">2</td>
                  <td className="text-center">$27.00</td>
                </tr>
                <tr>
                  <td className="paddingtenleft">Computer Repair</td>
                  <td className="text-center">$100.00</td>
                  <td className="text-center">18%</td>
                  <td className="text-center">1</td>
                  <td className="text-center">$82.00</td>
                </tr>
                <tr>
                  <td className="paddingtenleft">RAM</td>
                  <td className="text-center">$50.00</td>
                  <td></td>
                  <td className="text-center">2</td>
                  <td className="text-center">$100.00</td>
                </tr>
                <tr>
                  <td className="paddingtenleft">0.5W LED BULB RED (WIPRD)</td>
                  <td className="text-center">$3.00</td>
                  <td className="text-center">12%</td>
                  <td className="text-center">1</td>
                  <td className="text-center">$2.64</td>
                </tr>
                <tr>
                  <td className="paddingtenleft">1.00 SQ.MM. POTCAR WIRE LOOSE YELLOW</td>
                  <td className="text-center">$5.00</td>
                  <td></td>
                  <td className="text-center">3</td>
                  <td className="text-center">$15.00</td>
                </tr>
                <tr>
                  <td className="paddingtenleft">101 Compass Tuner Cartridge</td>
                  <td className="text-center">$635.30</td>
                  <td></td>
                  <td className="text-center">1</td>
                  <td className="text-center">$635.30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </MDBox>
    </div>
  );
};

export default InvoiceTemplate;
