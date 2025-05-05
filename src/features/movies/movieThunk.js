import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFavoritesByUser } from "../../services/favoriteService";
import {
  addSavedMovie,
  getSavedMoviesByUser,
} from "../../services/movieSavedService";
import {
  addWatchedMovie,
  getWatchedMoviesByUser,
} from "../../services/watchedService";

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
        throw new Error("Phim đã được lưu trước đó.");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

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

export const fetchWatchedMovies = createAsyncThunk(
  "movies/fetchWatchedMovies",
  async (uid, { rejectWithValue }) => {
    try {
      const data = await getWatchedMoviesByUser(uid);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addWatchedMovieThunk = createAsyncThunk(
  "movies/addWatchedMovieThunk",
  async ({ uid, movie, currentEpisode }, { rejectWithValue }) => {
    try {
      const data = await addWatchedMovie({
        movie,
        userId: uid,
        currentEpisode,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
