import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import registerShop from "../assets/registerShop.avif";

const RegisterShop = () => {
  console.log("hello herer wveyrones ");
  const { user, setUser } = useShop();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    type: "",
    description: "",
  });
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [image, setImage] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const onAddressChangeHandler = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      console.log(parsedUserInfo);
      if (parsedUserInfo && parsedUserInfo.token) {
        setUser(parsedUserInfo);
        // Check for the correct role
        if (parsedUserInfo.role !== "shopowner") {
          setSnackbar({
            open: true,
            message: "You must register as a shop owner to register your shop!",
            severity: "error",
          });
          setTimeout(() => {
            navigate("/"); // Redirect to home if not a shopkeeper
          }, 1000);// Redirect to home if not a shopkeeper
        }
      } else {
        setSnackbar({
          open: true,
          message: "Login is required to create a shop.",
          severity: "warning",
        });
        navigate("/"); // Redirect to login if not authenticated
      }
    } else {
      setSnackbar({
        open: true,
        message: "Login is required to create a shop.",
        severity: "warning",
      });
      navigate("/"); // Redirect to login if no user info in localStorage
    }
  }, [setUser, navigate]);
const formSubmit = async (e) => {
  e.preventDefault();

  // Check if all required fields are filled
  if (
    !data.name.trim() ||
    !data.type.trim() ||
    !data.description.trim() ||
    !address.street.trim() ||
    !address.city.trim() ||
    !address.state.trim() ||
    !address.zipcode.trim() ||
    !image
  ) {
    setSnackbar({
      open: true,
      message: "Please fill all the fields before submitting.",
      severity: "warning",
    });
    return;
  }

  try {
    if (!user || !user.token) {
      throw new Error("User is not authenticated");
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("type", data.type);
    formData.append("description", data.description);
    formData.append("address[street]", address.street);
    formData.append("address[city]", address.city);
    formData.append("address[state]", address.state);
    formData.append("address[zipcode]", address.zipcode);
    formData.append("id", user._id);

    if (image) {
      formData.append("image", image);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/shop/create`,
      formData,
      config
    );

    const result = response.data;
    if (result) {
      setUser(result);
      setSnackbar({
        open: true,
        message: "Shop registered successfully!",
        severity: "success",
      });
      setData({ name: "", type: "", description: "" });
      setAddress({ street: "", city: "", state: "", zipcode: "" });
      setImage(null);
      setTimeout(() => {
        navigate("/add/products");
      }, 1000);
    }
  } catch (error) {
    // Improved error handling here
    const message =
      error.response?.data?.message || error.message || "An error occurred";
    setSnackbar({
      open: true,
      message: message,
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
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${registerShop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-center fs-3 fw-bolder" style={{ color: "#333" }}>
          Register Shop
        </h2>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label style={{ color: "#333" }} className="fs-5 fw-semibold">
              Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Raghav Stationary"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              required={true}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridType">
            <Form.Label style={{ color: "#333" }} className="fs-5 fw-semibold">
              Type
            </Form.Label>
            <Form.Select
              name="type"
              value={data.type}
              onChange={onChangeHandler}
              required={true}
            >
              <option value="">Select a shop type</option>
              <option value="Stationary">Stationary</option>
              <option value="Bakery">Bakery</option>
              <option value="Garments">Garments</option>
              <option value="Homedecor">Homedecor</option>
              <option value="Grocery">Grocery</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Restaurant">Food</option>
              <option value="Bookstore">Bookstore</option>
              <option value="sports">sports</option>
              <option value="Electronic">Electronic</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridType">
            <Form.Label style={{ color: "#333" }} className="fs-5 fw-semibold">
              Description
            </Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="description"
              value={data.description}
              onChange={onChangeHandler}
              required={true}
            />
          </Form.Group>
        </Row>
        <h4 style={{ color: "#333" }} className="fs-5 fw-semibold">
          Address
        </h4>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridStreet">
            <Form.Label style={{ color: "#333", fontWeight: "500" }}>
              Street
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Bakers Main St"
              name="street"
              value={address.street}
              onChange={onAddressChangeHandler}
              required={true}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label style={{ color: "#333", fontWeight: "500" }}>
              City
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="San Francisco"
              name="city"
              value={address.city}
              onChange={onAddressChangeHandler}
              required={true}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label style={{ color: "#333", fontWeight: "500" }}>
              State
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Alaska"
              name="state"
              value={address.state}
              onChange={onAddressChangeHandler}
              required={true}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label style={{ color: "#333", fontWeight: "500" }}>
              Zip Code
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="99056"
              name="zipcode"
              value={address.zipcode}
              onChange={onAddressChangeHandler}
              required={true}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label style={{ color: "#333", fontWeight: "500" }}>
              Shop Image
            </Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              required={true}
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit" className="w-100">
          Register Shop
        </Button>
      </Form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterShop;
