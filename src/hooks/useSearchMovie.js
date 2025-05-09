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
    queryKey: [
      "searchMovies",
      searchTerm,
      page,
      filters?.type,
      filters?.category,
      filters?.country,
      filters?.lang,
      filters?.year,
      filters?.sort,
      lastVisible?._id,
      pageSize,
      type,
    ],
    queryFn: async () => {
      if (type === "search") {
        if (!searchTerm) {
          return {
            movies: [],
            lastVisible: null,
          };
        }
      }

      const data = await searchMovies({
        filters,
        lastVisible,
        page,
        pageSize,
        searchTerm,
      });

      return data;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,

    initialData: () => {
      return {
        movies: [],
        lastVisible: null,
      };
    },
    enabled: enable,
  });
};
