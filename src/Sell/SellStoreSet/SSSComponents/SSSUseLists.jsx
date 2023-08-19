import React, { useState } from 'react';
import { Box, FormControlLabel, Checkbox, Typography, Grid } from '@mui/material';

const SSSUseLists = () => {
  const [amenities, setAmenities] = useState({
    fan: false,
    airConditioner: false,
    storeToilet: false,
    publicToilet: false
  });

  const handleChange = (event) => {
    setAmenities({ ...amenities, [event.target.name]: event.target.checked });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '5%',
      }}
    >
      <Typography variant="h6">편의시설</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.fan}
                onChange={handleChange}
                name="fan"
                color="primary"
              />
            }
            label="선풍기"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.airConditioner}
                onChange={handleChange}
                name="airConditioner"
                color="primary"
              />
            }
            label="에어컨"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.storeToilet}
                onChange={handleChange}
                name="storeToilet"
                color="primary"
              />
            }
            label="가게화장실"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.publicToilet}
                onChange={handleChange}
                name="publicToilet"
                color="primary"
              />
            }
            label="공영화장실"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SSSUseLists;
