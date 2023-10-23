import { Navbar, NavbarBrand } from "react-bootstrap";

const NavBar = () => {
  return (
    <nav>
      <Navbar className={`container`}>
        <NavbarBrand className={`fw-bolder`}>Personal Blog</NavbarBrand>
      </Navbar>
    </nav>
  );
};

export default NavBar;
