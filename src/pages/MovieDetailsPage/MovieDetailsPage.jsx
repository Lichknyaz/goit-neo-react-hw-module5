import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { useEffect, useState } from "react";
import {
  fetchMovieById,
  fetchMovieCast,
  fetchMovieReview,
} from "../../fetch-api";

function MovieDetailsPage() {
  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    year: "",
    overview: "",
    userScore: "",
    genres: "",
  });
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state ?? "/movies";

  useEffect(() => {
    const fetchCast = async () => {
      if (!cast) {
        const result = await fetchMovieCast(movieId);
        setCast(result);
      }
    };
    const fetchReviews = async () => {
      if (!reviews) {
        const result = await fetchMovieReview(movieId);
        setReviews(result);
      }
    };
    fetchCast();
    fetchReviews();
  }, [movieId, cast, reviews]);

  useEffect(() => {
    setIsLoading(true);
    const fetchDetails = async () => {
      try {
        const {
          title,
          release_date,
          overview,
          vote_average,
          genres,
          poster_path,
        } = await fetchMovieById(movieId);
        setMovieDetails({
          title: title,
          year: `(${release_date.split("-")[0]})`,
          overview: overview,
          userScore: `${(vote_average * 10).toFixed(0)}%`,
          genres: genres.map((genre) => genre.name).join(" "),
          poster: `https://image.tmdb.org/t/p/w500${poster_path}`,
        });
      } catch (err) {
        console.log("err", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [movieId]);

  return (
    <>
      {!isLoading && (
        <div className={css.container}>
          <Link to={backLinkHref}>
            <button type="click">⬅️Go back</button>
          </Link>
          <div className={css.card}>
            <div className={css.hero}>
              <div className={css.image}>
                <img
                  src={movieDetails.poster}
                  alt={movieDetails.title}
                  width={200}
                  height={300}
                />
              </div>
              <div className={css.film}>
                <h2>
                  {movieDetails.title} {movieDetails.year}
                </h2>
                <p>User score: {movieDetails.userScore}</p>
                <h3>Overview</h3>
                <p>{movieDetails.overview}</p>
                <h4>Genres</h4>
                <p>{movieDetails.genres}</p>
              </div>
            </div>
            <hr />
            <div>
              <p>Additional information</p>
              <ul>
                <li>
                  <Link to="cast" state={location.state}>
                    Cast
                  </Link>
                </li>
                <li>
                  <Link to="reviews" state={location.state}>
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            <hr />
            <Outlet context={{ cast, reviews }} />
          </div>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
    </>
  );
}

export default MovieDetailsPage;
