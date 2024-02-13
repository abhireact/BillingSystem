import React from "react";
import "./template.css";
import { usePDF } from "react-to-pdf";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
const InvoiceTemplate = (props: any) => {
  const { toPDF, targetRef } = usePDF({ filename: "demo.pdf" });
  const { setOpen, templatedata } = props;
  const handleClose = () => {
    setOpen(false);
  };
  console.log("dialog template name", templatedata);
  let classname = "table-header";
  if (templatedata == "A4 trend") {
    classname = "table-header-blue";
  } else {
    classname = "table-header";
  }

  return (
    <div ref={targetRef}>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <MDButton onClick={() => toPDF()} color="info" variant="outlined">
          Download as <PictureAsPdfIcon fontSize="medium" />
        </MDButton>
      </Grid>

      <div id="invoice-container">
        <div className={classname}>
          <div className="table-row">
            <div className="table-cell text-center">
              <span className="bold">TAR INVOICER</span>
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
              GSTIN STAADCH50048129
            </div>
            <div className="table-cell text-right">
              Invoice No.: <span className="bold">INV-0001</span>
              <br />
              Date: <span className="bold">2024-02-13</span>
            </div>
          </div>
          <div className="table-row">
            <div className="table-cell">
              <b>To</b> &nbsp; Ahash Trading Company
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
            <tbody>
              <tr>
                <td className="italic">Data Backup</td>
                <td>$50.00</td>
                <td>15%</td>
                <td>1</td>
                <td>$42.50</td>
              </tr>
              <tr>
                <td>BSW LED BULB VELLOW(WIPED)</td>
                <td>$10.00</td>
                <td>12%</td>
                <td>1</td>
                <td>$8.80</td>
              </tr>
              <tr>
                <td>ACC CEMENT SK</td>
                <td>$20.00</td>
                <td>20%</td>
                <td>1</td>
                <td>$16.00</td>
              </tr>
              <tr>
                <td>Dull Mouse MS116</td>
                <td>$30.00</td>
                <td></td>
                <td>1</td>
                <td>$30.00</td>
              </tr>
              <tr>
                <td>FLEXIBLE PIPE LOOSE</td>
                <td>$15.00</td>
                <td>10%</td>
                <td>2</td>
                <td>$27.00</td>
              </tr>
              <tr>
                <td>Computer Repair</td>
                <td>$100.00</td>
                <td>18%</td>
                <td>1</td>
                <td>$82.00</td>
              </tr>
              <tr>
                <td>RAM</td>
                <td>$50.00</td>
                <td></td>
                <td>2</td>
                <td>$100.00</td>
              </tr>
              <tr>
                <td>0.5W LED BULB RED (WIPRD)</td>
                <td>$3.00</td>
                <td>12%</td>
                <td>1</td>
                <td>$2.64</td>
              </tr>
              <tr>
                <td>1.00 SQ.MM. POTCAR WIRE LOOSE YELLOW</td>
                <td>$5.00</td>
                <td></td>
                <td>3</td>
                <td>$15.00</td>
              </tr>
              <tr>
                <td>101 Compass Tuner Cartridge</td>
                <td>$635.30</td>
                <td></td>
                <td>1</td>
                <td>$635.30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
