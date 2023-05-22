import "./homelayout.css";
import ProductCard from "../../components/ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useFetch } from "../../hooks";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../store/slices/productSlice";

function HomeLayout() {
  // const { data: products, loading, error } = useFetch(`${process.env.REACT_APP_API_BASE_URL}/api/products`);

  //Redux Approach
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product)
  
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [])

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

      {!loading &&
        !error &&
        products &&
        products.map((product, index) => {
          return <ProductCard product={product} key={index} />;
        })}
    </Box>
  );
}

export default HomeLayout;
