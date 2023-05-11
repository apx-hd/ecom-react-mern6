import "./productdetail.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import ProductDetailCard from "../../components/ProductDetailCard";

function ProductDetailLayout() {
  const { productID } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/products/${productID}`
        );
        console.log(data);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      gap={2}
      mt={10}
      mb={10}
    >
      {loading && (
        <Skeleton
          sx={{ bgcolor: "grey.900" }}
          variant="rectangular"
          width={210}
          height={118}
        />
      )}

      {!loading && error && <p>Error</p>}

      {/* {!loading && !error && <ProductCard product={product} />} */}
      {!loading && !error && <ProductDetailCard />}
    </Box>
  );
}

export default ProductDetailLayout;
