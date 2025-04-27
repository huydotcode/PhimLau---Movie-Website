import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovies } from "./movieAPI";

const initialState = {
  list: [],
  status: "idle",
};

export const getMovies = createAsyncThunk("movies/getMovies", async () => {
  const response = await fetchMovies(); // gọi API
  return response;
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMovies.pending, state => {
        state.status = "loading";
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(getMovies.rejected, state => {
        state.status = "failed";
      });
  },
});

export default movieSlice.reducer;
