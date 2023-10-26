import { Nav, Navbar, NavbarBrand, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import styles from "../styles/navbar.module.css";
const NavBar = () => {
  const [userData, setUserData] = useState([]);
  const userId = localStorage.getItem("public_id");
  let loggedIn = localStorage.getItem("logged_in");
  loggedIn = loggedIn == "true";
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/user/${userId}/`).then((res) => {
      setUserData(res.data);
    });
  }, [userId]);
  const navigate = useNavigate();
  return (
    <nav className="w-100 shadow-sm mb-5 ">
      <Container>
        <Navbar expand="lg">
          <NavbarBrand className={``}>Personal Blog</NavbarBrand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="w-100 d-flex justify-content-end ">
              {loggedIn ? (
                <>
                  <p className="h-100 pt-2 mx-3">{userData.username}</p>
                  <img
                    src={userData.avatar}
                    className={`${styles.avatar} `}
                    alt=""
                  />
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="btn btn-outline-dark mx-4"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="btn btn-outline-dark "
                  >
                    Signup
                  </button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </nav>
  );
};

export default NavBar;
