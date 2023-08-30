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
                '&.MuiStepIcon-active': {
                  color: 'FF745A',
                },
                '&.MuiStepIcon-completed': {
                  color: 'white',
                },
              },
              '&.MuiStepLabel-active': {
                color: 'text.primary',
                fontWeight: 'bold',
              },
              '&.MuiStepLabel-completed': {
                color: 'text.primary',
              },
              '.MuiStepIcon-root': {
                color: '#E8E8E8',
                '&.MuiStepIcon-active': {
                  color: '#FF745A',
                },
                '&.MuiStepIcon-completed': {
                  color: '#FF745A',
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
