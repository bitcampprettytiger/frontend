import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import useReview from "../ReviewCustomHook/useReview";
import { useParams } from "react-router-dom";

const ReviewDetail = () => {
  const vendorId = useParams();
  const { reviews, error, loading } = useReview(vendorId);

  return (
    <Box padding={2} textAlign={'left'}>
      {reviews.map(review => (
        <Card key={review.reviewNum}>
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
              {review.reviewFiles.map(file => (
                <CardMedia 
                  key={file.id} 
                  component="img" 
                  image={file.imageUrl} 
                  alt="Review image"
                  sx={{ 
                    width: 150, 
                    height: 150, 
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
