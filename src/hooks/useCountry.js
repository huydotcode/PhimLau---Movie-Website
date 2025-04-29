import { useQuery } from "@tanstack/react-query";
import { getAllCountries } from "../services/countryService";

export const useAllCountries = ({ enable = true }) => {
  return useQuery({
    queryKey: ["allCountries"],
    queryFn: getAllCountries,
    enabled: enable,
    // staleTime: 5 * 60 * 1000, // cache 5 phút
    initialData: [],
  });
};
