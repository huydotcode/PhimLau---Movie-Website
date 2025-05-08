import { useQuery } from "@tanstack/react-query";
import {
  countMoviesByField,
  countMoviesByYearRange,
  getCountMoviesByType,
  getMovieDistribution,
  getOverviewStats,
  getStatistics,
  getTopViewedCategories,
  getTopViewedMovies,
} from "../services/statisticsService";

export const useStatistics = () => {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: async () => await getStatistics(),
  });
};

export const useCountMoviesByField = (field) => {
  return useQuery({
    queryKey: ["countMoviesByField", field],
    queryFn: async () => await countMoviesByField(field),
  });
};

export const useMovieDistribution = () => {
  return useQuery({
    queryKey: ["movieDistribution"],
    queryFn: getMovieDistribution,
  });
};

export const useTopViewedMovies = (topN = 10) => {
  return useQuery({
    queryKey: ["topViewedMovies", topN],
    queryFn: async () => await getTopViewedMovies(topN),
  });
};

export const useCountMoviesByYearRange = (start, end) => {
  return useQuery({
    queryKey: ["countMoviesByYearRange", start, end],
    queryFn: async () => await countMoviesByYearRange(start, end),
  });
};

export const useOverviewStats = () => {
  return useQuery({
    queryKey: ["overviewStats"],
    queryFn: getOverviewStats,
  });
};

export const useTopViewedCategories = (topN = 10) => {
  return useQuery({
    queryKey: ["topViewedCategories", topN],
    queryFn: async () => await getTopViewedCategories(topN),
  });
};

// getCountMoviesByType
export const useCountMoviesByType = () => {
  return useQuery({
    queryKey: ["countMoviesByType"],
    queryFn: getCountMoviesByType,
  });
};
