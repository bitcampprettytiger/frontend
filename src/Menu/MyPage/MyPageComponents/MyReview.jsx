import React from 'react'
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
import useReviews from '../../MyPageCustomHooks/useReviews.jsx';
import useModal from '../../MyPageCustomHooks/useModal.jsx';

function MyReview() {
    const { reviews } = useReviews();
    const { isModalOpen, currentReview, handleOpen, handleClose } = useModal();

    const [isButtonClicked, setButtonClicked] = React.useState(false);
    const [isExpanded, setIsExpanded] = React.useState(false);

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

    return (
        <div className='App-main2'>
            <Header page="myreview" />
            <div className='myreview-container'>
                <h2>내가 쓴 총 {reviews.length}개의 리뷰</h2>
                <hr className="review-divider" />

                {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <div className="review-header">
                            <span className="store-name">{review.storeName}</span>
                            <button className="navigate-btn">
                                <KeyboardArrowRightIcon className="navigate-icon" />
                            </button>
                            <button className="delete-btn">
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
                        <Typography className={isExpanded ? '' : 'review-text'}>
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
