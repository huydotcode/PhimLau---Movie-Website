import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addFavorite,
  getFavoritesByUser,
  removeFavorite,
} from "../../services/favoriteService";

export const fetchFavoriteMovies = createAsyncThunk(
  "movies/fetchFavoriteMovies",
  async (uid, { rejectWithValue }) => {
    try {
      const data = await getFavoritesByUser(uid);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addFavoriteMovieThunk = createAsyncThunk(
  "movies/addFavoriteMovieThunk",
  async ({ uid, movie }, { rejectWithValue }) => {
    try {
      const data = await addFavorite({ movie, userId: uid });
      if (!data) {
        throw new Error("Failed to add favorite movie");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeFavoriteMovieThunk = createAsyncThunk(
  "movies/removeFavoriteMovieThunk",
  async ({ favoriteId }, { rejectWithValue }) => {
    try {
      await removeFavorite(favoriteId);
      return { favoriteId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
