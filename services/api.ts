export const TMDB_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_MOVIE_API_URL,
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};
export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const respose = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!respose.ok) {
    //@ts-ignore
    throw new Error(`Failed to fetch movies: ${respose.statusText}`);
  }

  const data = await respose.json();

  return data.results;
};
