import { useState, useEffect } from "react";
import axios from "axios";

const useReview = (vendorId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const isLiked = (review) => review.likeCount > 0;
  const isDisliked = (review) => review.disLikeCount > 0;

  useEffect(() => {
    setLoading(true);
<<<<<<< HEAD
    axios.get(`http://192.168.0.240:1004/reviews/review-list/${vendorId}`)
=======
    axios.get(`https://mukjachi.site:6443/reviews/review-list/${vendorId}`)
>>>>>>> dfbbd0f7aed48255a114d10846631cf192d41633
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