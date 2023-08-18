import { createAsyncThunk } from "@reduxjs/toolkit";

export const BASE_URL = "https://articles-m-a309d0f7d549.herokuapp.com/";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const response = await fetch(`${BASE_URL}article`);
    const data = await response.json();
    return data;
  }
);

export const fetchArticle = createAsyncThunk(
  "articles/fetchArticle",
  async (params: { id: string }) => {
    const response = await fetch(`${BASE_URL}article/${params.id}`);
    const data = await response.json();
    return data;
  }
);

export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (params: { article: any }) => {
    const response = await fetch(`${BASE_URL}article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.article),
    });
    const data = await response.json();
    return data;
  }
);

export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async (params: { article: any }) => {
    const response = await fetch(`${BASE_URL}article/${params.article._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.article),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (params: { id: string }) => {
    const response = await fetch(`${BASE_URL}article/${params.id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }
);
