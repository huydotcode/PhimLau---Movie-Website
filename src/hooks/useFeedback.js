import { useQuery } from "@tanstack/react-query";
import { getAllFeedback } from "../services/feedbackService";

export const useFeedback = () => {
  return useQuery({
    queryKey: ["feedback"],
    queryFn: getAllFeedback,
  });
};
