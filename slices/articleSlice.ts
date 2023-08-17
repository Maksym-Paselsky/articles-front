import { createSlice } from "@reduxjs/toolkit";

import {
  createArticle,
  fetchArticles,
  fetchArticle,
  updateArticle,
  deleteArticle,
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

const initialState: Article[] = [];
export const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      return [action.payload];
    });
    builder.addCase(createArticle.fulfilled, (state, action) => {
      return [action.payload, ...state];
    });
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      const index = state.findIndex(
        (article) => article._id === action.payload._id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      const index = state.findIndex(
        (article) => article._id === action.payload._id
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = articleSlice.actions;

export default articleSlice.reducer;
