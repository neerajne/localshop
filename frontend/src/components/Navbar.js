import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert"; // MUI Alert for better styling
import "./navbar.css";
import { useShop } from "../context/ShopContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, setSearchShopResult, searchTerm, setSearchTerm } =
    useShop();
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("info"); // Snackbar severity (info, success, warning, error)

  const onSearchHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    // Check if search term is empty
    if (searchTerm.trim() === "") {
      setSnackbarMessage("Please enter a search term.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return; // Stop here if the search term is empty
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/shop/search?searchTerm=${searchTerm}`
      );
      const result = response.data;
      
      if (result.length === 0) {
        setSnackbarMessage("No shops found for your search.");
        setSnackbarSeverity("info");
        setSnackbarOpen(true);
      } else {
        console.log(result);
        setSearchShopResult(result);
        navigate("/search/shop/enter"); // Uncomment if you want to navigate on successful search
      }
    } catch (error) {
      setSnackbarMessage("Failed to fetch shops. Please try again later.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setSearchTerm(""); // Clear the search term after handling
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="sticky-top">
      <nav
        className="navbar navbar-expand-lg sticky-top"
        style={{ backgroundColor: "#ADD8E6" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <div>
              <p className="fs-3 fw-bolder">LOCALSHOP</p>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active px-3"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active px-3" to="/categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle px-3"
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "black" }}
                >
                  Account
                </Link>
                <ul className="dropdown-menu">
                  {!user ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/signup">
                          SignUp
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/register/shop">
                          Profile
                        </Link>
                      </li>

                      {user.role && user.role === "user" ? (
                        <>
                          <li>
                            <Link className="dropdown-item" to="/">
                              Orders
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/">
                              Dashboard
                            </Link>
                          </li>
                        </>
                      ) : (
                        <li>
                          <Link className="dropdown-item" to="/register/shop">
                            Register your shop
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link className="dropdown-item" onClick={handleLogout}>
                          Logout
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
            <form
              className="d-flex"
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for shops"
                aria-label="Search"
                onChange={onSearchHandler}
                value={searchTerm}
              />
              <button
                type="submit"
                style={{
                  border: "2px solid black",
                  borderRadius: "5px",
                  color: "#800020",
                  width: "150px",
                  marginRight: "2rem",
                }}
                className="custom-button"
              >
                Search
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Snackbar for displaying messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Navbar;
