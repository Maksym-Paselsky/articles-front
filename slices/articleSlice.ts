import { createSlice } from "@reduxjs/toolkit";

import {
  createArticle,
  fetchArticles,
  updateArticle,
  deleteArticle,
  fetchCategories,
} from "@/thunks/articleThunk";
export interface Article {
  _id: string;
  author: string;
  title: string;
  description: string;
  url: string;
  source: string;
  image: string;
  category: string;
  language: string;
  country: string;
  published_at: string;
}
type State = {
  data: Article[];
  isLoaded: boolean;
  categories: string[];
  total: number | 0;
  limit: number | 10;
  offset: number | 0;
};

const initialState: State = {
  data: [],
  isLoaded: false,
  categories: [],
  total: 0,
  limit: 10,
  offset: 0,
};

export const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.total = action.payload.total;
      state.limit = action.payload.limit;
      state.offset = action.payload.offset;
      state.isLoaded = true;
    });
    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      const index = state.data.findIndex(
        (article) => article._id === action.payload._id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      const index = state.data.findIndex(
        (article) => article._id === action.payload._id
      );
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    });
  },
});

// Action creators are generated for each case reducer function

export default articleSlice.reducer;
