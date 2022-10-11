import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

import { styled } from "@nextui-org/react";

export const Box = styled("div", {
  boxSizing: "border-box",
});

const MainLayout: React.FC = () => {
  return (
    <Box
      css={{
        maxW: "100%",
      }}
    >
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default MainLayout;
