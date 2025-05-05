import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addSavedMovie,
  deleteSavedMovie,
  getSavedMoviesByUser,
} from "../../services/movieSavedService";

export const fetchSavedMovies = createAsyncThunk(
  "movies/fetchSavedMovies",
  async (uid, { rejectWithValue }) => {
    try {
      const data = await getSavedMoviesByUser(uid);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addSavedMovieThunk = createAsyncThunk(
  "movies/addSavedMovieThunk",
  async ({ uid, movie }, { rejectWithValue }) => {
    try {
      const data = await addSavedMovie({ movieId: movie._id, userId: uid });
      if (!data) {
        throw new Error("Failed to add saved movie");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeSavedMovieThunk = createAsyncThunk(
  "movies/removeSavedMovieThunk",
  async ({ savedId }, { rejectWithValue }) => {
    try {
      await deleteSavedMovie(savedId);
      return { savedId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
