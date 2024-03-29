/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 PRO React layouts
import Analytics from "layouts/dashboards/analytics";
import Sales from "layouts/dashboards/sales";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import AllProjects from "layouts/pages/profile/all-projects";
import NewUser from "layouts/pages/users/new-user";
import Settings from "layouts/pages/account/settings";
import Billing from "layouts/pages/account/billing";
import Invoice from "layouts/pages/account/invoice";
import Timeline from "layouts/pages/projects/timeline";
import PricingPage from "layouts/pages/pricing-page";
import Widgets from "layouts/pages/widgets";
import RTL from "layouts/pages/rtl";
import Charts from "layouts/pages/charts";
import Notifications from "layouts/pages/notifications";
import Kanban from "layouts/applications/kanban";
import Wizard from "layouts/applications/wizard";
import DataTables from "layouts/applications/data-tables";
import Calendar from "layouts/applications/calendar";
import NewProduct from "layouts/ecommerce/products/new-product";
import EditProduct from "layouts/ecommerce/products/edit-product";
import ProductPage from "layouts/ecommerce/products/product-page";
import OrderList from "layouts/ecommerce/orders/order-list";
import OrderDetails from "layouts/ecommerce/orders/order-details";
import SignInBasic from "layouts/authentication/sign-in/basic";
import SignInCover from "layouts/authentication/sign-in/cover";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignUpCover from "layouts/authentication/sign-up/cover";
import ResetCover from "layouts/authentication/reset-password/cover";

// Material Dashboard 2 PRO React TS components
import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import profilePicture from "assets/images/team-3.jpg";
import CompanySetup from "layouts/pages/billing/viewcompany";
import CreateCompany from "layouts/pages/companysetup/companysetup";
import ClientInfo from "layouts/pages/clientinfo";
import GeneralSetting from "layouts/pages/billing/generalsetting";
import TaxationSetting from "layouts/pages/billing/taxationsetting";
import Login from "layouts/pages/login";
import GroupMaster from "layouts/pages/group_master";
import BrandMaster from "layouts/pages/brand_master";
import AddService from "layouts/pages/addservices";
import AddProduct from "layouts/pages/addproduct";
import UnitMaster from "layouts/pages/unit_master";
import ExpenseMaster from "layouts/pages/expense_master";
import AddExpense from "layouts/pages/addexpense";
import GeneralConfig from "layouts/pages/printing/generalconfig";
import DocumentConfig from "layouts/pages/printing/documentconfig";
import DocumentHeader from "layouts/pages/printing/documentheaders";
import DocumentTerm from "layouts/pages/printing/documentterms";
import LLStocks from "layouts/pages/low_level_stocks";
import StockAvailability from "layouts/pages/stock_availability";
import Supplier from "layouts/pages/supplier";
import Test from "layouts/pages/test";
import TestPage from "layouts/pages/practice";

import Cashbook from "layouts/pages/reports/cashbook";
import Clients from "layouts/pages/reports/clients";
import Suppliers from "layouts/pages/reports/supplier";
import ItemRegister from "layouts/pages/reports/item_register";

