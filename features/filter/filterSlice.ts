import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

type FetchCountOfPagesArgs = {
  queryCategories: string;
  querySearch: string;
  url: string;
  goodsPerPage: number;
}

export const fetchCountOfPages = createAsyncThunk('goods/fetchCountOfPagesStatus', async (args: FetchCountOfPagesArgs) => {
  const {
    queryCategories, querySearch, url, goodsPerPage,
  } = args;

  const { data } = await axios.get(`${url}products?${queryCategories}${querySearch}`);

  return Math.ceil(data.length / goodsPerPage);
});

interface FilterSliceState {
  activeCategoriesIds: number[];
  currentPage: number;
  countOfPages: number;
  searchQuery: string;
}

const initialState: FilterSliceState = {
  activeCategoriesIds: [],
  currentPage: 1,
  countOfPages: 1,
  searchQuery: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<number[]>) {
      state.activeCategoriesIds = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCountOfPages(state, action: PayloadAction<number>) {
      state.countOfPages = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<{
      activeCategoriesIds?: number[];
      currentPage: number;
    }>) {
      state.currentPage = action.payload.currentPage;
      if (action.payload.activeCategoriesIds) { state.activeCategoriesIds = action.payload.activeCategoriesIds; }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountOfPages.pending, (state) => {
      state.countOfPages = 1;
    });
    builder.addCase(fetchCountOfPages.fulfilled, (state, action) => {
      state.countOfPages = action.payload;
    });
    builder.addCase(fetchCountOfPages.rejected, (state) => {
      state.countOfPages = 1;
    });
  },
});

export const filterSelector = (state: RootState) => state.filter;

export const {
  setCategories, setCountOfPages, setCurrentPage, setFilters, setSearchQuery,
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
