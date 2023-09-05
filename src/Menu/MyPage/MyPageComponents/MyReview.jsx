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
import { yellow } from '@mui/material/colors';

function MyReview({ reviewsData, setReviewsData, token }) {
    // 상태 변수들을 정의합니다.
    const [reviews, setReviews] = useState([]); // 사용자의 리뷰 목록
    const [isModalOpen, setModalOpen] = useState(false); // 모달 오픈 여부
    const [currentReview, setCurrentReview] = useState(null); // 현재 선택된 리뷰
    const [isButtonClicked, setButtonClicked] = useState(false); // 버튼 클릭 여부
    const [isExpanded, setIsExpanded] = useState(false); // 리뷰 내용 확장 여부

    const handleClose = () => {
        setModalOpen(false);
        setCurrentReview(null);
    }; // 모달을 닫는 함수

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
    }; // 모달의 스타일

    useEffect(() => {
        console.log("현재 리뷰 상태:", reviews);
    }, [reviews]); // 리뷰 상태 변화를 콘솔에 출력하는 함수

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetchReviewsByMemberId();
                console.log("가져온 리뷰 데이터:", response);
                if (response.status === 200) {
                    setReviews(response.data.itemlist);
                }
            } catch (error) {
                alert('리뷰를 가져오는데 실패했습니다. 다시 시도해주세요.');
            }
        };
        fetchReviews();
    }, []); // 페이지 로드 시 사용자의 리뷰를 불러오는 함수

    const handleDeleteReview = async (reviewId) => {
        try {
            await deleteReviewAPI(reviewId, token);
            const updatedReviews = reviews.filter(review => review.id !== reviewId);
            setReviews(updatedReviews);
        } catch (error) {
            alert('리뷰 삭제에 실패했습니다. 다시 시도해주세요.');
        }
    }; // 리뷰를 삭제하는 함수

    return (
        <div className='App-main2'>
            <Header page="myreview" />
            <div className='myreview-container'>
                <h2>내가 쓴 총 {reviews?.length || 0}개의 리뷰</h2>
                <hr className="review-divider" />
                {Array.isArray(reviews) && reviews.map((review, index) => {
                    if (!review) {
                        console.log(`인덱스 ${index}의 리뷰 데이터가 누락되었습니다.`);
                        return null;
                    }
                    return (
                        <div key={review.reviewId || index} className="review-item">
                            // 리뷰 이미지 표시
                            {Array.isArray(review.reviewFileList) && review.reviewFileList.slice(0, 3).map((image, imgIdx) => (
                                <img key={imgIdx} src={image} alt={`Review Image ${imgIdx}`} className="review-image" />
                            ))}
                            // 리뷰 상점 이름과 삭제 버튼 표시
                            <div className="review-header">
                                <span className="store-name">
                                    {review.orders?.vendor?.vendorName || '가게명 정보 없음'}
                                </span>
                                <button className="delete-btn" onClick={() => handleDeleteReview(review.reviewId)}>
                                    <DeleteForeverIcon className="delete-icon" />
                                </button>
                            </div>
                            // 리뷰 별점 표시
                            <div className="star-container">
                                {Array.from({ length: review.reviewScore || 0 }).map((_, idx) => (
                                    <StarIcon key={idx} className="star-icon" style={{ color: yellow[500] }} />
                                ))}
                            </div>
                            // 리뷰 내용 표시
                            <Typography className={isExpanded ? 'expanded-class' : 'collapsed-class'}>
                                {review.reviewContent}
                            </Typography>
                            // 리뷰 내용이 긴 경우 접기/펼치기 버튼 표시
                            {review.reviewContent?.split('\n').length > 3 && (
                                <button onClick={() => {
                                    setIsExpanded(!isExpanded);
                                    setButtonClicked(!isButtonClicked);
                                }}
                                    style={{ border: 'none', background: 'none', cursor: 'pointer', outline: 'none' }}>
                                    <KeyboardArrowDownIcon style={{ color: isButtonClicked ? '#999' : '#000', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            <Modal open={isModalOpen} onClose={handleClose}>
                <Box sx={{ ...style, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {currentReview?.images?.map((img, idx) => (
                        <img key={idx} src={img} alt={`review-${idx}`} style={{ width: 'calc(33.33% - 10px)', margin: '5px', objectFit: 'cover' }} />
                    ))}
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} className={isExpanded ? '' : 'review-text'}>
                        {currentReview?.text}
                    </Typography>
                    {currentReview?.text?.split('\n').length > 3 && (
                        <button onClick={() => { setIsExpanded(!isExpanded); setButtonClicked(!isButtonClicked); }} style={{ border: 'none', background: 'none', cursor: 'pointer', outline: 'none' }}>
                            <KeyboardArrowDownIcon style={{ color: isButtonClicked ? '#999' : '#000', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                        </button>
                    )}
                </Box>
            </Modal>
            <Footer type="myreview" />
        </div>
    );
};

export default MyReview;