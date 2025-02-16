import { useNavigate, useOutletContext } from "react-router-dom";
import css from "./MovieCast.module.css";
import { useEffect } from "react";

function MovieCast() {
  const { cast } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cast) {
      navigate("..", { replace: true });
    }
  }, [cast, navigate]);

  if (!cast) {
    return null;
  }

  return (
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
  );
}

export default MovieCast;
