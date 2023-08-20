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




function MyReview() {

    const [isModalOpen, setModalOpen] = React.useState(false);//모달창보이기
    const [currentReview, setCurrentReview] = React.useState(null);//모달창숨기기

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 480,  // `.myreview-container`와 동일
        height: 550, // `.myreview-container`와 동일
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    //더보기버튼 클릭상태
    const [isButtonClicked, setButtonClicked] = React.useState(false);
    const [isExpanded, setIsExpanded] = React.useState(false); //리뷰텍스트 펼치기


    // 임의의 리뷰 개수 (실제 데이터로 바꿔야 함)
    const reviewCount = 4;
    //임의 리뷰데이터
    const reviews = [
        {
            storeName: "은희네",
            starCount: 3,
            images: [
                "/images/review1.jpeg",
                "/images/review2.jpeg",
                "/images/review3.jpeg",
                "/images/review4.jpeg",
                "/images/review5.jpeg",
            ],
            text: "이것들은 그동안 내가 먹은 음식 사진들이당 얻은것은 결국 살뿐. 하지만 맛있었으면 됐지~ "
        },
        {
            storeName: "민규네",
            starCount: 5,
            images: [],
            text: "우웅ㅇㅇ우웅ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"
        },
        {
            storeName: "유진이네",
            starCount: 4,
            images: ["/images/review6.jpeg", "/images/review7.jpeg"],
            text: "신민규 짜증나 규네나 사줘 싯팔!"
        }
    ];

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
                                <div className="more-images" onClick={() => { setModalOpen(true); setCurrentReview(review); }}>+</div>
                            }
                        </div>
                        <Typography
                            className={isExpanded ? '' : 'review-text'}
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


                <Button onClick={handleOpen}>리뷰 상세보기</Button>
                <Modal
                    open={isModalOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
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
                        <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                            className={isExpanded ? '' : 'review-text'}
                        >
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