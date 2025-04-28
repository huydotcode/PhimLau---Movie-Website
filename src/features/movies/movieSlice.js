import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getFavoriteMovies,
  getSavedMovies,
  getWatchedMovies,
} from "../../services/movieService";

// Async Thunks
export const fetchSavedMovies = createAsyncThunk(
  "movies/fetchSavedMovies",
  async (uid, { rejectWithValue }) => {
    try {
      const data = await getSavedMovies(uid);
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
      const data = await getFavoriteMovies(uid);
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
      const data = await getWatchedMovies(uid);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Slice
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    savedMovies: [],
    favoriteMovies: [],
    watchedMovies: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearMoviesState: state => {
      state.savedMovies = [];
      state.favoriteMovies = [];
      state.watchedMovies = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch Saved
      .addCase(fetchSavedMovies.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSavedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.savedMovies = action.payload;
      })
      .addCase(fetchSavedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Favorite
      .addCase(fetchFavoriteMovies.pending, state => {
        state.loading = true;
      })
      .addCase(fetchFavoriteMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteMovies = action.payload;
      })
      .addCase(fetchFavoriteMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Watched
      .addCase(fetchWatchedMovies.pending, state => {
        state.loading = true;
      })
      .addCase(fetchWatchedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.watchedMovies = action.payload;
      })
      .addCase(fetchWatchedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMoviesState } = moviesSlice.actions;
export default moviesSlice.reducer;
