import { createSlice } from "@reduxjs/toolkit";
import {
  addFavoriteMovieThunk,
  fetchFavoriteMovies,
  removeFavoriteMovieThunk,
} from "./favoriteMovieThunk";
import {
  addSavedMovieThunk,
  fetchSavedMovies,
  removeSavedMovieThunk,
} from "./savedMovieThunk";
import { addWatchedMovieThunk, fetchWatchedMovies } from "./watchedMovieThunk";

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
    clearMoviesState: (state) => {
      state.savedMovies = [];
      state.favoriteMovies = [];
      state.watchedMovies = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Saved
      .addCase(fetchSavedMovies.pending, (state) => {
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

      // Add Saved
      .addCase(addSavedMovieThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSavedMovieThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.savedMovies = [...state.savedMovies, action.payload];
      })
      .addCase(addSavedMovieThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove Saved
      .addCase(removeSavedMovieThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeSavedMovieThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.savedMovies = state.savedMovies.filter(
          (movie) => movie.saved_id !== action.payload.savedId,
        );
      })
      .addCase(removeSavedMovieThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Favorite
      .addCase(fetchFavoriteMovies.pending, (state) => {
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

      // Add Favorite
      .addCase(addFavoriteMovieThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFavoriteMovieThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.favoriteMovies = [...state.favoriteMovies, action.payload];
        }
      })
      .addCase(addFavoriteMovieThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove Favorite
      .addCase(removeFavoriteMovieThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFavoriteMovieThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteMovies = state.favoriteMovies.filter(
          (movie) => movie.id !== action.payload.favoriteId,
        );
      })
      .addCase(removeFavoriteMovieThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Watched
      .addCase(fetchWatchedMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWatchedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.watchedMovies = action.payload;
      })
      .addCase(fetchWatchedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Watched
      .addCase(addWatchedMovieThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addWatchedMovieThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.watchedMovies = [...state.watchedMovies, action.payload];
        }
      })
      .addCase(addWatchedMovieThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMoviesState } = moviesSlice.actions;
export default moviesSlice.reducer;
