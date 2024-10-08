import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarRatings from "react-star-ratings"; // Import the star ratings component
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product }) {
  // Destructure orderAddRemove and setOrderAddRemove from context
  const { orderAddRemove, setOrderAddRemove } = useShop();

  // Function to handle adding/removing product from cart
  const handleOrderAddRemove = () => {
    if (orderAddRemove === "add") {
      setOrderAddRemove("remove");
      // Add your logic to add the product to the cart (e.g., API call)
    } else {
      setOrderAddRemove("add");
      // Add your logic to remove the product from the cart (e.g., API call)
    }
  };

  const RupeeSymbol = () => <span>₹</span>;

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 500 , minHeight:200 ,minWidth:280 }}>
      <CardMedia
        sx={{ height: 190 }}
        image={`${process.env.REACT_APP_API_URL}${product.imageUrl}`}
        title={product.name} // Changed to use product name for better accessibility
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className="fs-5">
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {product.description}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          className="fs-6"
        >
          <RupeeSymbol /> {product.price} /-
        </Typography>

        {/* Star Ratings */}
        <StarRatings
          rating={product.rating}
          starRatedColor="#FF8C00"
          starDimension="20px" // Set the size of the stars
          starSpacing="0.1px" // Set spacing between stars
          numberOfStars={5} // Total stars to show
          name="rating" // Name for accessibility
        />
      </CardContent>
      <CardActions>
        {orderAddRemove === "add" ? (
          <Button
            size="small"
            style={{ backgroundColor: "white", color: "#FFA500" }}
            onClick={handleOrderAddRemove} // Call function when clicked
          >
            Add to cart
          </Button>
        ) : (
          <Button size="small" onClick={handleOrderAddRemove}>
            Remove from cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
