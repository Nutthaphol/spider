import React from "react";
import AppbarMenu from "../../pages/shared/appbarMenu";

const UserMenu = () => {
  const user = [
    {
      path: "/home",
      label: "Home",
    },
    {
      path: "/about",
      label: "About",
    },
    {
      path: "/contact",
      label: "Contact",
    },
  ];

  return <AppbarMenu data={user} />;
};

export default UserMenu;
