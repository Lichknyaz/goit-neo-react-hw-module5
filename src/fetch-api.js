import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const API_HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGE5ZWU2ZThjMGFkNWJlZTFkMjNiNDA3YzM3MzJhZiIsIm5iZiI6MTczOTU0MDM3MC41NTIsInN1YiI6IjY3YWY0NzkyYTI0YmQ4ZjcxMDFjYzgzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NDVkowpA0hx8eLXbV9QpeyOLP3slwB9YwNpZKj-VqOI",
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get("trending/movie/day", {
      headers: API_HEADERS,
      params: { language: "en-US" },
    });
    return response.data.results;
  } catch (err) {
    console.error("Error fetching movies:", err);
  }
};

export const fetchSearchMovie = async (query) => {
  try {
    const response = await axios.get("search/movie", {
      headers: API_HEADERS,
      params: { language: "en-US", query: query },
    });
    return response.data.results;
  } catch (err) {
    console.error("Error fetching movies:", err);
  }
};

export const fetchMovieById = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}`, {
      headers: API_HEADERS,
      params: { language: "en-US" },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching movies:", err);
  }
};

export const fetchMovieCast = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}/credits`, {
      headers: API_HEADERS,
      params: { language: "en-US" },
    });
    return response.data.cast;
  } catch (err) {
    console.error("Error fetching movies:", err);
  }
};

export const fetchMovieReview = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}/reviews`, {
      headers: API_HEADERS,
      params: { language: "en-US" },
    });
    return response.data.results;
  } catch (err) {
    console.error("Error fetching movies:", err);
  }
};
