import axios from "axios";
import type { Restaurant, RestaurantsResponse } from "@/types/restaurant";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000
});

export interface GetRestaurantsParams {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
}

export const getRestaurants = async (
  params: GetRestaurantsParams = {}
): Promise<RestaurantsResponse> => {
  const { data } = await api.get<RestaurantsResponse>("/restaurants", { params });
  return data;
};

export const getRestaurant = async (id: string): Promise<Restaurant> => {
  const { data } = await api.get<Restaurant>(`/restaurants/${id}`);
  return data;
};

export default api;
