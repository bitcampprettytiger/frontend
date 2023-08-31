import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const steps = ['조회', '가입', '정보'];

const StepProgress = ({ activeStep }) => {
  return (
    <Stepper alternativeLabel activeStep={activeStep}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel
            sx={{
              '.MuiStepIcon-text': {
                fill: 'white',
              },
              '&.MuiStepLabel-active': {
                color: '#21BF73',
                fontWeight: 'bold',
              },
              '&.MuiStepLabel-completed': {
                color: '#21BF73',
              },
              '.MuiStepIcon-root': {
                color: '#E8E8E8',
                '&.MuiStepIcon-active': {
                  color: '#21BF73',
                },
                '&.MuiStepIcon-completed': {
                  color: '#21BF73',
                },
              },
            }}
          >
            {label}
          </StepLabel>

        </Step>
      ))}
    </Stepper>
  );
};

export default StepProgress;
