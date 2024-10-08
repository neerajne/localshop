import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

const Login = () => {
  const [login, setLogin] = useState("login User");
  const navigate = useNavigate();
  const { setUser, setrole } = useShop();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "User logged in successfully",
    severity: "success",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      if (login === "login User") {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/login`,
          data
        );
        const result = response.data;
        // console.log("user login credentials", result.token);
        localStorage.setItem("userInfo", JSON.stringify(result));
        setrole(result.role);
        if (result) {
          setUser(result);
          setSnackbar({
            open: true,
            message: "Logged in successfully!",
            severity: "success",
          });
          setData({});
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/shopOwner/login`,
          data
        );
        const result = response.data;
        console.log("result of shpkeeper", result.data);
        localStorage.setItem("userInfo", JSON.stringify(result.data));
        if (result) {
          setrole(result.data.role);
          setUser(result.data);
          setSnackbar({
            open: true,
            message: "Logged in successfully!",
            severity: "success",
          });
          setData({});
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Login failed. Try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Form
        onSubmit={formSubmit}
        className="p-4 mt-5"
        style={{
          maxWidth: "450px",
          margin: "auto",
          background: "#f6f6f6",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(206, 212, 218, 0.5)",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-center fs-3 fw-bolder" style={{ color: "#333" }}>
          Login Here
        </h2>
        <Row className="mt-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label style={{ color: "#333" }}>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={onChangeHandler}
              style={{
                padding: "12px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                transition: "border-color 0.3s ease",
              }}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label style={{ color: "#333" }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChangeHandler}
              style={{
                padding: "12px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                transition: "border-color 0.3s ease",
              }}
            />
          </Form.Group>
        </Row>
        <Button
          variant="primary"
          type="submit"
          className="w-100"
          style={{ transition: "background-color 0.3s ease" }}
        >
          Login
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="w-100"
          style={{
            transition: "background-color 0.3s ease",
            margin: "auto",
            marginTop: "1rem",
          }}
          onClick={() => setLogin("loginShopowner")}
        >
          Login Shopowner
        </Button>
        <p style={{ paddingLeft: "2.5rem", paddingTop: "1rem" }}>
          Don't have an account? New user{" "}
          <a
            href=""
            style={{ color: "#007bff", textDecoration: "none" }}
            onClick={() => navigate("/SignUp")}
          >
            SignUp
          </a>
        </p>
      </Form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
