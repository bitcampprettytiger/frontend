import { styled } from '@mui/system';
import { Box, Button, Typography } from '@mui/material';

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StarBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
`;

export const ButtonBox = styled(Box)`
  width: 100%;
  display: flex;
  margin-bottom: 2vh;
`;

export const CallButton = styled(Button)`
  width: 100%;
  margin-right: 1vw;
  padding: 2vw;
  color: black;
  background: white;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  border: #E7E3E3 solid 1px ;
`;

export const LocationButton = styled(Button)`
  width: 100%;
  margin-left: 1vw;
  padding: 2vw;
  color: black;
  background: white;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  border: #E7E3E3 solid 1px; 
`;
export const StarTypography = styled(Typography)`
  font-size: 100%;
`;

export const ReviewCountTypography = styled(Typography)`
  margin-left: 1;
  font-size: 90%;
  color: #ababab;
`;