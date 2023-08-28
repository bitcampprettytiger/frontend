import React from "react";
import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import {
  BarChart,
  XAxis,
  YAxis,
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
    return ((value / total) * 100);
  };

  const hygieneCounts = countHygieneRatings(reviews);
  const totalCount = reviews.length;
  const goodPercentage = calculatePercentage(hygieneCounts.good, totalCount);
  const badPercentage = calculatePercentage(hygieneCounts.bad, totalCount);

  const renderCustomBarLabel = (props) => {
    const { x, y, width, height, value, dataKey } = props;
    const text = `${value}%`;
    const label = dataKey; 

    const labelX = dataKey === '좋아요' ? x - 60 : x + width + 60;
    const labelY = y + height / 2 - 15; 
    
    const percentX = labelX;
    const percentY = y + height / 2 + 15; 

  return (
    <g>
      <text x={labelX} y={labelY} fill="#000" textAnchor="middle">
        {label}
      </text>
      <text x={percentX} y={percentY} fill="#000" textAnchor="middle">
        {text}
      </text>
    </g>
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
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography>좋아요: {goodPercentage}%</Typography>
        </Grid>
        <Grid item xs style={{ width: "100%" }}>
          <ResponsiveContainer height={25}>
            <BarChart data={barData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" hide />
              <Bar dataKey="좋아요" fill="#FFE500" stackId="a" radius={[5, 0, 0, 5]}>
                <LabelList
                  dataKey="좋아요"
                  position="insideLeft"
                  content={renderCustomBarLabel}
                />
              </Bar>
              <Bar dataKey="아쉬워요" fill="#E2E2E2" stackId="a" radius={[0, 5, 5, 0]}>
                <LabelList
                  dataKey="아쉬워요"
                  position="insideRight"
                  content={renderCustomBarLabel}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item>
          <Typography>아쉬워요: {badPercentage}%</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HygieneStatic;