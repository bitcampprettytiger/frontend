import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyReview.css';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'; // 사용되지 않음, 제거
import StarIcon from '@mui/icons-material/Star';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // 사용되지 않음, 제거
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchReviewsByMemberId, deleteReview as deleteReviewAPI, API_BASE_URL, getHeaders } from '../../Home/HomeComponents/HomeApi.jsx'; // 필요없는 함수와 임포트 제거
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyReview({ reviewsData, setReviewsData, token }) {
    // useState 정의 부분
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);
    const [isButtonClicked, setButtonClicked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    // 모달을 열고 닫는 함수
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => {
        setModalOpen(false);
        setCurrentReview(null);
    };

    // 리뷰를 삭제하는 함수
    const handleDeleteReview = async (reviewId) => {
        try {
            await deleteReviewAPI(reviewId, token, navigate);
            const updatedReviews = reviews.filter(review => review.id !== reviewId);
            setReviews(updatedReviews);
        } catch (error) {
            alert('리뷰 삭제에 실패했습니다. 다시 시도해주세요.');
        }
    };

    // 사용자 리뷰 데이터를 가져오는 함수
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetchReviewsByMemberId();
                if (response.status === 200) {
                    setReviews(response.data.itemlist);
                }
            } catch (error) {
                alert('리뷰를 가져오는데 실패했습니다. 다시 시도해주세요.');
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className='App-main2'>
            <Header page="myreview" />
            <div className='myreview-container'>
                <h2>내가 쓴 총 {reviews?.length || 0}개의 리뷰</h2>
                <hr className="review-divider" />

                {Array.isArray(reviews) && reviews.map((review, index) => (
                    <div key={review.id || index} className="review-item">
                        {/* 리뷰 이미지 추가 */}
                        <div className="review-images">
                            {Array.isArray(review.images) && review.images.slice(0, 3).map((image, imgIdx) => (
                                <img
                                    key={imgIdx}
                                    src={image}
                                    alt={`Review Image ${imgIdx}`}
                                    className="review-image"
                                />
                            ))}
                        </div>
                        <div className="review-header">
                            <span className="store-name">
                                <Link to={`/review-detail/${review.reviewId}`}>

                                    {/* <Link to={`/store/${review.reviewId}`}> */}
                                    {review.orders?.vendor?.vendorName}
                                </Link>
                            </span>
                            <button className="delete-btn" onClick={() => handleDeleteReview(review.reviewId)}>
                                <DeleteForeverIcon className="delete-icon" />
                            </button>
                        </div>
                        <div className="star-container">
                            {Array.from({ length: review.reviewScore || 0 }).map((_, idx) => (
                                <StarIcon key={idx} className="star-icon" style={{ color: yellow[500] }} />
                            ))}
                        </div>
                        <Typography
                            className={isExpanded ? 'expanded-class' : 'collapsed-class'}  // added class names
                        >
                            {review.reviewContent}
                        </Typography>
                        {review.reviewContent?.split('\n').length > 3 && (
                            <button
                                onClick={() => {
                                    setIsExpanded(!isExpanded);
                                    setButtonClicked(!isButtonClicked);
                                }}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                <KeyboardArrowDownIcon
                                    style={{
                                        color: isButtonClicked ? '#999' : '#000',
                                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s'
                                    }}
                                />
                            </button>
                        )}
                    </div>
                ))}

                <Modal open={isModalOpen} onClose={handleClose}>
                    <Box sx={{
                        ...style,
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {currentReview?.images?.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`review-${idx}`}
                                    style={{ width: 'calc(33.33% - 10px)', margin: '5px', objectFit: 'cover' }}
                                />
                            ))}
                        </div>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} className={isExpanded ? '' : 'review-text'}>
                            {currentReview?.text}
                        </Typography>
                        {currentReview?.text?.split('\n').length > 3 && (
                            <button
                                onClick={() => {
                                    setIsExpanded(!isExpanded);
                                    setButtonClicked(!isButtonClicked);
                                }}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                <KeyboardArrowDownIcon
                                    style={{
                                        color: isButtonClicked ? '#999' : '#000',
                                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s'
                                    }}
                                />
                            </button>
                        )}
                    </Box>
                </Modal>
            </div>
            <Footer type="myreview" />
        </div>
    );
};
export default MyReview;    