import { useQuery } from "@tanstack/react-query";
import { getEpsicodesBySlug, getMovieBySlug } from "../services/movieService";

export const useMovie = ({ enabled = true, slug }) => {
  return useQuery({
    queryKey: ["movie", slug],
    queryFn: () => getMovieBySlug(slug),
    enabled,
  });
};

export const useEpsicodes = ({ enabled = true, slug }) => {
  return useQuery({
    queryKey: ["epsicodes", slug],
    queryFn: () => getEpsicodesBySlug(slug),
    enabled,
    initialData: [],
  });
};
