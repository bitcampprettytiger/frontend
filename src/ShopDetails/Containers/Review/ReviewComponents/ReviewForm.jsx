import React, { useState, useEffect } from 'react';
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


function ReviewForm({ onReviewSubmit }) {
  const { orderId, vendorId } = useParams();
  const { reviews, error, loading, isLiked, isDisliked } = useReview(vendorId); // 추출한 vendorId를 useReview에 넘김

  const [likeCount, setLikeCount] = useState(false);

  const [disLikeCount, setDisLikeCount] = useState(false);
  const [rereviewContent, setRereviewContent] = useState(""); // 리뷰 텍스트를 위한 상태
  const [rating, setRating] = useState(0); // 평점을 위한 상태
  const [selectedFiles, setSelectedFiles] = useState([]); // 선택된 파일을 위한 상태
  const [reviewScore, setReviewScore] = useState(0); // 음식 별점을 위한 상태


  const handleLikeBtnClick = () => {
    console.log("Like button clicked");

    setLikeCount(true);
    setDisLikeCount(false);
  };

  const handleDislikeBtnClick = () => {
    console.log("Dislike button clicked");

    setLikeCount(false);
    setDisLikeCount(true);
  };
  const handleReviewChange = (e) => {
    setRereviewContent(e.target.value); // 리뷰 텍스트 업데이트
  };

  const handleRatingChange = (e, newValue) => {
    setRating(newValue); // 평점 업데이트
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files); // 선택된 파일 업데이트
  };

  const removeSelectedFile = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };

  const handleReviewSubmit = async () => {
    // if (!vendorId) {
    //   console.error("vendorId가 없어!!!!");
    //   return;
    // }

    console.log("handleReviewSubmit called");

    console.log("useParams:", { orderId, vendorId });

    console.log("Current State - rereviewContent:", rereviewContent, "rating:", rating);

    const reviewDto = {
      reviewContent: rereviewContent,
      reviewScore,  // 음식 별점 
      likeCount,
      disLikeCount,
      vendorId,
    };

    console.log("Review DTO:", reviewDto);

    const files = []; // 파일 정보를 추가하려면 배열을 채워야 함
    const token = localStorage.getItem('accessToken');

    console.log("Access Token:", token);

    try {
      const result = await createReview(reviewDto, selectedFiles, token);
      console.log("API Call Result:", result);

      if (onReviewSubmit) {
        onReviewSubmit(reviewDto, files);  // 상위 컴포넌트로 리뷰 데이터를 전달합니다.
      }

      if (result) {
        console.log("리뷰가 성공적으로 저장되었습니다.", result);
        alert('리뷰가 성공적으로 저장되었습니다.');  // 여기에 추가

      } else {
        console.log("리뷰 저장에 실패했습니다. 결과가 없습니다.");
      }
    } catch (error) {
      console.error("리뷰 저장 중 오류가 발생했습니다.", error);
    }
  };
  useEffect(() => {
    setLikeCount(isLiked);  // 좋아요 상태 업데이트
    setDisLikeCount(isDisliked); // 아쉬워요 상태 업데이트
  }, [isLiked, isDisliked]);

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
        <Rating value={reviewScore} onChange={(e, newValue) => setReviewScore(newValue)} />


        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10vw',
          }}
        >
          <Button
            variant={likeCount ? "contained" : "outlined"}
            startIcon={
              likeCount ? (
                <SentimentSatisfiedAltIcon sx={{ color: "white" }} />
              ) : (
                <SentimentSatisfiedAltIcon />
              )
            }
            onClick={handleLikeBtnClick}
            sx={{
              borderRadius: "20px",
              borderColor: !likeCount && "#D9D9D9",
              backgroundColor: likeCount ? "#FF745A" : "white",
              color: likeCount ? "white" : "black",
              "&:hover": {
                borderWidth: "1.5px",
                borderColor: "#FF745A",
              },
            }}
          >
            좋아요
          </Button>
          <Button
            variant={disLikeCount ? "contained" : "outlined"}
            startIcon={
              disLikeCount ? (
                <SentimentDissatisfiedIcon sx={{ color: "white" }} />
              ) : (
                <SentimentDissatisfiedIcon />
              )
            }
            onClick={handleDislikeBtnClick}
            sx={{
              borderRadius: "20px",
              borderColor: !disLikeCount && "#D9D9D9",
              backgroundColor: disLikeCount ? "#FF745A" : "white",
              color: disLikeCount ? "white" : "black",
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
          value={rereviewContent}
          onChange={handleReviewChange}
          placeholder="다른 사람들이 볼 수 있게 남겨주세요. :)"
          fullWidth
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{
            display: 'none',
            width: '80%',
            marginTop: '30%'
          }
          }
          id="fileInput"
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
          onClick={() => document.getElementById('fileInput').click()}

        >
          사진 첨부하기
        </Button>
        <div>
          {selectedFiles.map((file, index) => (
            <div key={index} style={{ display: 'inline-block', position: 'relative' }}>
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{ width: '100px', height: '100px' }}
              />
              <button
                onClick={() => removeSelectedFile(index)}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  background: 'red',
                  color: 'white'
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
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
    </div >
  );

}

export default ReviewForm;