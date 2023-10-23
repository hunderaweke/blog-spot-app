import NavBar from "/src/components/NavBar";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
