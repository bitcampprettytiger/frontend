import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyReview.css';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchReviewsByVendorId, createReview, updateReview, deleteReview as deleteReviewAPI, API_BASE_URL, getHeaders } from '../../Home/HomeComponents/HomeApi.jsx';
import { Reviews } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function MyReview({ reviewsData, setReviewsData, token }) {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);


    const [isButtonClicked, setButtonClicked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const vendorId = 1;
    const navigate = useNavigate();


    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setCurrentReview(null);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 480,
        height: 550,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };


    const deleteReviewAPI = async (reviewId, navigate) => {
        try {
            // getHeaders 함수를 사용하여 헤더를 가져옵니다.
            const headers = getHeaders(navigate);

            const response = await axios.delete(`${API_BASE_URL}/reviews/review?reviewId=${reviewId}`
                , {


                    headers: headers
                });

            if (response.status !== 200) {
                throw new Error('Server returned an unexpected status code');
            }

            return response.data;
        } catch (error) {
            throw error;
        }
    };







    // 리뷰를 삭제하는 함수
    const handleDeleteReview = async (reviewId) => {
        try {
            await deleteReviewAPI(reviewId, token, navigate);
            const updatedReviews = reviews.filter(review => review.id !== reviewId);
            setReviews(updatedReviews);
        } catch (error) {
            alert('Failed to delete review. Please try again.');
        }
    };


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetchReviewsByVendorId(vendorId);
                console.log(response);
                if (response.status === 200) {
                    setReviews(response.data.itemlist);
                    console.log(response.data.itemlist);
                }
            } catch (error) {
                alert('Failed to fetch reviews. Please try again.');  // User-friendly error message
            }
        };

        fetchReviews();
    }, []);

    const handleCreateReview = async (reviewDto, files) => {  // Added 'async' keyword
        try {
            const response = await createReview(reviewDto, files);  // Added 'await'
            if (response.status === 200) {
                // 리뷰가 성공적으로 생성되면, 다시 데이터를 로드합니다.
                const newReviews = await fetchReviewsByVendorId(vendorId);  // Added 'await'
                setReviews(newReviews.data);
            } else {
                // Handle unsuccessful HTTP response
                alert('Failed to create review. Please try again.');
            }
        } catch (error) {
            console.error('Failed to create review:', error);
            // Added user-friendly error alert
            alert('An error occurred while creating the review. Please try again.');
        }
    };

    return (
        <div className='App-main2'>
            <Header page="myreview" />
            <div className='myreview-container'>
                <h3>내가 쓴 총{reviews?.length || 0}개의 리뷰</h3>
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