import StockAdjust from "layouts/pages/purchase/stock_adjustment";
import PurchaseReturn from "layouts/pages/purchase/purchase_return";
import PurchaseOrder from "layouts/pages/purchase/purchase_order";
import PurchaseBill from "layouts/pages/purchase/purchase_bill";
import InvoicePDF from "layouts/pages/purchase/invoice_pdf";
import PaymentOut from "layouts/pages/payment_out";
import PaymentIn from "layouts/pages/payment_in";
import Reduxpage from "layouts/pages/homepage";
const routes = [
  {
    type: "collapse",
    name: "Brooklyn Alice",
    key: "brooklyn-alice",
    icon: <MDAvatar src={profilePicture} alt="Brooklyn Alice" size="sm" />,
    collapse: [
      {
        name: "My Profile",
        key: "my-profile",
        route: "/pages/profile/profile-overview",
        component: <ProfileOverview />,
      },
      {
        name: "Settings",
        key: "profile-settings",
        route: "/pages/account/settings",
        component: <Settings />,
      },
      {
        name: "Logout",
        key: "logout",
        route: "/authentication/sign-in/basic",
        component: <SignInBasic />,
      },
    ],
  },
  { type: "divider", key: "divider-0" },

  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Pages",
    key: "pages",
    icon: <Icon fontSize="medium">image</Icon>,
    collapse: [
      {
        name: "INTERNSHIP",
        key: "intern",
        collapse: [
          {
            name: "Redux Page",
            key: "reduxpage",
            route: "/pages/intern/reduxpage",
            component: <Reduxpage />,
          },

          {
            name: "Test Code",
            key: "test",
            route: "/pages/intern/test",
            component: <Test />,
          },
          {
            name: "Test Practice",
            key: "testpage",
            route: "/pages/intern/testpage",
            component: <TestPage />,
          },
          {
            name: "Invoice PDF",
            key: "invoicepdf",
            route: "/pages/intern/invoicepdf",
            component: <InvoicePDF />,
          },
          {
            name: "Purchase Bill",
            key: "purchasebill",
            route: "/pages/intern/purchasebill",
            component: <PurchaseBill />,
          },
          {
            name: "Purchase Return",
            key: "purchasereturn",
            route: "/pages/intern/purchasereturn",
            component: <PurchaseReturn />,
          },
          {
            name: "Purchase Order",
            key: "purchaseorder",
            route: "/pages/intern/purchaseorder",
            component: <PurchaseOrder />,
          },
          {
            name: "Payment Out",
            key: "paymentout",
            route: "/pages/intern/paymentout",
            component: <PaymentOut />,
          },
          {
            name: "Payment In",
            key: "paymentin",
            route: "/pages/intern/paymentin",
            component: <PaymentIn />,
          },
          {
            name: "Stock Adjustment",
            key: "stockadjust",
            route: "/pages/intern/stockadjust",
            component: <StockAdjust />,
          },
          {
            name: "Item Register",
            key: "itemregister",
            route: "/pages/intern/itemregister",
            component: <ItemRegister />,
          },
          {
            name: "Cashbook",
            key: "cashbook",
            route: "/pages/intern/cashbook",
            component: <Cashbook />,
          },
          {
            name: "Supplier Information",
            key: "suppliers",
            route: "/pages/intern/suppliers",
            component: <Supplier />,
          },
          {
            name: "Document Headers",
            key: "documentheaders",
            route: "/pages/intern/documentheaders",
            component: <DocumentHeader />,
          },
          {
            name: "Document Terms",
            key: "documentterms",
            route: "/pages/intern/documentterms",
            component: <DocumentTerm />,
          },
          {
            name: "Document Configuration",
            key: "documentconfig",
            route: "/pages/intern/documentconfig",
            component: <DocumentConfig />,
          },
          {
            name: "General Configuration",
            key: "generalconfig",
            route: "/pages/intern/generalconfig",
            component: <GeneralConfig />,
          },
          {
            name: "Add Expense",
            key: "addexpense",
            route: "/pages/intern/addexpense",
            component: <AddExpense />,
          },
          {
            name: "Expense Master",
            key: "expensemaster",
            route: "/pages/intern/expensemaster",
            component: <ExpenseMaster />,
          },
          {
            name: "Unit Master",
            key: "unitmaster",
            route: "/pages/intern/unitmaster",
            component: <UnitMaster />,
          },
          {
            name: "Low Level Stocks",
            key: "lowlevelstocks",
            route: "/pages/intern/lowlevelstocks",
            component: <LLStocks />,
          },
          {
            name: "Stock Availablity",
            key: "stockavailability",
            route: "/pages/intern/stockavailability",
            component: <StockAvailability />,
          },
          {
            name: "Add Product",
            key: "addproduct",
            route: "/pages/intern/addproduct",
            component: <AddProduct />,
          },
          {
            name: "Add Service",
            key: "addservice",
            route: "/pages/intern/addservice",
            component: <AddService />,
          },
          {
            name: "Group Master",
            key: "groupmaster",
            route: "/pages/intern/groupmaster",
            component: <GroupMaster />,
          },
          {
            name: "Brand Master",
            key: "brands",
            route: "/pages/intern/brands",
            component: <BrandMaster />,
          },
          {
            name: "Taxation Setting",
            key: "taxationsetting",
            route: "/pages/intern/taxationsetting",
            component: <TaxationSetting />,
          },
          {
            name: "General Setting",
            key: "generalsetting",
            route: "/pages/intern/generalsetting",
            component: <GeneralSetting />,
          },
          {
            name: "Company Setup",
            key: "companysetup",
            route: "/pages/intern/companysetup",
            component: <CompanySetup />,
          },
          {
            name: " Create Company Setup",
            key: "createcompany",
            route: "/pages/intern/createcompany",
            component: <CreateCompany />,
          },
          {
            name: "Client Info",
            key: "clientinfo",
            route: "/pages/intern/clientinfo",
            component: <ClientInfo />,
          },
          { name: "Login Page", key: "Login", route: "/pages/intern/login", component: <Login /> },
        ],
      },
      {
        name: "Reports",
        key: "report",
        collapse: [
          {
            name: "Cashbook",
            key: "cashbook",
            route: "/pages/report/cashbook",
            component: <Cashbook />,
          },
          {
            name: "Item Register",
            key: "itemregister",
            route: "/pages/report/item_register",
            component: <ItemRegister />,
          },
          {
            name: "Supplier",
            key: "supplier",
            route: "/pages/report/supplier",
            component: <Suppliers />,
          },
          {
            name: "Client",
            key: "client",
            route: "/pages/report/client",
            component: <Clients />,
          },
        ],
      },
    ],
  },
  {
    type: "collapse",
    name: "Applications",
    key: "applications",
    icon: <Icon fontSize="medium">apps</Icon>,
    collapse: [
      {
        name: "Kanban",
        key: "kanban",
        route: "/applications/kanban",
        component: <Kanban />,
      },
      {
        name: "Wizard",
        key: "wizard",
        route: "/applications/wizard",
        component: <Wizard />,
      },
      {
        name: "Data Tables",
        key: "data-tables",
        route: "/applications/data-tables",
        component: <DataTables />,
      },
      {
        name: "Calendar",
        key: "calendar",
        route: "/applications/calendar",
        component: <Calendar />,
      },
    ],
  },

  { type: "divider", key: "divider-1" },
  { type: "title", title: "Docs", key: "title-docs" },
  {
    type: "collapse",
    name: "Basic",
    key: "basic",
    icon: <Icon fontSize="medium">upcoming</Icon>,
    collapse: [
      {
        name: "Getting Started",
        key: "getting-started",
        collapse: [
          {
            name: "Overview",
            key: "overview",
            href: "https://www.creative-tim.com/learning-lab/react/overview/material-dashboard/",
          },
          {
            name: "License",
            key: "license",
            href: "https://www.creative-tim.com/learning-lab/react/license/material-dashboard/",
          },
          {
            name: "Quick Start",
            key: "quick-start",
            href: "https://www.creative-tim.com/learning-lab/react/quick-start/material-dashboard/",
          },
          {
            name: "Build Tools",
            key: "build-tools",
            href: "https://www.creative-tim.com/learning-lab/react/build-tools/material-dashboard/",
          },
        ],
      },
      {
        name: "Foundation",
        key: "foundation",
        collapse: [
          {
            name: "Colors",
            key: "colors",
            href: "https://www.creative-tim.com/learning-lab/react/colors/material-dashboard/",
          },
          {
            name: "Grid",
            key: "grid",
            href: "https://www.creative-tim.com/learning-lab/react/grid/material-dashboard/",
          },
          {
            name: "Typography",
            key: "base-typography",
            href: "https://www.creative-tim.com/learning-lab/react/base-typography/material-dashboard/",
          },
          {
            name: "Borders",
            key: "borders",
            href: "https://www.creative-tim.com/learning-lab/react/borders/material-dashboard/",
          },
          {
            name: "Box Shadows",
            key: "box-shadows",
            href: "https://www.creative-tim.com/learning-lab/react/box-shadows/material-dashboard/",
          },
          {
            name: "Functions",
            key: "functions",
            href: "https://www.creative-tim.com/learning-lab/react/functions/material-dashboard/",
          },
          {
            name: "Routing System",
            key: "routing-system",
            href: "https://www.creative-tim.com/learning-lab/react/routing-system/material-dashboard/",
          },
        ],
      },
    ],
  },
  {
    type: "collapse",
    name: "Components",
    key: "components",
    icon: <Icon fontSize="medium">view_in_ar</Icon>,
    collapse: [
      {
        name: "Alerts",
        key: "alerts",
        href: "https://www.creative-tim.com/learning-lab/react/alerts/material-dashboard/",
      },
      {
        name: "Avatar",
        key: "avatar",
        href: "https://www.creative-tim.com/learning-lab/react/avatar/material-dashboard/",
      },
      {
        name: "Badge",
        key: "badge",
        href: "https://www.creative-tim.com/learning-lab/react/badge/material-dashboard/",
      },
      {
        name: "Badge Dot",
        key: "badge-dot",
        href: "https://www.creative-tim.com/learning-lab/react/badge-dot/material-dashboard/",
      },
      {
        name: "Box",
        key: "box",
        href: "https://www.creative-tim.com/learning-lab/react/box/material-dashboard/",
      },
      {
        name: "Buttons",
        key: "buttons",
        href: "https://www.creative-tim.com/learning-lab/react/buttons/material-dashboard/",
      },
      {
        name: "Date Picker",
        key: "date-picker",
        href: "https://www.creative-tim.com/learning-lab/react/datepicker/material-dashboard/",
      },
      {
        name: "Dropzone",
        key: "dropzone",
        href: "https://www.creative-tim.com/learning-lab/react/dropzone/material-dashboard/",
      },
      {
        name: "Editor",
        key: "editor",
        href: "https://www.creative-tim.com/learning-lab/react/quill/material-dashboard/",
      },
      {
        name: "Input",
        key: "input",
        href: "https://www.creative-tim.com/learning-lab/react/input/material-dashboard/",
      },
      {
        name: "Pagination",
        key: "pagination",
        href: "https://www.creative-tim.com/learning-lab/react/pagination/material-dashboard/",
      },
      {
        name: "Progress",
        key: "progress",
        href: "https://www.creative-tim.com/learning-lab/react/progress/material-dashboard/",
      },
      {
        name: "Snackbar",
        key: "snackbar",
        href: "https://www.creative-tim.com/learning-lab/react/snackbar/material-dashboard/",
      },
      {
        name: "Social Button",
        key: "social-button",
        href: "https://www.creative-tim.com/learning-lab/react/social-buttons/material-dashboard/",
      },
      {
        name: "Typography",
        key: "typography",
        href: "https://www.creative-tim.com/learning-lab/react/typography/material-dashboard/",
      },
    ],
  },
];

export default routes;
