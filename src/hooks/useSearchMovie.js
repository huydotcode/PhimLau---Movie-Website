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

      // Nếu không có dữ liệu, thử tìm data mà bỏ filters.country
      if (
        !data?.movies?.length &&
        filters?.country &&
        filters?.country !== "" &&
        filters?.category !== "" &&
        filters?.category !== undefined
      ) {
        const newData = await searchMovies({
          filters: { ...filters, country: "" },
          lastVisible,
          page,
          pageSize,
          searchTerm,
        });
        return newData;
      }

      return data;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
