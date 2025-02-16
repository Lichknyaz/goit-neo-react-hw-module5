import { lazy, useEffect, useState } from "react";
import { fetchSearchMovie } from "../../fetch-api";
import { useLocation, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));
const SearchBar = lazy(() => import("../../components/SearchBar/SearchBar"));

function MoviesPage() {
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFound, setIsFound] = useState(true);
  const search = searchParams.get("query");
  const location = useLocation();

  useEffect(() => {
    if (search) {
      handleSearchMovies(search);
    }
  }, [search]);

  const handleSearchMovies = async (query) => {
    try {
      const result = await fetchSearchMovie(query);
      setSearchMovies(result);
      if (result.length > 0) {
        setIsFound(true);
      } else {
        setIsFound(false);
        toast("Sorry, no movies found");
      }
    } catch (err) {
      console.log("err", err);
      setIsFound(false);
      toast("An error occurred while searching movies");
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSearch={(query) => setSearchParams({ query })} />
      {isFound && <MovieList movies={searchMovies} location={location} />}
    </div>
  );
}

export default MoviesPage;
