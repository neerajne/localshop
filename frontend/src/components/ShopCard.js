import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function ShopCard({ shop }) {
  const { shopProduct, setShopProduct, setShopId } = useShop();
  const navigate = useNavigate();
  const shopClick = (e) => {
    e.preventDefault();
    setShopId(shop._id);
    localStorage.setItem("shopId", shop._id);
    navigate("/all/products/shop");
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 300 },
        height: 450, // Fixed height for all cards
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
      }}
      className="px-2 py-2"
      onClick={shopClick}
    >
      <CardActionArea
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <CardMedia
          component="img"
          height="200"
          image={`${process.env.REACT_APP_API_URL}${shop.image}`}
          alt={shop.name}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="fs-4 fw-bolder"
            >
              {shop.name}
            </Typography>
            <Box sx={{ height: 80, overflow: "hidden" }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {shop.description}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {shop.address.street}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {shop.address.city}, {shop.address.state}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Step Inside
        </Button>
      </CardActions>
    </Card>
  );
}

// /onClick={() => shopClick()}
