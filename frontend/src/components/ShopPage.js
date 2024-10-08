import React from "react";
import { useShop } from "../context/ShopContext";
import { Grid, Container, Typography } from "@mui/material";
import ShopCard from "./ShopCard";
const ShopPage = () => {
  const { searchShopResult } = useShop();
  return (
    <Container>
      <Typography variant="h4" gutterBottom className="mt-5 fw-medium">
        {`Search result :`}
      </Typography>
      <hr style={{ color: "#F5F5F5", opacity: "0.3" }} />
      <Grid container spacing={3} justifyContent="flex-start">
        {searchShopResult.map((shop) => (
          <Grid
            item
            xs={12} // Full width on extra small screens
            sm={6} // 2 items per row on small screens
            md={4} // 3 items per row on medium screens
            lg={3} // 4 items per row on large screens
            key={shop._id}
          >
            <ShopCard shop={shop} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ShopPage;
