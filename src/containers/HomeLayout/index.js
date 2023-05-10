import "./homelayout.css";
import ProductCard from "../../components/ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

function HomeLayout() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/products");
        console.log(data);
        setProducts(data);
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

      {!loading &&
        !error &&
        products.map((product, index) => {
          return <ProductCard product={product} key={index} />;
        })}
    </Box>
  );
}

export default HomeLayout;
