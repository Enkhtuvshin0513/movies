export interface Restaurant {
  cuisine: string | undefined;
  borough: string[];
  name: string;
  address: string | undefined;
}

export interface RestaurantsResponse {
  restaurants: Restaurant[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
