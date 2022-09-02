import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {ResponseUser} from "../../utils/api/types";
import {RootState} from "../../app/store";

export interface UserState {
  data: ResponseUser | null;
}

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<ResponseUser | null>) => {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.data = action.payload.user.data;
    },
  },
})

export const {setUserData} = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.data;

export const userReducer = userSlice.reducer;