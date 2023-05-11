import { Box, Card } from "@mui/material";
import './productdetailcard.css'

function ProductDetailCard() {
    
  return (
    <Box display="flex" alignItems="center" mt={10}>
          <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" width="50%" style={{ borderRadius: 8 }} />
          <Card sx={{ minWidth: "50%", height: "130%", borderRadius: 0 }}>
              <Box display="flex" flexDirection="column" p={8}>
                  <Box display="flex" justifyContent="space-between">
                      <span>Star</span>
                      <span>Price</span>
                  </Box>
                  <Box></Box>
                  <Box></Box>
                  <Box></Box>
                  <Box></Box>
              </Box>
      </Card>
    </Box>
  );
}

export default ProductDetailCard;
