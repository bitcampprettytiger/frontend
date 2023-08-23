import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
  LabelList
} from "recharts";

const HygieneStatic = () => {
  const reviews = [
    { id: 1, hygiene: "good" },
    { id: 2, hygiene: "good" },
    { id: 3, hygiene: "good" },
    { id: 4, hygiene: "bad" },
    { id: 5, hygiene: "bad" },
  ];

  const countHygieneRatings = (reviews) => {
    const result = { good: 0, bad: 0 };

    reviews.forEach((review) => {
      if (review.hygiene === "good") {
        result.good += 1;
      } else if (review.hygiene === "bad") {
        result.bad += 1;
      }
    });

    return result;
  };

  const calculatePercentage = (value, total) => {
    return ((value / total) * 100).toFixed(1);
  };

  const hygieneCounts = countHygieneRatings(reviews);
  const totalCount = reviews.length;
  const goodPercentage = calculatePercentage(hygieneCounts.good, totalCount);
  const badPercentage = calculatePercentage(hygieneCounts.bad, totalCount);

  const renderCustomBarLabel = (props) => {
    const { x, y, width, height, value } = props;
    const text = value === parseInt(goodPercentage, 10) ? '좋아요' : '아쉬워요';
    const posX = x + width / 2;
    const posY = y - (y + height) / 2;

    return (
      <text x={posX} y={posY} fill="#FFFFFF" textAnchor="middle" dy={4}>
        {text}
      </text>
    );
  };

  const barData = [
    {
      name: "위생",
      좋아요: hygieneCounts.good,
      아쉬워요: hygieneCounts.bad,
      total: totalCount,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" marginBottom={2}>
        위생
      </Typography>
      <Box style={{ width: "40%" , }}>
        <ResponsiveContainer height={25}>
          <BarChart data={barData} layout="vertical">
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="좋아요" fill="#FFE500" stackId="a" radius={[5, 0, 0, 5]}>
              <LabelList
                dataKey="좋아요"
                position="insideLeft"
                formatter={(value) => `좋아요: ${value}`}
                content={renderCustomBarLabel}
              />
            </Bar>
            <Bar dataKey="아쉬워요" fill="#E2E2E2" stackId="a" radius={[0, 5, 5, 0]}>
              <LabelList
                dataKey="아쉬워요"
                position="insideRight"
                formatter={(value) => `아쉬워요: ${value}`}
                content={renderCustomBarLabel}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default HygieneStatic;