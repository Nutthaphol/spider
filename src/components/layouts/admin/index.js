import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import React from "react";
import AppbarMenu from "../../pages/shared/appbarMenu";

const AdminMenu = () => {
  const admin = [
    {
      label: "Admin",
      menuKey: "admin",
      endIconOpen: <ArrowDropDown />,
      endIconClose: <ArrowDropUp />,
      collapse: [
        {
          label: "Manage",
          path: "/admin/Manage",
          menuKey: "manage",
        },
        {
          label: "Form",
          path: "/admin/Form",
          menuKey: "form",
        },
      ],
    },
  ];
  return <AppbarMenu data={admin} />;
};

export default AdminMenu;
