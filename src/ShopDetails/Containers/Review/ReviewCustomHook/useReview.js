import { useState, useEffect } from "react";
import axios from "axios";

const useReview = (vendorId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const isLiked = (review) => review.likeCount > 0;
  const isDisliked = (review) => review.disLikeCount > 0;

  useEffect(() => {
    setLoading(true);
    axios.get(`http://27.96.135.75/reviews/review-list/${vendorId}`)
      .then((res) => {
        setLoading(false);
        if (res.data.statusCode === 200) {
          const modifiedReviews = res.data.itemlist.map((review) => ({
            ...review,
            isLiked: isLiked(review),
            isDisliked: isDisliked(review),
          }));
          setReviews(modifiedReviews);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, [vendorId]);

  return { reviews, loading };
};

export default useReview;