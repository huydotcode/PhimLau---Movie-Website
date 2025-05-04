import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../services/movieService";

export const useSearchMovies = ({
  searchTerm = "",
  page = 1,
  filters = {},
  lastVisible = null,
  pageSize = 10,
}) => {
  return useQuery({
    queryKey: [
      "searchMovies",
      searchTerm,
      page,
      filters?.category,
      filters?.country,
      filters?.lang,
      filters?.year,
      filters?.sort,
      lastVisible?._id,
      pageSize,
    ],
    queryFn: async () => {
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
  });
};
