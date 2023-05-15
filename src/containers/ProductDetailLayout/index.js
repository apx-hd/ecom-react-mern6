import "./productdetail.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import ProductDetailCard from "../../components/ProductDetailCard";
import { useFetch } from "../../hooks";

function ProductDetailLayout() {
  const { productID } = useParams();
  const { data: product, loading, error } = useFetch(`${process.env.REACT_APP_API_BASE_URL}/api/products/${productID}`);

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
      {!loading && !error && product && <ProductDetailCard product={product} />}
    </Box>
  );
}

export default ProductDetailLayout;
