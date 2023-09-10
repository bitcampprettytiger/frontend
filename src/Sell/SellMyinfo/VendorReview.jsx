import '../../Menu/MyPage/MyPageComponents/MyReview.css';
import StarIcon from '@mui/icons-material/Star';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  fetchReviewsByVendorId,
  deleteReview as deleteReviewAPI,
} from '../../Menu/Home/HomeComponents/HomeApi.jsx';
import { useReviewContext } from '../../Menu/MyPage/MyPageComponents/ReviewContext.jsx';
import Header from '../SellLayout/SellHeader';
import SellFooter from '../SellLayout/SellFooter';
import Typography from '@mui/material/Typography';
import { yellow } from '@mui/material/colors';

function VendorReview({ reviewsData, setReviewsData, token }) {
  const { vendorId } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { reviews: contextReviews, setReviews: setContextReviews } =
    useReviewContext();

  useEffect(() => {
    const fetchVendorSpecificReviews = async () => {
      try {
        const response = await fetchReviewsByVendorId(vendorId);
        if (response.status === 200) {
          const fetchedReviews = response.data.item.reviews || [];
          setContextReviews(fetchedReviews);
        }
      } catch (error) {
        alert('리뷰를 가져오는데 실패했습니다. 다시 시도해주세요.');
      }
    };
    fetchVendorSpecificReviews();
  }, [vendorId]);

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReviewAPI(reviewId, token);
      const updatedReviews = contextReviews.filter(
        (review) => review.id !== reviewId
      );
      setContextReviews(updatedReviews);
    } catch (error) {
      alert('리뷰 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div className="App-main2">
        <Header />
        <div className="myreview-container">
          <h3>{contextReviews?.length || 0}개의 리뷰</h3>
          <hr className="review-divider" />
          {Array.isArray(contextReviews) &&
            contextReviews.map((review, index) => {
              if (!review) {
                return null;
              }
              return (
                <div key={review.reviewId || index} className="review-item">
                  {/* 가게 이름 */}
                  <div className="review-header">
                    <span className="store-name">
                      {review.orders?.vendor?.vendorName || '가게명 정보 없음'}
                    </span>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteReview(review.reviewId)}
                    >
                      <DeleteForeverIcon className="delete-icon" />
                    </button>
                  </div>

                  {/* 별점 */}
                  <div className="star-container">
                    {Array.from({ length: review.reviewScore || 0 }).map(
                      (_, idx) => (
                        <StarIcon
                          key={idx}
                          className="star-icon"
                          style={{ color: yellow[500] }}
                        />
                      )
                    )}
                  </div>

                  {/* 이미지 */}
                  {Array.isArray(review.reviewFileList) &&
                    review.reviewFileList
                      .slice(0, 3)
                      .map((imageData, imgIdx) => (
                        <img
                          key={imgIdx}
                          src={imageData.fileUrl}
                          alt={`Review Image ${imgIdx}`}
                          className="review-image"
                        />
                      ))}

                  {/* 리뷰 내용 */}
                  <Typography
                    className={
                      isExpanded ? 'expanded-class' : 'collapsed-class'
                    }
                  >
                    {review.reviewContent}
                  </Typography>

                  {/* (다른 내용들) */}
                </div>
              );
            })}
        </div>
      </div>
      <SellFooter />
    </>
  );
}

const MemoizedVendorReview = React.memo(VendorReview);
export default MemoizedVendorReview;
