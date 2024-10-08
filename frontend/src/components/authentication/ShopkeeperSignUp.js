import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

const ShopkeeperSignUp = () => {
  const { setUser, setrole } = useShop();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "signed in successfully",
    severity: "success", // success, error, warning, info
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
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/shopOwner/signUp`,
        data
      );
      const result = response.data;
      console.log(result);
      setrole("shopowner");
      localStorage.setItem("userInfo", JSON.stringify(result));

      if (result) {
        setUser(result);
        setSnackbar({
          open: true,
          message: "User created successfully!",
          severity: "success",
        });
        setData({});
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Signup failed. Try again.",
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
        className="p-4"
        style={{
          maxWidth: "450px",
          margin: "auto",
          backgroundColor: "#f6f6f6",
          border: "1px solid rgba(206, 212, 218, 0.5)",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-center fs-3 fw-bolder" style={{ color: "#333" }}>
          Sign Up
        </h2>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label style={{ color: "#333" }}>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              onChange={onChangeHandler}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label style={{ color: "#333" }}>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={onChangeHandler}
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
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label style={{ color: "#333" }}>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter your phone number"
              name="phone"
              onChange={onChangeHandler}
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit" className="w-100">
          Sign Up
        </Button>
        <p style={{ paddingLeft: "2.5rem", paddingTop: "1rem" }}>
          Already have an account? {"  "}
          <a
            href=""
            style={{ textDecoration: "none" }}
            onClick={() => navigate("/login")}
          >
            Login here
          </a>
        </p>
      </Form>

      {/* Snackbar for success and error messages */}
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

export default ShopkeeperSignUp;