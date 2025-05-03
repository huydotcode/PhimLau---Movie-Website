import { useQuery } from "@tanstack/react-query";
import { getCommentsByMovieId } from "../services/commentService";

export const useCommentByMovieId = ({ enable = true, movieId }) => {
  return useQuery({
    queryKey: ["comments", movieId],
    queryFn: () => getCommentsByMovieId(movieId),
    enabled: enable && !!movieId,
    initialData: [],
  });
};
