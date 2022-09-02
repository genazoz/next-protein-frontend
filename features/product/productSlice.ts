import {createSlice} from '@reduxjs/toolkit'
import {ResponseProduct} from "../../utils/api/types";

interface GoodsSliceState {
  items: ResponseProduct[];
}

const initialState: GoodsSliceState = {
  items: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
})

export const productReducer = productSlice.reducer