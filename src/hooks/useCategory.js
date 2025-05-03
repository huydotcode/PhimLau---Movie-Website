import { useQuery } from "@tanstack/react-query";
import {
  getAllCategories,
  getTopCategories,
  getMoviesByCategory,
} from "../services/categoryService";

export const useTopCategories = ({ enable = true }) => {
  return useQuery({
    queryKey: ["topCategories"],
    queryFn: getTopCategories,
    enabled: enable,
    // staleTime: 5 * 60 * 1000, // cache 5 phút
    initialData: [],
  });
};

export const useAllCategories = ({ enable = true }) => {
  return useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
    enabled: enable,
    // staleTime: 5 * 60 * 1000, // cache 5 phút
    initialData: [],
  });
};

export const useCategoryMovies = (categorySlug, page) => {
  return useQuery({
    queryKey: ["moviesByCategory", categorySlug, page],
    queryFn: () => getMoviesByCategory(categorySlug, page),
    keepPreviousData: true, // Giữ dữ liệu trang trước khi tải trang mới
    staleTime: 5 * 60 * 1000, // Cache 5 phút
  });
};
