import { Box, TextField, Typography, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useFetch } from "../../hooks";

function CreateProductLayout() {
  const {
    data: categories,
    loading,
    error,
    } = useFetch(`${process.env.REACT_APP_API_BASE_URL}/api/category`);
    
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="50%"
      margin="auto"
      gap={3}
      mt={10}
    >
      <Typography variant="h3" align="center">
        Create Product
      </Typography>
      <TextField label="Title" />
      <TextField label="Description" multiline rows={4} />
      <TextField label="Price" />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select value={category} label="Category" onChange={handleChange}>
          {categories && categories.map((cat) => {
            return <MenuItem value={cat._id}>{cat.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <Button variant="contained" color="success">
        Create
      </Button>
    </Box>
  );
}

export default CreateProductLayout;
