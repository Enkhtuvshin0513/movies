import { useQuery } from "@tanstack/react-query";
import { getRestaurants, type GetRestaurantsParams } from "@/services/api";

export const useRestaurants = (params: GetRestaurantsParams) =>
  useQuery({
    queryKey: ["restaurants", params],
    queryFn: () => getRestaurants(params)
  });
