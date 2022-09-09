import { combineReducers } from 'redux';
import {userReducer} from "../features/user/userSlice";
import {cartReducer} from "../features/cart/cartSlice";
import {settingsReducer} from "../features/settings/settingsSlice";
import {filterReducer} from "../features/filter/filterSlice";

export default combineReducers({
  user: userReducer,
  cart: cartReducer,
  settings: settingsReducer,
  filter: filterReducer,
});