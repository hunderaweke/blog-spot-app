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
    axios.get(`http://10.240.69.158:8000/api/user/${userId}/`).then((res) => {
      setUserData(res.data);
    });
  }, [userId]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("public_id");
    localStorage.removeItem("logged_in");
    navigate("/");
    window.location.reload();
  };
  return (
    <nav className="w-100 shadow-sm mb-5 ">
      <Container>
        <Navbar expand="lg">
          <Nav.Link href="/">
            <NavbarBrand className={``}>Personal Blog</NavbarBrand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="w-100 d-flex justify-content-end ">
              {loggedIn ? (
                <div className="d-flex gap-4 align-items-center">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                  <label htmlFor="button">New Blog</label>
                  <button
                    name="button"
                    onClick={() => {
                      navigate("/newblog");
                    }}
                    className="fw-bold btn btn-outline-dark "
                  >
                    +
                  </button>
                  <label className="h-100 pt-2 mx-3">{userData.username}</label>
                  <img
                    src={userData.avatar}
                    className={`${styles.avatar} `}
                    alt=""
                  />
                </div>
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
