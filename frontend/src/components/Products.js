import React, { useEffect, useState } from "react";
import axios from "axios";
import { useShop } from "../context/ShopContext";
import { Grid, Container, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

const Products = () => {
  const { shopId, shopProduct, setShopProduct } = useShop();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedShopId = localStorage.getItem("shopId")?.trim(); // Directly get the shopId from local storage
    if (!storedShopId) {
      setError("No shop selected."); // Handle if shopId is not found
      return;
    }

    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/product/getProducts/${storedShopId}`
        );
        const result = response.data;
        setShopProduct(result);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [setShopProduct]); // Only include setShopProduct as a dependency

  if (loading) return <Typography>Loading products...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!shopProduct || shopProduct.length === 0)
    return <Typography>No products available</Typography>;

  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        className="mt-3 fw-medium"
        style={{ color: "#007D8A" }}
      >
        Explore Our Collection
      </Typography>
      <hr style={{ color: "#F5F5F5", opacity: "0.3" }} />
      <Grid container spacing={3} justifyContent="flex-start">
        {shopProduct.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
