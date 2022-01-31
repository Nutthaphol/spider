import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

const AdminMenu = [
  {
    label: "Admin",
    menuKey: "admin",
    endIconOpen: <ArrowDropDown />,
    endIconClose: <ArrowDropUp />,
    admin: true,
    collapse: [
      {
        label: "Manage",
        path: "/admin/Manage",
        listKey: "manage",
      },
      {
        label: "Form",
        path: "/admin/Form",
        listKey: "form",
      },
    ],
  },
];

export default AdminMenu;
