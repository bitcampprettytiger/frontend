import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useParams } from 'react-router-dom';
import useReview from '../ReviewCustomHook/useReview';
import { createReview } from '../../../../Menu/Home/HomeComponents/HomeApi';


function ReviewForm() {
  const { orderId, vendorId } = useParams();
  const { reviews, error, loading, isLiked, isDisliked } = useReview(vendorId); // 추출한 vendorId를 useReview에 넘김

  const [likeBtnSelected, setLikeBtnSelected] = useState(false);

  const [dislikeBtnSelected, setDislikeBtnSelected] = useState(false);
  const [reviewText, setReviewText] = useState(""); // 리뷰 텍스트를 위한 상태
  const [rating, setRating] = useState(0); // 평점을 위한 상태

  const handleLikeBtnClick = () => {
    setLikeBtnSelected(true);
    setDislikeBtnSelected(false);
  };

  const handleDislikeBtnClick = () => {
    setLikeBtnSelected(false);
    setDislikeBtnSelected(true);
  };
  const handleReviewChange = (e) => {
    setReviewText(e.target.value); // 리뷰 텍스트 업데이트
  };

  const handleRatingChange = (e, newValue) => {
    setRating(newValue); // 평점 업데이트
  };
  const handleReviewSubmit = async () => {
    if (!vendorId) {
      console.error("vendorId가 없어!!!!");
      return;
    }
    console.log("handleReviewSubmit called"); // 함수가 호출되었는지 확인
    // 값이 제대로 반환되는지 확인

    console.log("useParams:", { orderId, vendorId });  // 여기에서는 이미 얻어온 orderId와 vendorId를 사용

    // 상태가 제대로 업데이트되는지 확인
    console.log("Current State - reviewText:", reviewText, "rating:", rating);


    // 여기에서 createReview 함수를 호출하여 리뷰를 저장
    // reviewDto, files, token 채워야함
    const reviewDto = {
      text: reviewText,
      rating,
      vendorId,
      // ... 다른 필요한 데이터
    };

    console.log("Review DTO:", reviewDto); // DTO가 어떻게 생성되었는지 확인


    const files = [];
    const token = localStorage.getItem('accessToken');

    console.log("Access Token:", token); // 토큰이 올바르게 로딩되었는지 확인


    try {
      const result = await createReview(reviewDto, files, token);
      console.log("API Call Result:", result); // API 호출 결과 확인

      if (result) {  // result가 null이나 undefined가 아니라면
        console.log("리뷰가 성공적으로 저장되었습니다.", result);
      } else {
        console.log("리뷰 저장에 실패했습니다. 결과가 없습니다.");
      }
    } catch (error) {
      console.error("리뷰 저장 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <IconButton edge="start" aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1, color: 'black', fontSize: '110%' }}
            component="div"
          >
            리뷰 작성
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ textAlign: 'left', paddingLeft: '10%' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: '17px',
            fontWeight: 'bold',
            color: 'black',
            paddingTop: '20px',
          }}
        >
          가게 이름
        </Typography>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: '15px',
            color: 'black',
            paddingTop: '20px',
            fontWeight: 'bold',
          }}
        >
          음식은 어떠셨나요?
        </Typography>
        <Rating value={null} />
        <Typography
          sx={{
            fontSize: '15px',
            color: 'black',
            paddingTop: '20px',
            fontWeight: 'bold',
          }}
        >
          위생은 어떠셨나요?
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10vw',
          }}
        >
          <Button
            variant={likeBtnSelected ? "contained" : "outlined"}
            startIcon={
              likeBtnSelected ? (
                <SentimentSatisfiedAltIcon sx={{ color: "white" }} />
              ) : (
                <SentimentSatisfiedAltIcon />
              )
            }
            onClick={handleLikeBtnClick}
            sx={{
              borderRadius: "20px",
              borderColor: !likeBtnSelected && "#D9D9D9",
              backgroundColor: likeBtnSelected ? "#FF745A" : "white",
              color: likeBtnSelected ? "white" : "black",
              "&:hover": {
                borderWidth: "1.5px",
                borderColor: "#FF745A",
              },
            }}
          >
            좋아요
          </Button>
          <Button
            variant={dislikeBtnSelected ? "contained" : "outlined"}
            startIcon={
              dislikeBtnSelected ? (
                <SentimentDissatisfiedIcon sx={{ color: "white" }} />
              ) : (
                <SentimentDissatisfiedIcon />
              )
            }
            onClick={handleDislikeBtnClick}
            sx={{
              borderRadius: "20px",
              borderColor: !dislikeBtnSelected && "#D9D9D9",
              backgroundColor: dislikeBtnSelected ? "#FF745A" : "white",
              color: dislikeBtnSelected ? "white" : "black",
              "&:hover": {
                borderWidth: "1.5px",
                borderColor: "#FF745A",
              },
            }}
          >
            아쉬워요
          </Button>
        </div>
      </div>
      <div style={{ textAlign: 'center', paddingTop: '20px' }}>
        <TextField
          label="리뷰 작성하기"
          variant="outlined"
          multiline
          rows={4}
          value={reviewText}
          onChange={handleReviewChange}
          placeholder="다른 사람들이 볼 수 있게 남겨주세요. :)"
          fullWidth
        />
        <Button
          variant="outlined"
          sx={{
            width: '80%',
            height: '50px',
            backgroundColor: 'white',
            borderColor: '#D9D9D9',
            borderWidth: '1px',
            marginTop: '2vh'
          }}
        >
          사진 첨부하기
        </Button>
      </div>
      <div style={{ textAlign: 'center', paddingTop: '20px' }}>
        <Button
          variant="contained"
          sx={{
            width: '80%',
            height: '48px',
            backgroundColor: '#FF745A',
            color: 'white',
          }}
          onClick={handleReviewSubmit}
        >
          등록하기
        </Button>
      </div>
    </div>
  );

}

export default ReviewForm;