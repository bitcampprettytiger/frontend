import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ShopHomeTabsContext from '../../../SDCustomHooks/SHTContext';

const ImageGrid = ({ imageUrls }) => (
  <Grid container spacing={2} sx={{ margin: '10% 0' }}>
    {imageUrls.map((imageUrl, index) => (
      <Grid item xs={4} key={index}>
        <Paper
          sx={{
            width: '100%',
            paddingTop: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box
            component="img"
            src={imageUrl}
            alt={`리뷰 이미지 - ${index}`}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default function PhotoSeeMore({ images }) {
  const maxImagesToShow = 6;
  const imagesToShow = images.slice(0, maxImagesToShow);
  const { setValue } = useContext(ShopHomeTabsContext);

  const handleReviewClick = () => {
    setValue(2); //리뷰로 이동
  }
  return (
    <Box sx={{ width: '100%', paddingBottom: '2vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <Typography variant="h6" fontWeight="bold">
          방문자 사진
        </Typography>
        <Typography variant="body1" onClick={handleReviewClick} sx={{ cursor: 'pointer' }}>
          <Box component="span" sx={{
            fontSize: '80%',
            '&:hover': {
              color: '#FD5E53'
            }
          }}>
            더 보기
          </Box>
        </Typography>
      </Box>
      <ImageGrid imageUrls={imagesToShow} />
    </Box>
  );
}
