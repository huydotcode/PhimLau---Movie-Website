import { useQuery } from "@tanstack/react-query";
import {
  getAmericanMovies,
  getKoreanMovies,
  getNewSeriesMovies,
  getNewSingleMovies,
  getSuggestionMovies,
  getTopNewMovies,
  getTopViewMovies,
  getTrendingMovies,
} from "../services/movieService";

const SLATE_TIME = 1 * 60 * 1000; // 5 phút
const INITIAL_DATA = [];

// Phim gợi ý cho người dùng
export const useSuggestionMovies = ({ enabled = true, userId }) => {
  return useQuery({
    queryKey: ["suggestionMovies", userId],
    queryFn: async () => {
      const data = await getSuggestionMovies(userId);
      return data;
    },
    enabled,
    // staleTime: SLATE_TIME, // cache 5 phút
    initialData: INITIAL_DATA,
  });
};

export const useTopNewMovies = ({ enabled = true }) => {
  return useQuery({
    queryKey: ["topNewMovies"],
    queryFn: getTopNewMovies,
    enabled,
    // staleTime: SLATE_TIME,
    initialData: INITIAL_DATA,
  });
};

export const useTopViewMovies = ({ enabled = true }) => {
  return useQuery({
    queryKey: ["topViewMovies"],
    queryFn: getTopViewMovies,
    enabled,
    // staleTime: SLATE_TIME, // cache 5 phút
    initialData: INITIAL_DATA,
  });
};

export const useNewSingleMovies = ({ enabled = true }) => {
  return useQuery({
    queryKey: ["newSingleMovies"],
    queryFn: getNewSingleMovies,
    enabled,
    // staleTime: SLATE_TIME,
    initialData: INITIAL_DATA,
  });
};

export const useNewSeriesMovies = ({ enabled = true }) => {
  return useQuery({
    queryKey: ["newSeriesMovies"],
    queryFn: getNewSeriesMovies,
    enabled,
    // staleTime: SLATE_TIME,
    initialData: INITIAL_DATA,
  });
};

export const useTrendingMovies = ({ enabled = true }) => {
  return useQuery({
    queryKey: ["trendingMovies"],
    queryFn: getTrendingMovies,
    enabled,
    // staleTime: SLATE_TIME,
    initialData: INITIAL_DATA,
  });
};

export const useKoreanMovies = ({ enabled = true }) => {
  return useQuery({
    queryKey: ["koreanMovies"],
    queryFn: getKoreanMovies,
    enabled,
    // staleTime: SLATE_TIME,
    initialData: INITIAL_DATA,
  });
};

export const useAmericanMovies = ({ enabled = true }) => {
  return useQuery({
    queryKey: ["americanMovies"],
    queryFn: getAmericanMovies,
    enabled,
    // staleTime: SLATE_TIME,
    initialData: INITIAL_DATA,
  });
};
