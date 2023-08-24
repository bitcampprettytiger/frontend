import { useState, useEffect } from "react";
import axios from "axios";

const useReview = (vendorId) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getReview = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://27.96.135.75/reviews/review-list`);
        setReviews(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getReview();
  }, [vendorId]);

  return { reviews, error, loading };
};

export default useReview;
