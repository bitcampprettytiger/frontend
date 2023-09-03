import { Rating, Box, Typography, Grid } from "@mui/material";
import useReview from '../ReviewCustomHook/useReview';
import React, { useState } from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
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
    return reviews.filter((review) => review.reviewscore === rating).length;
  };

  const ratingCounts = [
    { rating: 5, count: calculateRatingCounts(reviews, 5) },
    { rating: 4, count: calculateRatingCounts(reviews, 4) },
    { rating: 3, count: calculateRatingCounts(reviews, 3) },
    { rating: 2, count: calculateRatingCounts(reviews, 2) },
    { rating: 1, count: calculateRatingCounts(reviews, 1) },
  ];

  const CustomLabel = (props, color) => {
    const { x, y, width, height, value } = props;
    return (
      <text
        x={x + width + 10}
        y={y + height / 2}
        fill={color}
        dominantBaseline="middle"
      >
        ({value})
      </text>
    );
  };

  return (
    <Box>
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
          <ResponsiveContainer width={"100%"} height={100}>
            <BarChart data={ratingCounts} layout="vertical" barCategoryGap={20}>
              <XAxis type="number" hide />
              <YAxis
                dataKey="rating"
                type="category"
                axisLine={false}
                width={30}
                interval={0}
              />
              <CartesianGrid horizontal={false} vertical={false} />
              <Bar
                dataKey="count"
                fill="#FFE500"
                barSize={30}
                radius={[5, 5, 5, 5]}
                label={props => CustomLabel(props, "#E2E2E2")}
              />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};


export default RatingAvg;