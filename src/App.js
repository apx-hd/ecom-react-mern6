import Home from './pages/home'
import ProductDetail from "./pages/ProductDetail";
import CreateProduct from './pages/CreateProduct';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productID" element={<ProductDetail />} />
        <Route path="/product/create" element={<CreateProduct/>} />
      </Routes>
    </BrowserRouter>
  );
}
  
export default App;
