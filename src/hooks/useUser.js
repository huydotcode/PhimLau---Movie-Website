import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/userService";

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
    initialData: [],
  });
};
