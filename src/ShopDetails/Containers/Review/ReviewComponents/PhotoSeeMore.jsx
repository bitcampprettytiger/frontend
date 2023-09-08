import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ShopHomeTabsContext from '../../../SDCustomHooks/SHTContext';

const ImageGrid = ({ image }) => {
  console.log(image);
  return (
    <Grid item xs={4}>
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
          src={`${image[0].reviewFilePath}`}
          alt={`리뷰 이미지`}
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
  )
};

export default function PhotoSeeMore({ images }) {

  const maxImagesToShow = 6;
  const [imagesToShow, setImageToShow] = useState(images);
  const { setValue } = useContext(ShopHomeTabsContext);

  console.log(imagesToShow);

  const handleReviewClick = () => {
    setValue(2); //리뷰로 이동
  }
  return (
    <Box sx={{ width: '100%', paddingBottom: '2vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold">
          방문자 사진
        </Typography>
        <Typography variant="body1" onClick={handleReviewClick}>
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
      <Grid container spacing={2} sx={{ marginTop: '1%' }}>
        {imagesToShow && imagesToShow.map((image, index) =>
          <ImageGrid key={index} image={image} />

        )}
      </Grid>
    </Box>
  );
}

// 리뷰 이미지가 비어있어 ->  리뷰랑 매핑 
