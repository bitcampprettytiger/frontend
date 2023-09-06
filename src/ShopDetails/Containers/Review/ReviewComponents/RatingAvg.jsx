import { Rating, Box, Typography, Grid, Table, TableBody, TableCell, TableRow  } from "@mui/material";
import useReview from '../ReviewCustomHook/useReview';
import React, { useState } from 'react';
import { useParams } from "react-router-dom";

const RatingAvg = () => {
  const { vendorId } = useParams();
  const { reviews } = useReview(vendorId);

  const [foodRating, setFoodRating] = useState(0); // 음식 평점 상태
  const [hygieneRating, setHygieneRating] = useState(0); // 위생 평점 상태

  const calculateAverageRating = (reviews) => {

    if (!Array.isArray(reviews) || reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.reviewScore;
      },
      0
    );

    return totalRating / reviews.length;
  };

  const averageRating = calculateAverageRating(reviews);

  const calculateRatingCounts = (reviews, rating) => {
    if (!Array.isArray(reviews)) {
      return 0;
    }
    return reviews.filter((review) => review.reviewScore === rating).length;  // reviewScore로 변경
  };

  const ratingCounts = [
    { rating: 5, count: calculateRatingCounts(reviews, 5) },
    { rating: 4, count: calculateRatingCounts(reviews, 4) },
    { rating: 3, count: calculateRatingCounts(reviews, 3) },
    { rating: 2, count: calculateRatingCounts(reviews, 2) },
    { rating: 1, count: calculateRatingCounts(reviews, 1) },
  ];

  const generateTableRow = (rating, count) => (
    <TableRow key={rating} sx={{ height: '20px' }}>
      <TableCell component="th" scope="row" sx={{ padding: '0' }}>
        {rating}점
      </TableCell>
      <TableCell align="left" sx={{ padding: '0 5%' }}>
        <div style={{
          backgroundColor: "#FFE500",
          width: `${count * 10}px`,
          height: "10px",
          borderRadius: "5px",
          padding: 0
        }}>
        </div>
      </TableCell>
      <TableCell align="right" sx={{ padding: '3% 5%', color: '#ababab', fontSize: '70%' }}>
        ({count}명)
      </TableCell>
    </TableRow>
  );

  return (
    <Box sx={{width: '100%', height: ''}}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography
              sx={{ fontSize: '140%', fontWeight: 'bold' }}
            >
              {averageRating.toFixed(1)}
            </Typography>
            <Rating
              name="half-rating-read"
              value={averageRating}
              precision={0.5}
              readOnly
            />
          </Box>
        </Grid>

        <Grid item xs={6}>
            <Table>
              <TableBody>
                {ratingCounts.map((item) => generateTableRow(item.rating, item.count))}
              </TableBody>
            </Table>
        </Grid>
      </Grid>
    </Box>
  );
};


export default RatingAvg;