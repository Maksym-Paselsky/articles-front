import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (params: { search: string; offset: number; category?: string }) => {
    const response = await fetch(
      `${BASE_URL}article?s=${params.search}&offset=${params.offset}&category=${params?.category}`
    );
    const data = await response.json();
    return data;
  }
);

export const fetchCategories = createAsyncThunk(
  "articles/fetchCategories",
  async () => {
    const response = await fetch(`${BASE_URL}article/categories`);
    const data = await response.json();
    return data;
  }
);

export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (params: { article: any; token: any }) => {
    const response = await fetch(`${BASE_URL}article`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${params.token}`,
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
  async (params: { article: any; token: string }) => {
    const response = await fetch(`${BASE_URL}article/${params.article._id}`, {
      method: "PATCH",

      headers: {
        Authorization: `Bearer ${params.token}`,
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
  async (params: { id: string; token: any }) => {
    const response = await fetch(`${BASE_URL}article/${params.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${params.token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }
);
