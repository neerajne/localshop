import React, { useEffect, useState } from "react";
import axios from "axios";
import { useShop } from "../context/ShopContext";
import ShopCard from "./ShopCard";
import { Grid, Container, Typography } from "@mui/material";

const Shops = () => {
  const { shops, setShops, type, user } = useShop();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchShops() {
      let city;

      // Determine the city based on the user or default to "undefined"
      if (user && user.address && user.address.city) {
        city = user.address.city;
      } else {
        city = "undefined";
      }

      if (type) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/shop/all/${type}/${city}`
          );
          const result = response.data;
          console.log("API Response:", result);
          if (result) {
            setShops(result);
          }
        } catch (err) {
          console.error("Error fetching shops:", err);
          setError("Failed to fetch shops. Please try again later.");
        }
      }
    }

    fetchShops(); // Call fetchShops on every render when type changes
  }, [type, user, setShops]); // Added 'user' to dependencies

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        className="mt-5 fw-medium"
        style={{ color: "#007D8A" }}
      >
        All Shops
      </Typography>
      <hr style={{ color: "#F5F5F5", opacity: "0.3" }} />
      <Grid container spacing={3} justifyContent="flex-start">
        {shops.map((shop) => (
          <Grid
            item
            xs={12} // Full width on extra small screens
            sm={6} // 2 items per row on small screens
            md={4} // 3 items per row on medium screens
            lg={3} // 4 items per row on large screens
            key={shop._id}
          >
            {/* <div>{shop._id}</div> */}
            <ShopCard shop={shop} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Shops;
