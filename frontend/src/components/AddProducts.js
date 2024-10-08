import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const AddProducts = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
      navigate("/"); // Redirect to home if no user
    } else if (user.role !== "shopowner") {
      setSnackbar({
        open: true,
        message: "You must have a shop to add products.",
        severity: "error",
      });
      // Redirect after showing the Snackbar
      setTimeout(() => {
        navigate("/");
      }, 800); // Adjust the duration as needed (2000ms = 2 seconds)
    }
  }, [navigate]);

  const { user, setUser } = useShop();

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    stockQuantity: 1,
  });
  const [image, setImage] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file
  };
const formSubmit = async (e) => {
  e.preventDefault();

  // Check if all required fields are filled
  if (
    !data.name.trim() ||
    !data.description.trim() ||
    !data.price.trim() ||
    !data.category.trim() ||
    data.price <= 0 // Ensure price is positive
  ) {
    setSnackbar({
      open: true,
      message: "Please fill all required fields before submitting.",
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
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("subcategory", data.subcategory);
    formData.append("stockQuantity", data.stockQuantity);
    formData.append("id", user._id);

    // Append image only if it exists
    if (image) {
      formData.append("image", image); // Change key to "image"
    }

    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/create`,
      formData,
      config
    );
    const result = response.data;
    console.log(result);
    if (result) {
      setSnackbar({
        open: true,
        message: "Product added successfully!",
        severity: "success",
      });
      // Reset form data
      setData({
        name: "",
        description: "",
        price: "",
        category: "",
        subcategory: "",
        stockQuantity: 1,
      });
      setImage(null);
      setTimeout(() => {
        navigate("/"); // Navigate to the home page after success
      }, 1000);
    }
  } catch (error) {
    // Check if the error has a response
    const errorMessage = error.response
      ? error.response.data.message || error.message
      : error.message; // Fallback to error.message if no response
    setSnackbar({
      open: true,
      message: errorMessage,
      severity: "error",
    });
  }
};
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Form
      className="p-4"
      style={{
        maxWidth: "450px",
        margin: "auto",
        backgroundColor: "#f6f6f6",
        borderRadius: "8px",
      }}
      onSubmit={formSubmit}
    >
      <h2
        className="text-center fs-5 fw-bolder"
        style={{ color: "black", opacity: "0.7" }}
      >
        Your shop is a reflection of your unique style. Let’s add products that
        tell your story!
      </h2>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label style={{ color: "#333" }} className="fs-5 fw-semibold">
            Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Name"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridDescription">
          <Form.Label style={{ color: "#333" }} className="fs-5 fw-semibold">
            Description
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Description"
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridPrice">
          <Form.Label style={{ color: "#333" }} className="fs-5 fw-semibold">
            Price
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Price"
            name="price"
            value={data.price}
            onChange={onChangeHandler}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCategory">
          <Form.Label style={{ color: "#333" }} className="fs-5 fw-semibold">
            Category
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Category"
            name="category"
            value={data.category}
            onChange={onChangeHandler}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridSubcategory">
          <Form.Label style={{ color: "#333" }} className="fs-5 fw-semibold">
            Subcategory
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Subcategory (optional)"
            name="subcategory"
            value={data.subcategory}
            onChange={onChangeHandler}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label style={{ color: "#333", fontWeight: "500" }}>
            Product Image (optional)
          </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={onImageChange} // Handle image change
          />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit" className="w-100">
        Add Product
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Form>
  );
};

export default AddProducts;
