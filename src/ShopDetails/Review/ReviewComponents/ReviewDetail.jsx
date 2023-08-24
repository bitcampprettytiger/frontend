import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import reviewData from "../../../DataEx/review";
import useReview from "../ReviewCustomHook/useReview";

const ReviewDetail = () => {

  return (
    <Box padding={2} textAlign={'left'}>
      {reviewData.map(({ id, nickname, img, altText, comment, rating }) => (
        <Card key={id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Box>
              <Typography fontWeight={'bold'}>{nickname}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating value={rating} readOnly />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                {rating}
              </Typography>
            </Box>
            <CardMedia component="img" image={img} alt={altText}   sx={{ width: 150, height: 150 }}/>
            <Box>
              <Typography variant="body1">{comment}</Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ReviewDetail;