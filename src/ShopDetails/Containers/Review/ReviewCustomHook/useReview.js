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
        const res = await axios.get(`http://27.96.135.75/reviews/review-list/${vendorId}`);
        if (res.data.statusCode === 200) {
            setReviews(res.data.itemlist);
        } else {
            setError(new Error(res.data.errorMessage));
        }
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