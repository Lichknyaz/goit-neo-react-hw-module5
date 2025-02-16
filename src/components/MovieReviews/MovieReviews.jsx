import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReview } from "../../fetch-api";

function MovieReviews() {
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await fetchMovieReview(movieId);
        setReviews(result);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <>
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No reviews for this film</p>
      )}
    </>
  );
}

export default MovieReviews;
