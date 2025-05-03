import { useQuery } from "@tanstack/react-query";
import { getSingleMovies } from "../services/singleService";

/**
 * Hook để lấy danh sách phim lẻ (single)
 * @param {number} page - Trang hiện tại
 */
export const useSingleMovies = (page) => {
  return useQuery({
    queryKey: ["singleMovies", page],
    queryFn: () => getSingleMovies(page),
    keepPreviousData: true, // Giữ dữ liệu trang trước khi tải trang mới
    staleTime: 5 * 60 * 1000, // Cache 5 phút
  });
};