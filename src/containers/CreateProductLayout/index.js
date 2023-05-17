import { Box, TextField, Typography, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useFetch } from "../../hooks";
import "./createproductlayout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//To display notification popup
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateProductLayout() {
  const {
    data: categories,
    loading,
    error,
  } = useFetch(`${process.env.REACT_APP_API_BASE_URL}/api/category`);

  //Used to redirect the user to another page
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  //Handling TextField Errors
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [categoryError, setCategoryError] = useState(null);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async () => {
    //Reset error message
    setTitleError(null)
    setDescriptionError(null)
    setPriceError(null)
    setCategoryError(null)

    //Validation
    if (title === "") {
      setTitleError("Title is required");
    }
    if (description === "") {
      setDescriptionError("Description is required");
    }
    if (price <= 0) {
      setPriceError("Price cannot be less than or equal to 0");
    }
    if (category === "") {
      setCategoryError("Title is required");
    }

    if (title === "" || description === "" || price <= 0 || category === "") {
      return;
    }

    //1. Prepare payload
    const payload = {
      title,
      description,
      price,
      category,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/products`,
        payload
      );
      if (response.status === 200) {
        toast.success("Product Created Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        //Clearing the input fields once the response is success
        setTitle("");
        setDescription("");
        setPrice(0);
        setCategory("");
        //Redirecting to homepage after 2 seconds
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={titleError}
        helperText={titleError}
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={descriptionError}
        helperText={descriptionError}
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        error={priceError}
        helperText={priceError}
      />
      <FormControl fullWidth error={categoryError} helperText={categoryError}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select value={category} label="Category" onChange={handleChange}>
          {categories &&
            categories.map((cat) => {
              return <MenuItem value={cat._id}>{cat.name}</MenuItem>;
            })}
        </Select>
      </FormControl>
      <Button variant="contained" color="success" onClick={handleSubmit}>
        Create
      </Button>
      <ToastContainer />
    </Box>
  );
}

export default CreateProductLayout;
