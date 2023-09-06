import React, {useEffect} from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import useReview from "../ReviewCustomHook/useReview";
import { useParams } from "react-router-dom";
import { useInView } from 'react-intersection-observer';

const ReviewDetail = () => {
  const { vendorId } = useParams();
  const { reviews, error, loading, fetchMore } = useReview(vendorId);
  const [ref, inView] = useInView({
    threshold: 0.1 
  });
  //뷰포트 내 새 데이터
  useEffect(() => {
    if (inView) {
      fetchMore();
    }
  }, [inView]);

  return (
    <Box padding={2} textAlign={'left'}>
      {reviews.map(review => (
        <Card key={review.reviewNum} sx={{ marginBottom: '5%' }}>
          <CardContent>
            <Box>
              <Typography fontWeight={'bold'}>{review.memberId}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating value={review.reviewScore} readOnly />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                {review.reviewScore}
              </Typography>
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
      <div ref={ref}>
        {loading && <div style={{fontSize: '90%', textAlign: 'center'}}>리뷰 불러오는 중...</div>}
      </div>
    </Box>
  );
};

export default ReviewDetail;