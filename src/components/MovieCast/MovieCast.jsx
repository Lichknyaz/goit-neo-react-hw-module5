import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";
import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../fetch-api";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const result = await fetchMovieCast(movieId);
        setCast(result);
      } catch (err) {
        console.error("Error fetching cast:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) {
    return <p>Loading cast...</p>;
  }

  return (
    <>
      {cast && cast.length > 0 ? (
        <ul>
          {cast.map((actor) => {
            return (
              <li key={actor.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  className={css.image}
                />
                <p>{actor.name}</p>
                <p>Character: {actor.character}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No cast for this film</p>
      )}
    </>
  );
}

export default MovieCast;
