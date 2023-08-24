import React, { useState } from "react";
import { Rating, Box, Typography, Grid } from "@mui/material";
import review from "../../../DataEx/review"; 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList, 
  Cell
} from "recharts";

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