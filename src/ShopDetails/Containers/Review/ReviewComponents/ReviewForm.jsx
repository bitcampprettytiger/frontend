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
import AppBarWithTitle from '../../../Components/AppBarWithTitle';
import axios from 'axios';
import { API_BASE_URL } from '../../../../Menu/Home/HomeComponents/HomeApi';

function ReviewForm({ onReviewSubmit }) {
  const { orderId, vendorId } = useParams();

  const [isLike, setIsLike] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [reviewScore, setReviewScore] = useState(0);
  const [vendorName, setVendorName] = useState("");

  const handleLikeBtnClick = () => {
    console.log("Like button clicked");

    setIsLike(true);
  };

  const handleDislikeBtnClick = () => {
    console.log("Dislike button clicked");

    setIsLike(false);
  };
  const handleReviewChange = (e) => {
    setReviewContent(e.target.value); // 리뷰 텍스트 업데이트
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

  // 가게 이름을 가져오기
  const fetchStoreName = async () => {
    try {
      const response = await axios.get(`/api/stores/${vendorId}`);
      if (response.status === 200) {
        setVendorName(response.data.vendorName);
      }
    } catch (error) {
      console.error("가게 이름을 가져오는데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    async function fetchVendorName() {
      try {
        const response = await axios.get(`${API_BASE_URL}/your-endpoint-for-vendor/${vendorId}`);
        if (response.status === 200) {
          setVendorName(response.data.vendorName);
        }
      } catch (error) {
        console.error("가게이름이 안나와여:", error);
      }
    }

    fetchVendorName();
  }, [vendorId]);


  const handleReviewSubmit = async () => {

    console.log("handleReviewSubmit called");

    console.log("useParams:", { orderId, vendorId });

    console.log("Current State - reviewContent:", reviewContent, "rating:", rating);

    const reviewDto = {
      reviewContent: reviewContent,
      reviewScore: reviewScore,  //l 음식 별점 
      isLike: isLike,
      vendorId: vendorId,
      orderId: orderId
    };

    console.log("Review DTO:", reviewDto);

    const files = []; // 파일 정보를 추가하려면 배열을 채워야 함
    const token = localStorage.getItem('accessToken');

    console.log("Access Token:", token);

    try {
      const result = await createReview(reviewDto, selectedFiles, token);
      console.log("API Call Result:", result);

      const { item } = result;

      console.log("item:", item);
      if (item && item.msg === "정상적으로 저장되었습니다.") {
        console.log("리뷰가 성공적으로 저장되었습니다.", result);
        alert('리뷰가 성공적으로 저장되었습니다.');

      } else {
        console.log("리뷰 저장에 실패했습니다. 결과가 없습니다.");
      }


      if (onReviewSubmit) {
        onReviewSubmit(reviewDto, selectedFiles);  // 상위 컴포넌트로 리뷰 데이터를 전달합니다.
      }
    } catch (error) {
      console.error("리뷰 저장 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <div style={{ height: '100vh', margin: '0' }}>
      <AppBarWithTitle title='리뷰 작성하기' />
      <div style={{ textAlign: 'left', paddingLeft: '10%', marginTop: '5vh' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: '17px',
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          {vendorName || "가게 이름 로딩 중..."}
        </Typography>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: '100%',
            color: 'black',
            paddingTop: '2%',
            fontWeight: 'bold',
          }}
        >
          음식은 어떠셨나요?
        </Typography>
        <Rating value={reviewScore} onChange={(e, newValue) => setReviewScore(newValue)}
          sx={{ marginTop: '5%' }} />


        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5vw',
            marginTop: '5%'
          }}
        >
          <Button
            variant={isLike ? "contained" : "outlined"}
            startIcon={
              isLike ? (
                <SentimentSatisfiedAltIcon sx={{ color: "white" }} />
              ) : (
                <SentimentSatisfiedAltIcon />
              )
            }
            onClick={handleLikeBtnClick}
            sx={{
              borderRadius: "20px",
              borderColor: !isLike && "#D9D9D9",
              backgroundColor: isLike ? "#FF745A" : "white",
              color: isLike ? "white" : "black",
              "&:hover": {
                borderWidth: "1.5px",
                borderColor: "#FF745A",
                background: "#FF745A",
                color: 'white'
              }, "&:active": {
                borderWidth: "1.5px",
                borderColor: "#FF745A",
                background: "#FF745A",
                color: 'white'
              },
            }}
          >
            좋아요
          </Button>
          <Button
            variant={!isLike ? "contained" : "outlined"}
            startIcon={
              !isLike ? (
                <SentimentDissatisfiedIcon sx={{ color: "white" }} />
              ) : (
                <SentimentDissatisfiedIcon />
              )
            }
            onClick={handleDislikeBtnClick}
            sx={{
              borderRadius: "20px",
              borderColor: isLike && "#D9D9D9",
              backgroundColor: !isLike ? "#FF745A" : "white",
              color: !isLike ? "white" : "black",
              "&:hover": {
                borderWidth: "1.5px",
                borderColor: "#FF745A",
                background: "#FF745A",
                color: 'white'
              }, "&:active": {
                borderWidth: "1.5px",
                borderColor: "#FF745A",
                background: "#FF745A",
                color: 'white'
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
          value={reviewContent}
          onChange={handleReviewChange}
          placeholder="다른 사람들이 볼 수 있게 남겨주세요. :)"
          fullWidth
          color='secondary'
          sx={{ margin: '2%', width: '90%' }}
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{
            display: 'none',
            width: '80%',
            marginTop: '30%',
            color: '#FD5E53'
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
            marginTop: '2vh',
            color: 'black',
            '&:hover': {
              backgroundColor: '#E2E2E2',
              borderColor: '#FD5E53'
            },
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
            '&:hover': {
              backgroundColor: '#E3634D',
              borderWidth: "1.5px",
              borderColor: "#FF745A",
            },
            '&:action': {
              backgroundColor: '#E3634D',
              borderWidth: "1.5px",
              borderColor: "#FF745A",
            },
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