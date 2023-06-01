import { createContext } from "react";
import { useFetch } from "../hooks";

export const ProductContext = createContext({});

export default function ProductProvider({ children }) {
  const {
    data: products,
    loading,
    error,
  } = useFetch(`${process.env.REACT_APP_API_BASE_URL}/api/products`);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
}