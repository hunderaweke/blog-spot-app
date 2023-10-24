import { Navbar, NavbarBrand } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
const NavBar = () => {
  const [userData, setUserData] = useState([]);
  useEffect(()=>{
    axios.get()
  },[])
  return (
    <nav>
      <Navbar className={`container`}>
        <NavbarBrand className={`fw-bolder`}>Personal Blog</NavbarBrand>
      </Navbar>
    </nav>
  );
};

export default NavBar;
