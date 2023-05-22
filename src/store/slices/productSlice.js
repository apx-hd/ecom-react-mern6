import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    products: [],
    product: {},
    loading: false,
    error: false
}

export const fetchAllProducts = createAsyncThunk('product/fetchAllProducts', async () => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`)
        return data;
    } catch (err) {
        return err;
    }
})

export const fetchSingleProduct = createAsyncThunk('product/fetchSingleProduct', async (payload) => {
    try {
        const { productID } = payload;
        console.log(productID)
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/${productID}`)
        return data;
    } catch (err) {
        return err;
    }
})


export const productSlice = createSlice({
  name: 'product',
  initialState,
    reducers: {
    },
    extraReducers: {
        [fetchAllProducts.pending]: (state) => { 
            state.loading = true;
        },
        [fetchAllProducts.fulfilled]: (state, action) => { 
            state.loading = false;
            state.products = action.payload;
        },
        [fetchAllProducts.rejected]: (state) => { 
            state.loading = false;
            state.error = true;
        },
        [fetchSingleProduct.pending]: (state) => { 
            state.loading = true;
        },
        [fetchSingleProduct.fulfilled]: (state, action) => { 
            state.loading = false;
            state.product = action.payload;
        },
        [fetchSingleProduct.rejected]: (state) => { 
            state.loading = false;
            state.error = true;
        }
    }
})

// Action creators are generated for each case reducer function
export const { } = productSlice.actions

export default productSlice.reducer