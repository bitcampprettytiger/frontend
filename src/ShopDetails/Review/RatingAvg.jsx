import React, { useState } from "react";
import { Rating, Box, Typography, Grid } from "@mui/material";
import review from "../../DataEx/review"; 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import styled from 'styled-components';

const RatingAvg = () => {
  const calculateAverageRating = (review) => {
    if (review.length === 0) {
      return 0;
    }

    const totalRating = review.reduce(
      (accumulator, currentValue) => accumulator + currentValue.rating,
      0
    );
    return totalRating / review.length;
  };

  const averageRating = calculateAverageRating(review);

  const calculateRatingCounts = (reviews, rating) => {
    return reviews.filter((review) => review.rating === rating).length;
  };

  const ratingCounts = [
    { rating: 5, count: calculateRatingCounts(review, 5) },
    { rating: 4, count: calculateRatingCounts(review, 4) },
    { rating: 3, count: calculateRatingCounts(review, 3) },
    { rating: 2, count: calculateRatingCounts(review, 2) },
    { rating: 1, count: calculateRatingCounts(review, 1) },
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>평균 별점</Typography>
          <Typography h2>{averageRating.toFixed(2)}</Typography>
          <Rating
            name="half-rating-read"
            value={averageRating}
            precision={0.5}
            readOnly
          />
        </Grid>
        <Grid item xs={6}>
          <ResponsiveContainer width={"100%"} height={100}>
            <BarChart data={ratingCounts} layout="vertical">
              <XAxis type="number" />
              <YAxis
                dataKey="rating"
                type="category"
                axisLine={false}
                width={30}
                interval={0}
              />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Bar dataKey="count" fill="#FFE500" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RatingAvg;