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
import { fetchReviewsByVendorId, createReview, updateReview, deleteReview as deleteReviewAPI } from '../../Home/HomeComponents/HomeApi.jsx';



function MyReview() {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);

    const [isButtonClicked, setButtonClicked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const vendorId = 1; // 임시로 1로 설정. 실제 로직에서는 변경 필요.


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


    // 임의의 리뷰 개수 (실제 데이터로 바꿔야 함)
    const reviewCount = 4;
    //임의 리뷰데이터

    // 리뷰를 삭제하는 함수
    const handleDeleteReview = async (reviewId) => {
        try {
            await deleteReviewAPI(reviewId);
            const updatedReviews = reviews.filter(review => review.id !== reviewId);
            setReviews(updatedReviews);
        } catch (error) {
            // More robust error handling
            alert('Failed to delete review. Please try again.');
        }
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetchReviewsByVendorId(vendorId);
                if (response.status === 200) {
                    setReviews(response.data);
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

    const handleDeleteReviewApiCall = async (reviewId) => {
        try {
            const response = await deleteReviewAPI(reviewId); // deleteReview API 호출
            if (response.status === 200) {
                // 성공적으로 삭제한 후에 다시 리뷰 목록을 로드
                const newReviews = await fetchReviewsByVendorId(vendorId);
                setReviews(newReviews.data);
            }
        } catch (error) {
            console.error('Failed to delete review:', error);
        }
    };




    return (
        <div className='App-main2'>
            <Header page="myreview" />
            <div className='myreview-container'>
                <h3>내가 쓴 총 {reviews.length}개의 리뷰</h3>
                <hr className="review-divider" />

                {reviews.map((review, index) => (
                    <div key={review.id || index} className="review-item"> {/* 고유한 값으로 key 설정 */}
                        <div className="review-header">
                            <span className="store-name">
                                <Link to={`/store/${review.vendorId}`}>{review.vendorName}</Link>
                            </span>
                            <button className="delete-btn" onClick={() => handleDeleteReview(review.id)}>
                                <KeyboardArrowRightIcon className="navigate-icon" />
                            </button>

                            <button className="delete-btn" onClick={() => handleDeleteReviewApiCall(review.id)}>
                                <DeleteForeverIcon className="delete-icon" />
                            </button>

                        </div>
                        <div className="star-container">
                            {Array.from({ length: review.starCount }).map((_, idx) => (
                                <StarIcon key={idx} className="star-icon" style={{ color: yellow[500] }} />
                            ))}
                        </div>

                        <div className="images-container">
                            {review.images.slice(0, 4).map((img, idx) => (
                                <img key={idx} src={img} alt={`review-${idx}`} className="review-image" />
                            ))}
                            {review.images.length > 4 &&
                                <div className="more-images" onClick={() => handleOpen(review)}>+</div>
                            }
                        </div>

                        <Typography
                            className={isExpanded ? 'expanded-class' : 'collapsed-class'}  // added class names
                        >

                            {review.text}
                        </Typography>

                        {review.text.split('\n').length > 3 && (
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
                            {currentReview?.images.map((img, idx) => (
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
                        {currentReview?.text.split('\n').length > 3 && (
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
}

export default MyReview;