import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../app/store";
import {ResponseProduct} from "../../utils/api/types";

export interface CartProduct extends ResponseProduct{
  count: number;
}

interface CartSliceState {
  items: CartProduct[];
  totalPrice: number;
  totalCount: number;
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 1,
  totalCount: 1,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<{goods: CartProduct[]}>) {
      state.items = action.payload.goods;
      cartSlice.caseReducers.updateData(state);
    },
    addItem(state, action: PayloadAction<{goods: ResponseProduct, count?: number}>) {
      if(!action.payload.count)
        action.payload.count = 1;

      const findItem = state.items.find(item => item.id === action.payload.goods.id);

      if (findItem) {
        if(!findItem.count)
          findItem.count = 1;
        if(findItem.count < 150)
          findItem.count = findItem.count + action.payload.count;
      } else {
        state.items.push({...action.payload.goods, count: action.payload.count});
      }

      cartSlice.caseReducers.updateData(state);
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find(item => item.id === action.payload);

      if (findItem && findItem.count > 1) {
        findItem.count--;
      }

      cartSlice.caseReducers.updateData(state);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(obj => obj.id !== action.payload);

      cartSlice.caseReducers.updateData(state);
    },
    clearItems(state) {
      state.items = [];

      cartSlice.caseReducers.updateData(state);
    },
    updateData(state) {
      state.totalCount = state.items.reduce((acc, cur) => cur.count + acc, 0)
      state.totalPrice = state.items.reduce((acc, cur) => cur.price * cur.count + acc, 0)
    }
  }
})

export const cartSelector = (state: RootState) => state.cart;

export const {setItems, addItem, removeItem, clearItems, minusItem} = cartSlice.actions

export const cartReducer = cartSlice.reducer