import { useQuery } from "@tanstack/react-query";
import { getRestaurant } from "@/services/api";

export const useRestaurant = (name: string) =>
  useQuery({
    queryKey: ["restaurant", name],
    queryFn: () => getRestaurant(name),
    enabled: !!name
  });
