import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const ImageGrid = ({ imageUrls }) => (
  <Grid container spacing={2}>
    {imageUrls.map((imageUrl, index) => (
      <Grid item xs={6} key={index}>
        <Paper component="img" src={imageUrl} alt={`리뷰 이미지 - ${index}`} sx={{ width: '100%', height: 'auto' }} />
      </Grid>
    ))}
  </Grid>
);

export default function PhotoSeeMore({ images }) {
  const maxImagesToShow = 6;
  const imagesToShow = images.slice(0, maxImagesToShow);

  return (
    <Box sx={{ width: '100%', paddingBottom: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <Typography variant="h6" fontWeight="bold">
          방문자 사진
        </Typography>
        <Typography variant="body1">
          <Box component="span" sx={{ fontSize: '13px' }}>
            더 보기
          </Box>
        </Typography>
      </Box>
      <ImageGrid imageUrls={imagesToShow} />
    </Box>
  );
}
