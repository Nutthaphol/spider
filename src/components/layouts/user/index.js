import React from "react";
import AppbarMenu from "../../pages/shared/appbarMenu";

const UserMenu = () => {
  const user = [
    {
      path: "/home",
      label: "Home",
    },
  ];

  return <AppbarMenu data={user} />;
};

export default UserMenu;
