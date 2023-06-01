import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductContext } from "../../context/ProductContext";
import { useContext } from "react";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const {products, setProducts} = useContext(ProductContext)

  const handleDelete = async (productID) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/products/${productID}`)
      console.log(data)
      //Update state data
      setProducts(products.filter((element) => element._id !== data.data._id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 340 }}
        image={product.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Link to={`/product/${product._id}`}> */}
          <Button variant="contained" size="small" onClick={() => navigate(`/product/${product._id}`)}>Learn More</Button>
          <Button variant="contained" size="small" color="error" onClick={() => handleDelete(product._id)}>Delete</Button>
        {/* </Link> */}
      </CardActions>
    </Card>
  );
}
