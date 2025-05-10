import { useQuery } from "@tanstack/react-query";

import { getAllNotifications } from "../services/notificationService";

export const useAllNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
  });
};
