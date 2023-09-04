import React, { useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography, Button, IconButton } from "@mui/material";
import Rating from "@mui/material/Rating";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import useReview from "../ReviewCustomHook/useReview";
import { useParams } from "react-router-dom";

const ReviewDetail = () => {
  const { vendorId } = useParams();
  const { reviews, error, loading } = useReview(vendorId);

  // 좋아요/아쉬워요 상태
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <Box padding={2} textAlign={'left'}>
      {reviews.map(review => (
        <Card key={review.reviewNum}>
          <CardContent>
            <Box>
              <Typography fontWeight={'bold'}>{review.memberId}</Typography>
              <Typography variant="h6">{review.vendorName}</Typography>  {/* 가게명 */}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating value={review.reviewScore} readOnly />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                {review.reviewScore}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <IconButton color="primary" onClick={handleLike}>
                <ThumbUpIcon />
              </IconButton>
              {likes}
              <IconButton color="secondary" onClick={handleDislike}>
                <ThumbDownIcon />
              </IconButton>
              {dislikes}
            </Box>
            <Box
              sx={{
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                mt: 2
              }}
            >
              {(review.reviewFileList || [review.reviewFile]).map(file => (
                file && <CardMedia
                  key={file.id}
                  component="img"
                  image={file.reviewFilePath + file.reviewFileName}
                  alt="Review image"
                  sx={{
                    width: '20%',
                    height: '20%',
                    display: 'inline-block',
                    marginX: 1
                  }}
                />
              ))}
            </Box>
            <Box mt={2}>
              <Typography variant="body1">{review.reviewContent}</Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ReviewDetail;
