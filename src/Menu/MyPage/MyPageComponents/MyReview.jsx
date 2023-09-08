import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyReview.css';
import StarIcon from '@mui/icons-material/Star';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom'; // 현재 코드에서 사용되지 않는데 필요하면 유지해주세요.
import React, { useEffect, useState } from 'react';
import { fetchReviewsByMemberId, deleteReview as deleteReviewAPI } from '../../Home/HomeComponents/HomeApi.jsx';
import { useReviewContext } from './ReviewContext.jsx';
import { yellow } from '@mui/material/colors';
import { Modal, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';




function MyReview({ reviewsData, setReviewsData, token }) {
    const [isModalOpen, setModalOpen] = useState(false); // 모달 오픈 여부
    const [currentReview, setCurrentReview] = useState(null); // 현재 선택된 리뷰
    const [isButtonClicked, setButtonClicked] = useState(false); // 버튼 클릭 여부
    const [isExpanded, setIsExpanded] = useState(false); // 리뷰 내용 확장 여부
    const [reviews, setReviews] = useState([]);  // Local state for reviews

    const StyledButton = styled(Button)({
        border: 'none',
        color: 'blue',
        fontSize: '1rem',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        padding: 0, // 이 부분을 추가하여 패딩을 제거
        '&:hover': {
            textDecoration: 'underline',
        },
    });

    // 리뷰 텍스트와 버튼을 포함하는 컨테이너 스타일
    const ReviewContainer = styled.div({
        display: 'inline-flex',
        alignItems: 'center',
    });


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

    const openReviewModal = (review) => {
        setCurrentReview(review);
        setModalOpen(true);
    };


    const handleClose = () => {
        setModalOpen(false);
        setCurrentReview(null);
    }; // 모달을 닫는 함수

    const MAX_LINES = 2;
    const MAX_CHARACTERS = 30;

    const formatReviewContent = (content) => {
        const lines = content.split('\n');
        if (lines.length <= 3) {
            return content;
        }

        const limitedContent = lines.slice(0, 2).join('\n');
        const thirdLine = lines[2];
        const displayedThirdLine = thirdLine.slice(0, thirdLine.lastIndexOf(' ')) + '...';

        return limitedContent + '\n' + displayedThirdLine;
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetchReviewsByMemberId();
                console.log("가져온 리뷰 데이터:", response);
                if (response.status === 200) {
                    const fetchedReviews = response.data.item.reviews || [];
                    setReviews(fetchedReviews);
                }
            } catch (error) {

            }
        };
        fetchReviews();
    }, []);

    const handleDeleteReview = async (reviewId) => {
        try {
            await deleteReviewAPI(reviewId, token);
            const updatedReviews = reviews.filter(review => review.id !== reviewId);
            setReviews(updatedReviews);
        } catch (error) {
            alert('리뷰 삭제에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className='App-main2'>
            <Header page="myreview" />
            <div className='myreview-container'>
                <h3>내가 쓴 총{reviews?.length || 0}개의 리뷰</h3>
                <hr className="review-divider" />
                {Array.isArray(reviews) && reviews.map((review, index) => {
                    const isLongContent = review.reviewContent?.length > MAX_CHARACTERS;
                    const displayedContent = isLongContent
                        ? formatReviewContent(review.reviewContent)
                        : review.reviewContent;

                    return (
                        <div key={review.reviewId || index} className="review-item">
                            <div className="review-header">
                                <span className="store-name">
                                    {review.orders?.vendor?.vendorName || '가게명 정보 없음'}
                                </span>
                                <button className="delete-btn" onClick={() => handleDeleteReview(review.reviewId)}>
                                    <DeleteForeverIcon className="delete-icon" />
                                </button>
                            </div>

                            <div className="star-container">
                                {Array.from({ length: review.reviewScore || 0 }).map((_, idx) => (
                                    <StarIcon key={idx} className="star-icon" style={{ color: yellow[500] }} />
                                ))}
                                <span className="review-date">
                                    {review.reviewRegDateTimeFormatted?.split(" ")[0] || '날짜 정보 없음'}
                                </span>
                            </div>

                            <ReviewContainer>
                                <Typography className={isExpanded ? 'expanded-class' : 'collapsed-class'}>
                                    {displayedContent}
                                </Typography>

                                {isLongContent && (
                                    <StyledButton
                                        onClick={() => openReviewModal(review)}
                                        className="more-button"
                                        size="small"
                                        color="primary"
                                        variant="text"
                                    >
                                        ...더보기
                                    </StyledButton>
                                )}
                            </ReviewContainer>

                            {Array.isArray(review.reviewFileList) && review.reviewFileList.slice(0, 3).map((image, imgIdx) => (
                                <div key={imgIdx} onClick={() => openReviewModal(review)}>
                                    {imgIdx === 2 && review.reviewFileList.length > 3 ? (
                                        <div className="review-image-overlay">
                                            <img src={image.fileUrl} alt={`Review Image ${imgIdx}`} className="review-image" />
                                            <div className="plus-icon-container">
                                                <AddIcon style={{ color: '#fff' }} />
                                            </div>
                                        </div>
                                    ) : (
                                        <img src={image.fileUrl} alt={`Review Image ${imgIdx}`} className="review-image" />
                                    )}
                                </div>
                            ))}

                            <div className="menu-buttons">
                                {review.orders?.orderMenuList?.map((orderMenu, menuIdx) => (
                                    <Button
                                        key={menuIdx}
                                        variant="contained"
                                        style={{
                                            backgroundColor: 'white',
                                            margin: '5px',
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                            border: 'none'
                                        }}
                                    >
                                        {orderMenu.menu.menuName}
                                    </Button>
                                ))}
                            </div>

                        </div>
                    );
                })}

                <Modal open={isModalOpen} onClose={handleClose}>
                    <Box sx={{ ...style, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {currentReview?.reviewFileList?.map((img, idx) => (
                            <img key={idx} src={img.fileUrl} alt={`review-${idx}`} style={{ width: 'calc(33.33% - 10px)', margin: '5px', objectFit: 'cover' }} />
                        ))}
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} className={isExpanded ? '' : 'review-text'}>
                            {currentReview?.reviewContent}
                        </Typography>
                    </Box>
                </Modal>
            </div>
            <Footer type="myreview" />
        </div>
    );
}

const MemoizedMyReview = React.memo(MyReview);
export default MemoizedMyReview;