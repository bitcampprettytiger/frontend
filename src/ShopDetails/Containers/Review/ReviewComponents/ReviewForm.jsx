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

function ReviewForm() {
  const { orderId, vendorId } = useParams();
  const { reviews, error, loading, isLiked, isDisliked } = useReview(vendorId); // 추출한 vendorId를 useReview에 넘김

  const [likeBtnSelected, setLikeBtnSelected] = useState(false);

  const [dislikeBtnSelected, setDislikeBtnSelected] = useState(false);

  const handleLikeBtnClick = () => {
    setLikeBtnSelected(true);
    setDislikeBtnSelected(false);
  };

  const handleDislikeBtnClick = () => {
    setLikeBtnSelected(false);
    setDislikeBtnSelected(true);
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
              color: dislikeBtnSelected ? "white" : "black", // 이 부분이 추가됩니다.
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
          placeholder="다른 사람들이 볼 수 있게 남겨주세요. :)"
          fullWidth
          sx={{ borderColor: '#D9D9D9' }}
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
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}

export default ReviewForm;