import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function MovieReviews() {
  const { reviews } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!reviews) {
      navigate("..", { replace: true });
    }
  }, [reviews, navigate]);

  if (!reviews) {
    return null;
  }
  return (
    <>
      {reviews.length > 0 ? (
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
