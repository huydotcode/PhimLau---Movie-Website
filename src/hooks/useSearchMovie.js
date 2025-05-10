import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../services/movieService";

export const useSearchMovies = ({
  searchTerm = "",
  page = 1,
  filters = {},
  lastVisible = null,
  pageSize = 10,
  enable = true,
  type = "all",
}) => {
  return useQuery({
    queryKey: ["searchMovies", searchTerm, filters, page, pageSize, type],
    queryFn: async () => {
      const data = await searchMovies({
        filters,
        lastVisible: page === 1 ? null : lastVisible,
        page,
        pageSize,
        searchTerm,
      });
      return data;
    },
    initialData: {
      movies: [],
      lastVisible: null,
      totalMovies: 0,
      totalPages: 0,
    },
    enabled: enable,
  });
};
