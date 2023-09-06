import { useState, useEffect } from "react";
import axios from "axios";

const useReview = (vendorId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 더 불러올 리뷰가 있는지 여부

  const isLiked = (review) => review.likeCount > 0;
  const isDisliked = (review) => review.disLikeCount > 0;

  const fetchReviews = (pageNumber) => {
    setLoading(true);
    axios.get(`https://mukjachi.site:6443/reviews/review-list/${vendorId}}?page=${pageNumber}`)
      .then((res) => {
        setLoading(false);
        if (res.data.statusCode === 200) {
          const modifiedReviews = res.data.itemlist.map((review) => ({
            ...review,
            isLiked: isLiked(review),
            isDisliked: isDisliked(review),
          }));
  
          // 더 불러올 리뷰가 있는지 확인
          if (modifiedReviews.length < 1) {
            setHasMore(false);
          } else {
            // 기존 리뷰와 새 리뷰 합
            setReviews(prevReviews => {
              const newReviews = [...prevReviews, ...modifiedReviews];
              // 중복을 제거한 최종 리뷰 배열
              const uniqueReviews = Array.from(new Set(newReviews.map(r => r.reviewId)))
                .map(id => newReviews.find(r => r.reviewId === id));
              return uniqueReviews;
            });
            setHasMore(true);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchReviews(1);
  }, [vendorId]);

  // 다음 페이지의 리뷰를 불러오는 함수
  const fetchMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        fetchReviews(nextPage);
        return nextPage;
      });
    
    }
  };

  return { reviews, loading, fetchMore, hasMore };
};

export default useReview;
