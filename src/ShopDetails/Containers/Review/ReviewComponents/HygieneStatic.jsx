import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import useReview from "../ReviewCustomHook/useReview";
import { useParams } from "react-router-dom";

const HygieneStatic = () => {
  const { vendorId } = useParams();
  const { reviews } = useReview(vendorId);

  const countHygieneRatings = (reviews) => {
    const result = { good: 0, bad: 0 };
    reviews.forEach((review) => {
      if (review.isLiked) {
        result.good += 1;
      } else if (review.isDisliked) {
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

  return (
    <Box sx={{marginTop: '5%'}}>
      <Typography variant="h6" marginBottom={2}>
        위생
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell valign="top">
              <Typography align="center">좋아요</Typography>
              <Typography align="center" sx={{color: '#ababab', fontSize: '100%', marginTop: '5%'}}>{goodPercentage}%</Typography>
            </TableCell>
            <TableCell>
              <div style={{
                display: "flex",
                alignItems: "center",
                width: '100%',
                position: 'relative'
              }}>
                <div style={{
                  backgroundColor: "#FFE500",
                  width: `${goodPercentage}%`,
                  height: "10px",
                  borderRadius: "5px",
                }}></div>
                <div style={{
                  backgroundColor: "#E2E2E2",
                  width: `${badPercentage}%`,
                  height: "10px",
                  borderRadius: "5px",
                }}></div>
              </div>
            </TableCell>
            <TableCell valign="top">
              <Typography align="center">아쉬워요</Typography>
              <Typography align="center" sx={{color: '#ababab', fontSize: '100%', marginTop: '5%'}}>{badPercentage}%</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default HygieneStatic;
