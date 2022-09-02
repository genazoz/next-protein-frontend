import { combineReducers } from 'redux';
import {userReducer} from "../features/user/userSlice";
import {productReducer} from "../features/product/productSlice";
import {cartReducer} from "../features/cart/cartSlice";
import {settingsReducer} from "../features/settings/settingsSlice";
import {filterReducer} from "../features/filter/filterSlice";

export default combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  settings: settingsReducer,
  filter: filterReducer,
});