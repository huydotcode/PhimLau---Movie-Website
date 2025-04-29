import { useQuery } from "@tanstack/react-query";
import {
  getAllCategories,
  getTopCategories,
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
