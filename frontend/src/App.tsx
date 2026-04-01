import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RestaurantsPage from "@/pages/restaurants/RestaurantsPage";
import RestaurantDetailPage from "@/pages/restaurants/RestaurantDetailPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RestaurantsPage />} />
        <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
