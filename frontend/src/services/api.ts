import type { Movie, MoviesResponse } from "@/types/movie";

const BASE_URL = "http://localhost:3000/api";

const getHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("auth-token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface GetMoviesParams {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
}

export const getMovies = async (
  params: GetMoviesParams = {}
): Promise<MoviesResponse> => {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("search", params.search);
  if (params.genre) query.set("genre", params.genre);

  const res = await fetch(`${BASE_URL}/movies?${query}`, {
    headers: getHeaders()
  });
  return res.json();
};

export const getMovie = async (id: string): Promise<Movie> => {
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    headers: getHeaders()
  });
  return res.json();
};

export const getUser = async (): Promise<{ id: string }> => {
  const userId = localStorage.getItem("auth-user-id");
  if (!userId) throw new Error("Not authenticated");
  const users: { id: string; email: string; password: string }[] = JSON.parse(
    localStorage.getItem("mock-users") || "[]"
  );
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error("User not found");
  return { id: user.id };
};

export const login = async (
  email: string,
  password: string
): Promise<{ id: string; email: string }> => {
  const users: { id: string; email: string; password: string }[] = JSON.parse(
    localStorage.getItem("mock-users") || "[]"
  );
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error("Invalid credentials");
  return { id: user.id, email: user.email };
};

export const signup = async (
  email: string,
  password: string
): Promise<{ id: string; email: string }> => {
  const users: { id: string; email: string; password: string }[] = JSON.parse(
    localStorage.getItem("mock-users") || "[]"
  );
  if (users.find((u) => u.email === email)) {
    throw new Error("User already exists");
  }
  const user = { id: Date.now().toString(), email, password };
  users.push(user);
  localStorage.setItem("mock-users", JSON.stringify(users));
  return { id: user.id, email: user.email };
};
